import type { ApiEnvelope, EnumsDto } from '~/types/api'
import { getApiBaseUrl } from './config'

// No auth required — call $fetch directly without apiFetch
export const enumsService = {
  async getEnums(): Promise<EnumsDto> {
    const res = await $fetch<ApiEnvelope<EnumsDto>>(`${getApiBaseUrl()}/api/generic/enums`)
    return res.data
  },
}
