const LOCALE_TO_BCP47: Record<string, string> = {
  en: 'en-NG',
  yo: 'yo-NG',
  ha: 'ha',
  ig: 'ig-NG',
  pcm: 'en-NG',
}

const YARNGPT_VOICES: Record<string, string> = {
  yo: 'Wura',
  ig: 'Chinenye',
  ha: 'Zainab',
  pcm: 'Idera',
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^[-*•]\s/gm, '')
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, ' ')
    .trim()
}

function prepareForSpeech(text: string): string {
  return text
    .replace(/\be\.g\./gi, 'for example')
    .replace(/\bi\.e\./gi, 'that is')
    .replace(/\bvs\./gi, 'versus')
    .replace(/\bDr\./g, 'Doctor')
    .replace(/\bMr\./g, 'Mister')
    .replace(/\bMrs\./g, 'Missus')
    .replace(/\bProf\./g, 'Professor')
    .replace(/(\d+)%/g, '$1 percent')
    .replace(/(\d+)°C/g, '$1 degrees Celsius')
    .replace(/(\d+)°F/g, '$1 degrees Fahrenheit')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/[—–]/g, ', ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

const PREFERRED_VOICE_NAMES = [
  'Microsoft Aria Online (Natural)',
  'Microsoft Jenny Online (Natural)',
  'Microsoft Zira Online (Natural)',
  'Google UK English Female',
  'Google US English',
  'Samantha',
  'Karen',
  'Moira',
  'Microsoft Zira Desktop',
]

function pickBestVoice(voices: SpeechSynthesisVoice[], langPrefix: string): SpeechSynthesisVoice | undefined {
  const candidates = voices.filter(v => v.lang.startsWith(langPrefix))
  for (const name of PREFERRED_VOICE_NAMES) {
    const found = candidates.find(v => v.name === name || v.name.includes(name))
    if (found) return found
  }
  const female = candidates.find(v =>
    v.name.toLowerCase().includes('female') ||
    ['aria', 'jenny', 'zira', 'samantha', 'karen', 'victoria', 'moira'].some(n => v.name.toLowerCase().includes(n))
  )
  if (female) return female
  return candidates[0]
}

function chunkBySentence(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text]
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text]
  const chunks: string[] = []
  let current = ''
  for (const sentence of sentences) {
    if ((current + sentence).length > maxLen) {
      if (current.trim()) chunks.push(current.trim())
      current = sentence
    } else {
      current += sentence
    }
  }
  if (current.trim()) chunks.push(current.trim())
  return chunks
}

let cachedVoices: SpeechSynthesisVoice[] = []

// Shared AudioContext — created once, resumed synchronously on each user gesture.
// This satisfies iOS Safari's rule that audio must be unlocked within a user-gesture call stack,
// even though the actual playback (source.start) happens later after an async fetch.
let audioCtx: AudioContext | null = null
let currentAudioSource: AudioBufferSourceNode | null = null

export function useTextToSpeech() {
  const isSpeaking = ref(false)
  const isSupported = ref(false)
  const isEnabled = ref(true)
  let cancelled = false
  // Incremented on every new speak() call so stale utterance callbacks don't reset isSpeaking
  let speechGen = 0

  onMounted(() => {
    isSupported.value = 'speechSynthesis' in window || 'AudioContext' in window
    const stored = localStorage.getItem('mama-tts')
    if (stored !== null) isEnabled.value = stored === 'true'
    if ('speechSynthesis' in window) {
      cachedVoices = window.speechSynthesis.getVoices()
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        cachedVoices = window.speechSynthesis.getVoices()
      })
    }
  })

  function toggleEnabled() {
    isEnabled.value = !isEnabled.value
    localStorage.setItem('mama-tts', String(isEnabled.value))
    if (!isEnabled.value) stop()
  }

  function stop() {
    cancelled = true
    window.speechSynthesis?.cancel()
    if (currentAudioSource) {
      try { currentAudioSource.stop() } catch {}
      currentAudioSource = null
    }
    isSpeaking.value = false
  }

  async function playViaAudioContext(blob: Blob): Promise<void> {
    if (!audioCtx) return
    const arrayBuffer = await blob.arrayBuffer()
    const buffer = await audioCtx.decodeAudioData(arrayBuffer)
    return new Promise((resolve) => {
      const source = audioCtx!.createBufferSource()
      source.buffer = buffer
      source.connect(audioCtx!.destination)
      source.onended = () => {
        if (currentAudioSource === source) currentAudioSource = null
        resolve()
      }
      currentAudioSource = source
      source.start()
    })
  }

  async function speakWithYarnGPT(text: string, lang: string) {
    const voice = YARNGPT_VOICES[lang]
    const chunks = chunkBySentence(stripMarkdown(text), 1900)
    cancelled = false
    isSpeaking.value = true
    try {
      for (const chunk of chunks) {
        if (cancelled || !isEnabled.value) break
        const blob = await $fetch<Blob>('/api/tts', {
          method: 'POST',
          body: { text: chunk, voice },
          responseType: 'blob',
        })
        if (cancelled || !isEnabled.value) break
        await playViaAudioContext(blob)
      }
    } catch (err) {
      console.error('[MamaVoice] YarnGPT TTS error:', err)
    } finally {
      if (!cancelled) isSpeaking.value = false
    }
  }

  function speak(text: string, lang: string = 'en') {
    if (!isEnabled.value) return
    stop()

    if (lang in YARNGPT_VOICES) {
      // Create/resume AudioContext synchronously inside the user-gesture call stack.
      // After resume(), the context stays running so source.start() works even after async awaits.
      if (!audioCtx) audioCtx = new AudioContext()
      if (audioCtx.state === 'suspended') audioCtx.resume()
      speakWithYarnGPT(text, lang)
      return
    }

    if (!('speechSynthesis' in window)) return
    cancelled = false
    const gen = ++speechGen

    const cleaned = prepareForSpeech(stripMarkdown(text))
    const utterance = new SpeechSynthesisUtterance(cleaned)
    utterance.lang = LOCALE_TO_BCP47[lang] ?? 'en-NG'
    utterance.rate = 0.85
    utterance.pitch = 1.05
    utterance.volume = 1.0

    const langPrefix = utterance.lang.split('-')[0]!
    const best = pickBestVoice(cachedVoices, langPrefix)
    if (best) utterance.voice = best

    // Set isSpeaking immediately (not in onstart) so the stop icon appears without delay
    isSpeaking.value = true
    utterance.onend = () => { if (gen === speechGen && !cancelled) isSpeaking.value = false }
    utterance.onerror = () => { if (gen === speechGen) isSpeaking.value = false }

    window.speechSynthesis.speak(utterance)
  }

  return { isSpeaking, isSupported, isEnabled, speak, stop, toggleEnabled }
}
