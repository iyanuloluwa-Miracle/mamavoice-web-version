import type { AuthResponse, RegisterResponse, RefreshResponse } from '~/types/api'

const BASE_URL = 'https://mama-voice.vercel.app'

export const authService = {
  async register(email: string, password: string): Promise<RegisterResponse> {
    return $fetch<RegisterResponse>(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      body: { email, password },
    })
  },

  async verifyEmail(otpId: string, otp: string): Promise<AuthResponse> {
    return $fetch<AuthResponse>(`${BASE_URL}/api/auth/verify-email`, {
      method: 'POST',
      body: { otpId, otp },
    })
  },

  async resendOtp(email: string): Promise<RegisterResponse> {
    return $fetch<RegisterResponse>(`${BASE_URL}/api/auth/resend-otp`, {
      method: 'POST',
      body: { email },
    })
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    return $fetch<AuthResponse>(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      body: { email, password },
    })
  },

  async refresh(refreshToken: string): Promise<RefreshResponse> {
    return $fetch<RefreshResponse>(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      body: { refreshToken },
    })
  },
}
