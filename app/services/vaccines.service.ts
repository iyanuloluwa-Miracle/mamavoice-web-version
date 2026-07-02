import { apiFetch } from './apiClient'
import type { VaccineItemDto, LogVaccineRequest, LogVaccineResponse } from '~/types/api'

export const vaccinesService = {
  async getVaccines(): Promise<{ vaccines: VaccineItemDto[] }> {
    return apiFetch<{ vaccines: VaccineItemDto[] }>('/api/vaccines')
  },

  async logVaccine(data: LogVaccineRequest): Promise<LogVaccineResponse> {
    return apiFetch<LogVaccineResponse>('/api/vaccines/log', {
      method: 'POST',
      body: data,
    })
  },
}
