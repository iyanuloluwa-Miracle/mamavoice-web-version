import { defineStore } from 'pinia'
import { authService } from '~/services/auth.service'
import { userService } from '~/services/user.service'
import { initApiClient } from '~/services/apiClient'
import type { AuthUserDto } from '~/types/api'

const REFRESH_KEY = 'mama-auth-refresh'
const USER_KEY = 'mama-auth-user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AuthUserDto | null,
    accessToken: null as string | null,
    refreshToken: null as string | null,
    isLoading: false,
  }),

  getters: {
    isAuthenticated: (s): boolean => !!s.accessToken,
    profileCompleted: (s): boolean => s.user?.profileCompleted ?? false,
    initials: (s): string => {
      if (!s.user) return '?'
      const f = s.user.firstName?.[0] ?? ''
      const l = s.user.lastName?.[0] ?? ''
      return (f + l).toUpperCase() || s.user.email[0].toUpperCase()
    },
  },

  actions: {
    _hydrate(token: string, refresh: string, user: AuthUserDto) {
      this.accessToken = token
      this.refreshToken = refresh
      this.user = user
      if (import.meta.client) {
        localStorage.setItem(REFRESH_KEY, refresh)
        localStorage.setItem(USER_KEY, JSON.stringify(user))
      }
      this._registerApiClient()
    },

    _registerApiClient() {
      initApiClient({
        getToken: () => this.accessToken,
        doRefresh: () => this.refresh(),
        onUnauthenticated: () => this.logout(),
      })
    },

    async register(email: string, password: string) {
      this.isLoading = true
      try {
        return await authService.register(email, password)
      } finally {
        this.isLoading = false
      }
    },

    async verifyEmail(otpId: string, otp: string): Promise<AuthUserDto | null> {
      this.isLoading = true
      try {
        const res = await authService.verifyEmail(otpId, otp)
        const token = res.token ?? res.accessToken ?? ''
        if (res.user) {
          this._hydrate(token, res.refreshToken, res.user)
        } else {
          this.accessToken = token
          this.refreshToken = res.refreshToken
          if (import.meta.client) localStorage.setItem(REFRESH_KEY, res.refreshToken)
          this._registerApiClient()
        }
        return res.user ?? null
      } catch (e) {
        this.accessToken = null
        this.refreshToken = null
        throw e
      } finally {
        this.isLoading = false
      }
    },

    async resendOtp(email: string) {
      return authService.resendOtp(email)
    },

    async login(email: string, password: string): Promise<AuthUserDto | null> {
      this.isLoading = true
      try {
        const res = await authService.login(email, password)
        const token = res.token ?? res.accessToken ?? ''
        if (res.user) {
          this._hydrate(token, res.refreshToken, res.user)
        } else {
          this.accessToken = token
          this.refreshToken = res.refreshToken
          if (import.meta.client) localStorage.setItem(REFRESH_KEY, res.refreshToken)
          this._registerApiClient()
        }
        return res.user ?? null
      } catch (e) {
        this.accessToken = null
        this.refreshToken = null
        throw e
      } finally {
        this.isLoading = false
      }
    },

    async refresh(): Promise<boolean> {
      const rt = this.refreshToken
        ?? (import.meta.client ? localStorage.getItem(REFRESH_KEY) : null)
      if (!rt) return false

      try {
        const res = await authService.refresh(rt)
        const token = res.token ?? res.accessToken ?? null
        if (!token) return false
        this.accessToken = token
        this.refreshToken = res.refreshToken
        if (import.meta.client) {
          localStorage.setItem(REFRESH_KEY, res.refreshToken)
        }
        return true
      } catch {
        return false
      }
    },

    async restoreSession() {
      if (!import.meta.client) return

      const rt = localStorage.getItem(REFRESH_KEY)
      if (!rt) return  // refresh token is the only hard requirement

      const storedUser = localStorage.getItem(USER_KEY)

      try {
        // Pre-populate from cache so the UI isn't empty while we refresh
        if (storedUser) this.user = JSON.parse(storedUser) as AuthUserDto
        this.refreshToken = rt
        this._registerApiClient()

        const ok = await this.refresh()
        if (!ok) {
          this.user = null
          this.refreshToken = null
          localStorage.removeItem(REFRESH_KEY)
          localStorage.removeItem(USER_KEY)
          return
        }

        // Sync latest user profile from server
        try {
          this.user = await userService.getMe()
          localStorage.setItem(USER_KEY, JSON.stringify(this.user))
        } catch {
          // Non-fatal — cached user data is still valid
        }
      } catch {
        localStorage.removeItem(REFRESH_KEY)
        localStorage.removeItem(USER_KEY)
      }
    },

    logout() {
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      if (import.meta.client) {
        localStorage.removeItem(REFRESH_KEY)
        localStorage.removeItem(USER_KEY)
      }
    },
  },
})
