import type { ApiEnvelope, EnumsDto } from '~/types/api'

// No auth required — call $fetch directly without apiFetch
export const enumsService = {
  async getEnums(): Promise<EnumsDto> {
    const res = await $fetch<ApiEnvelope<EnumsDto>>('https://mama-voice.vercel.app/api/generic/enums')
    return res.data
  },
}
