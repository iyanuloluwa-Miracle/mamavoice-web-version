import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  if (!auth.isAuthenticated) {
    return navigateTo('/auth/login')
  }

  // Deferred when user data is still loading (null during restoreSession)
  if (auth.user !== null && !auth.profileCompleted && to.path !== '/onboarding') {
    return navigateTo('/onboarding')
  }
})
