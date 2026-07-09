<template>
  <div class="min-h-screen bg-mama-bg flex flex-col items-center justify-center px-4 py-12">
    <div class="w-full max-w-sm">

      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center justify-center gap-2 mb-8">
        <img src="/mamavoiceLogo.png" alt="MamaVoice" class="h-10 w-auto rounded-xl" />
        <span class="text-2xl font-black text-mama-coral">MamaVoice</span>
      </NuxtLink>

      <!-- Card -->
      <div class="bg-mama-surface rounded-3xl border border-mama-border-light shadow-soft p-6 sm:p-8">
        <h1 class="text-2xl font-bold text-mama-text mb-1">{{ t('auth.loginTitle') }}</h1>
        <p class="text-sm text-mama-muted mb-6">{{ t('auth.loginSub') }}</p>

        <!-- Inline error so it's visible even when keyboard covers the toast -->
        <div v-if="loginError"
          class="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {{ loginError }}
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Email -->
          <div>
            <label class="block text-xs font-semibold text-mama-text mb-1.5">{{ t('auth.email') }}</label>
            <input
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              required
              class="w-full px-4 py-3 rounded-2xl border border-mama-border bg-mama-input text-mama-text placeholder-mama-muted/60 text-sm focus:outline-none focus:border-mama-teal focus:bg-mama-surface transition-colors"
            />
          </div>

          <!-- Password -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-semibold text-mama-text">{{ t('auth.password') }}</label>
            </div>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                :placeholder="t('auth.passwordPlaceholder')"
                required
                class="w-full px-4 py-3 pr-11 rounded-2xl border border-mama-border bg-mama-input text-mama-text placeholder-mama-muted/60 text-sm focus:outline-none focus:border-mama-teal focus:bg-mama-surface transition-colors"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-mama-muted hover:text-mama-text transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3.5 rounded-2xl bg-mama-teal text-white font-semibold text-sm hover:bg-mama-teal-dark disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm mt-2"
          >
            <span v-if="!isLoading">{{ t('auth.signIn') }}</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              {{ t('auth.loggingIn') }}
            </span>
          </button>
        </form>
      </div>

      <!-- Footer links -->
      <p class="text-center text-sm text-mama-muted mt-6">
        {{ t('auth.noAccount') }}
        <NuxtLink to="/auth/register" class="font-semibold text-mama-teal hover:underline ml-1">
          {{ t('auth.signUp') }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ middleware: 'guest', layout: false })

useSeoMeta({ title: 'Sign In — MamaVoice' })

const { t, setLocale } = useI18n()
const auth = useAuthStore()
const { error: toastError } = useToast()

onMounted(() => {
  if (auth.isAuthenticated) navigateTo('/chat')
})

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = computed(() => auth.isLoading)
const loginError = ref('')

function extractError(err: unknown, fallback: string): string {
  const data = (err as { data?: { message?: string | string[] } })?.data
  if (!data) return (err as { message?: string })?.message ?? fallback
  return Array.isArray(data.message) ? data.message[0] : (data.message ?? fallback)
}

async function handleSubmit() {
  loginError.value = ''
  try {
    await auth.login(email.value, password.value)
    const savedLocale = profileLanguageToLocale(auth.user?.language)
    if (savedLocale) setLocale(savedLocale)
    if (!auth.user?.profileCompleted) {
      await navigateTo('/onboarding')
    } else {
      await navigateTo('/chat')
    }
  } catch (err: unknown) {
    const msg = extractError(err, t('auth.loginError'))
    loginError.value = msg
    toastError(msg)
  }
}
</script>
