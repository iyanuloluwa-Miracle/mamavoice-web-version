import { apiFetch } from './apiClient'
import type { UserProfileDto, UpdateProfileRequest } from '~/types/api'

export const userService = {
  async getMe(): Promise<UserProfileDto> {
    return apiFetch<UserProfileDto>('/api/users/me')
  },

  async updateProfile(data: UpdateProfileRequest): Promise<UserProfileDto> {
    return apiFetch<UserProfileDto>('/api/users/profile', {
      method: 'PATCH',
      body: data,
    })
  },
}
