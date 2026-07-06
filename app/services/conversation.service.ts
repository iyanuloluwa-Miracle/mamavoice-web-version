import { apiFetch } from './apiClient'
import type { ConversationDetailResponse, ConversationListResponse, ConversationSummaryDto } from '~/types/api'

export const conversationService = {
  async list(page = 1, limit = 20): Promise<ConversationListResponse> {
    return apiFetch<ConversationListResponse>(`/api/conversations?page=${page}&limit=${limit}`)
  },

  async create(): Promise<ConversationSummaryDto> {
    return apiFetch<ConversationSummaryDto>('/api/conversations', { method: 'POST' })
  },

  async get(id: string, page = 1, limit = 50): Promise<ConversationDetailResponse> {
    return apiFetch<ConversationDetailResponse>(`/api/conversations/${id}?page=${page}&limit=${limit}`)
  },

  async remove(id: string): Promise<{ success: boolean }> {
    return apiFetch<{ success: boolean }>(`/api/conversations/${id}`, { method: 'DELETE' })
  },
}
