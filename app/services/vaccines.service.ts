import { apiFetch } from './apiClient'
import type { VaccineItemDto, LogVaccineRequest } from '~/types/api'

export const vaccinesService = {
  async getVaccines(): Promise<{ vaccines: VaccineItemDto[] }> {
    return apiFetch<{ vaccines: VaccineItemDto[] }>('/api/vaccines')
  },

  async logVaccine(data: LogVaccineRequest): Promise<VaccineItemDto> {
    return apiFetch<VaccineItemDto>('/api/vaccines/log', {
      method: 'POST',
      body: data,
    })
  },
}
