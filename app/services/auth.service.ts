import type { ApiEnvelope, VerifyEmailResponse, LoginResponse, RegisterResponse, RefreshResponse } from '~/types/api'
import { API_BASE_URL } from './config'

export const authService = {
  async register(email: string, password: string): Promise<RegisterResponse> {
    const res = await $fetch<ApiEnvelope<RegisterResponse>>(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      body: { email, password },
    })
    return res.data
  },

  async verifyEmail(otpId: string, otp: string): Promise<VerifyEmailResponse> {
    const res = await $fetch<ApiEnvelope<VerifyEmailResponse>>(`${API_BASE_URL}/api/auth/verify-email`, {
      method: 'POST',
      body: { otpId, otp },
    })
    return res.data
  },

  async resendOtp(email: string): Promise<RegisterResponse> {
    const res = await $fetch<ApiEnvelope<RegisterResponse>>(`${API_BASE_URL}/api/auth/resend-otp`, {
      method: 'POST',
      body: { email },
    })
    return res.data
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await $fetch<ApiEnvelope<LoginResponse>>(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      body: { email, password },
    })
    return res.data
  },

  async refresh(refreshToken: string): Promise<RefreshResponse> {
    const res = await $fetch<ApiEnvelope<RefreshResponse>>(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      body: { refreshToken },
    })
    return res.data
  },
}
