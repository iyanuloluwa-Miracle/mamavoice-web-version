import type { EnumsDto } from '~/types/api'

// No auth required — call $fetch directly without apiFetch
export const enumsService = {
  async getEnums(): Promise<EnumsDto> {
    return $fetch<EnumsDto>('https://mama-voice.vercel.app/api/generic/enums')
  },
}
