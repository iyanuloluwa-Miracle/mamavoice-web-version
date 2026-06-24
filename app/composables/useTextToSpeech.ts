const LOCALE_TO_BCP47: Record<string, string> = {
  en: 'en-NG',
  yo: 'yo-NG',
  ha: 'ha',
  ig: 'ig-NG',
}

// Strip markdown symbols that would sound odd when spoken aloud
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

export function useTextToSpeech() {
  const isSpeaking = ref(false)
  const isSupported = ref(false)
  const isEnabled = ref(true)

  onMounted(() => {
    isSupported.value = 'speechSynthesis' in window
    const stored = localStorage.getItem('mama-tts')
    if (stored !== null) isEnabled.value = stored === 'true'
  })

  function toggleEnabled() {
    isEnabled.value = !isEnabled.value
    localStorage.setItem('mama-tts', String(isEnabled.value))
    if (!isEnabled.value) window.speechSynthesis?.cancel()
  }

  function speak(text: string, lang: string = 'en') {
    if (!isSupported.value || !isEnabled.value) return
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(stripMarkdown(text))
    utterance.lang = LOCALE_TO_BCP47[lang] ?? 'en-NG'
    utterance.rate = 0.9
    utterance.pitch = 1.0

    // Prefer a voice matching the locale; fall back to any available voice
    const voices = window.speechSynthesis.getVoices()
    const match = voices.find(v => v.lang.startsWith(utterance.lang.split('-')[0]))
    if (match) utterance.voice = match

    utterance.onstart = () => { isSpeaking.value = true }
    utterance.onend = () => { isSpeaking.value = false }
    utterance.onerror = () => { isSpeaking.value = false }

    window.speechSynthesis.speak(utterance)
  }

  function stop() {
    window.speechSynthesis?.cancel()
    isSpeaking.value = false
  }

  return { isSpeaking, isSupported, isEnabled, speak, stop, toggleEnabled }
}
