import { apiFetch } from './apiClient'
import type { AiQueryResponse, VoiceTextQueryResponse, VoiceQueryResponse } from '~/types/api'

export const aiService = {
  async textQuery(textQuery: string): Promise<AiQueryResponse> {
    return apiFetch<AiQueryResponse>('/api/ai/query', {
      method: 'POST',
      body: { textQuery },
    })
  },

  async voiceTextQuery(textQuery: string): Promise<VoiceTextQueryResponse> {
    return apiFetch<VoiceTextQueryResponse>('/api/voice/text-query', {
      method: 'POST',
      body: { textQuery },
    })
  },

  async voiceQuery(audioBlob: Blob): Promise<VoiceQueryResponse> {
    const form = new FormData()
    form.append('audio', audioBlob, 'recording.webm')
    // Do NOT set Content-Type manually — browser sets boundary automatically
    return apiFetch<VoiceQueryResponse>('/api/voice/query', {
      method: 'POST',
      body: form,
    })
  },
}
