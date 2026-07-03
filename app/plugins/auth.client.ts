import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(async () => {
  const auth = useAuthStore()

  // Wire up the API client accessor once, unconditionally. The closures capture
  // the store by reference so they always reflect the latest token state, whether
  // the user is a fresh visitor, an existing session, or just logged in.
  auth._registerApiClient()

  // Hydrate store from localStorage before any route middleware or component render.
  // Running here (plugin) rather than in app.vue onMounted guarantees:
  //   1. No Flash of Unauthenticated Content — navbar renders in the correct state.
  //   2. No middleware race — auth.ts / guest.ts run after the store is ready.
  await auth.restoreSession()

  // Cross-tab logout sync: if another tab clears the refresh token, mirror that here.
  window.addEventListener('storage', (e: StorageEvent) => {
    if (e.key === 'mama-auth-refresh' && e.newValue === null && auth.isAuthenticated) {
      auth.logout()
      navigateTo('/')
    }
  })
})
