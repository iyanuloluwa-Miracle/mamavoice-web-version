import { apiFetch } from './apiClient'
import type { HealthLogItemDto, LogHealthRequest } from '~/types/api'

export const trackerService = {
  async getHistory(): Promise<{ logs: HealthLogItemDto[] }> {
    return apiFetch<{ logs: HealthLogItemDto[] }>('/api/tracker/history')
  },

  async logEntry(data: LogHealthRequest): Promise<HealthLogItemDto> {
    return apiFetch<HealthLogItemDto>('/api/tracker/log', {
      method: 'POST',
      body: data,
    })
  },
}
