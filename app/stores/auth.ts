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
    isInitializing: true,
    // Transient OTP context — set after register/resend, cleared after verify.
    // Lets the verify-email page read otpId even if query params are stripped
    // by the router (e.g. @nuxtjs/i18n 10.x beforeEach behaviour).
    pendingOtp: null as { otpId: string; email: string } | null,
  }),

  getters: {
    // A persisted refresh token means the session survives reloads even before
    // the in-memory access token is re-fetched. apiFetch refreshes the access
    // token transparently on the first 401; restoreSession clears the refresh
    // token if it turns out to be invalid, reverting this to false.
    isAuthenticated: (s): boolean => !!s.accessToken || !!s.refreshToken,
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
    },

    _registerApiClient() {
      initApiClient({
        getToken: () => this.accessToken,
        doRefresh: () => this.refresh(),
        onUnauthenticated: () => this.logout(),
      })
    },

    setUser(user: AuthUserDto) {
      this.user = user
      if (import.meta.client) localStorage.setItem(USER_KEY, JSON.stringify(user))
    },

    async register(email: string, password: string) {
      this.isLoading = true
      try {
        const res = await authService.register(email, password)
        this.pendingOtp = { otpId: res.otpId, email }
        return res
      } finally {
        this.isLoading = false
      }
    },

    async verifyEmail(otpId: string, otp: string): Promise<{ user: AuthUserDto; isExistingUser: boolean }> {
      this.isLoading = true
      try {
        const res = await authService.verifyEmail(otpId, otp)
        this._hydrate(res.token, res.refreshToken, res.user)
        this.pendingOtp = null
        return { user: res.user, isExistingUser: res.isExistingUser }
      } catch (e) {
        this.accessToken = null
        this.refreshToken = null
        throw e
      } finally {
        this.isLoading = false
      }
    },

    async resendOtp(email: string) {
      const res = await authService.resendOtp(email)
      this.pendingOtp = { otpId: res.otpId, email }
      return res
    },

    async login(email: string, password: string): Promise<{ user: AuthUserDto; isExistingUser: boolean }> {
      this.isLoading = true
      try {
        const res = await authService.login(email, password)
        this._hydrate(res.token, res.refreshToken, res.user)
        return { user: res.user, isExistingUser: res.isExistingUser }
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
        if (!res.token) return false
        this.accessToken = res.token
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
      if (!import.meta.client) { this.isInitializing = false; return }

      const rt = localStorage.getItem(REFRESH_KEY)
      if (!rt) { this.isInitializing = false; return }

      const storedUser = localStorage.getItem(USER_KEY)

      try {
        // Pre-populate from cache so the UI isn't empty while we refresh
        if (storedUser) this.user = JSON.parse(storedUser) as AuthUserDto
        this.refreshToken = rt

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
      } finally {
        this.isInitializing = false
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
