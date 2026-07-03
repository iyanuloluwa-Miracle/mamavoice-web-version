import { useRuntimeConfig } from '#imports'

// Sourced from NUXT_PUBLIC_API_BASE_URL in .env — see nuxt.config.ts runtimeConfig.public.apiBaseUrl.
export function getApiBaseUrl(): string {
  return useRuntimeConfig().public.apiBaseUrl
}
