import { apiFetch } from './apiClient'
import type { DashboardDto } from '~/types/api'

export const dashboardService = {
  async getDashboard(): Promise<DashboardDto> {
    return apiFetch<DashboardDto>('/api/dashboard')
  },
}
