const LOCALE_TO_BCP47: Record<string, string> = {
  en: 'en-NG',
  yo: 'yo-NG',
  ha: 'ha',
  ig: 'ig-NG',
  pcm: 'en-NG',
}

export function useSpeechToText() {
  const isRecording = ref(false)
  const isSupported = ref(false)
  const transcript = ref('')

  let recognition: InstanceType<typeof SpeechRecognition> | null = null

  onMounted(() => {
    const SR = (window as typeof window & { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition
      || (window as typeof window & { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition
    isSupported.value = !!SR
  })

  function initRecognition(lang: string) {
    const SR = (window as typeof window & { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition
      || (window as typeof window & { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition
    if (!SR) return null

    const r = new SR()
    r.lang = LOCALE_TO_BCP47[lang] ?? 'en-NG'
    r.continuous = false
    r.interimResults = true
    return r
  }

  function startRecording(lang: string, onInterim: (t: string) => void): Promise<string> {
    return new Promise((resolve, reject) => {
      recognition = initRecognition(lang)
      if (!recognition) {
        isSupported.value = false
        reject(new Error('not supported'))
        return
      }

      transcript.value = ''
      isRecording.value = true
      let finalTranscript = ''

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interim = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i]
          if (result.isFinal) {
            finalTranscript += result[0].transcript
          } else {
            interim += result[0].transcript
          }
        }
        onInterim(finalTranscript + interim)
        transcript.value = finalTranscript + interim
      }

      recognition.onend = () => {
        isRecording.value = false
        resolve(finalTranscript || transcript.value)
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        isRecording.value = false
        if (event.error === 'not-allowed') {
          isSupported.value = false
        }
        reject(new Error(event.error))
      }

      recognition.start()
    })
  }

  function stopRecording() {
    recognition?.stop()
  }

  return { isRecording, isSupported, transcript, startRecording, stopRecording }
}
