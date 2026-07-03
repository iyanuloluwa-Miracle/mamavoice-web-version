import type { FetchOptions } from 'ofetch'
import { getApiBaseUrl } from './config'
import type { ApiEnvelope } from '~/types/api'

interface TokenAccessor {
  getToken: () => string | null
  doRefresh: () => Promise<boolean>
  onUnauthenticated: () => void
}

let accessor: TokenAccessor | null = null

export function initApiClient(a: TokenAccessor) {
  accessor = a
}

// Serializes concurrent refresh requests into one
let refreshInFlight: Promise<boolean> | null = null

export async function apiFetch<T>(
  path: string,
  options: FetchOptions<'json'> = {},
): Promise<T> {
  const token = accessor?.getToken() ?? null

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> | undefined),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  const baseURL = getApiBaseUrl()

  try {
    const res = await $fetch<ApiEnvelope<T>>(baseURL + path, { ...options, headers })
    return res.data
  } catch (err: unknown) {
    const status = (err as { statusCode?: number; status?: number })?.statusCode
      ?? (err as { status?: number })?.status

    if (status !== 401 || !accessor) throw err

    // Serialize refresh — at most one in-flight refresh at a time
    if (!refreshInFlight) {
      refreshInFlight = accessor.doRefresh().finally(() => {
        refreshInFlight = null
      })
    }

    const ok = await refreshInFlight

    if (!ok) {
      accessor.onUnauthenticated()
      throw err
    }

    // Retry once with the fresh token
    const newToken = accessor.getToken() ?? null
    const retryHeaders: Record<string, string> = {
      ...(options.headers as Record<string, string> | undefined),
      ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
    }
    const retryRes = await $fetch<ApiEnvelope<T>>(baseURL + path, { ...options, headers: retryHeaders })
    return retryRes.data
  }
}
