const LOCALE_TO_BCP47: Record<string, string> = {
  en: 'en-NG',
  yo: 'yo-NG',
  ha: 'ha',
  ig: 'ig-NG',
}

// YarnGPT voices chosen by name origin matching each language
const YARNGPT_VOICES: Record<string, string> = {
  yo: 'Wura',
  ig: 'Chinenye',
  ha: 'Zainab',
}

function stripMarkdown(text: string): string {
  return text
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

// Split text into chunks at sentence boundaries, each chunk ≤ maxLen chars
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

export function useTextToSpeech() {
  const isSpeaking = ref(false)
  const isSupported = ref(false)
  const isEnabled = ref(true)
  let currentAudio: HTMLAudioElement | null = null
  let cancelled = false

  onMounted(() => {
    isSupported.value = 'speechSynthesis' in window
    const stored = localStorage.getItem('mama-tts')
    if (stored !== null) isEnabled.value = stored === 'true'
  })

  function toggleEnabled() {
    isEnabled.value = !isEnabled.value
    localStorage.setItem('mama-tts', String(isEnabled.value))
    if (!isEnabled.value) stop()
  }

  function stop() {
    cancelled = true
    window.speechSynthesis?.cancel()
    if (currentAudio) {
      currentAudio.pause()
      currentAudio = null
    }
    isSpeaking.value = false
  }

  function playBlob(blob: Blob): Promise<void> {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      currentAudio = audio
      audio.onended = () => {
        URL.revokeObjectURL(url)
        currentAudio = null
        resolve()
      }
      audio.onerror = () => {
        URL.revokeObjectURL(url)
        currentAudio = null
        resolve()
      }
      audio.play().catch(() => resolve())
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
        await playBlob(blob)
      }
    } catch {
      // silently fail — user can still read the text
    } finally {
      if (!cancelled) isSpeaking.value = false
    }
  }

  function speak(text: string, lang: string = 'en') {
    if (!isEnabled.value) return
    stop()

    if (lang in YARNGPT_VOICES) {
      speakWithYarnGPT(text, lang)
      return
    }

    // English: browser SpeechSynthesis
    if (!isSupported.value) return
    cancelled = false

    const utterance = new SpeechSynthesisUtterance(stripMarkdown(text))
    utterance.lang = LOCALE_TO_BCP47[lang] ?? 'en-NG'
    utterance.rate = 0.9
    utterance.pitch = 1.0

    const voices = window.speechSynthesis.getVoices()
    const match = voices.find(v => v.lang.startsWith(utterance.lang.split('-')[0]))
    if (match) utterance.voice = match

    utterance.onstart = () => { isSpeaking.value = true }
    utterance.onend = () => { isSpeaking.value = false }
    utterance.onerror = () => { isSpeaking.value = false }

    window.speechSynthesis.speak(utterance)
  }

  return { isSpeaking, isSupported, isEnabled, speak, stop, toggleEnabled }
}
