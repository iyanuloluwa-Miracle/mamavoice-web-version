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
        <h1 class="text-2xl font-bold text-mama-text mb-1">{{ t('auth.registerTitle') }}</h1>
        <p class="text-sm text-mama-muted mb-6">{{ t('auth.registerSub') }}</p>

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
            <label class="block text-xs font-semibold text-mama-text mb-1.5">{{ t('auth.password') }}</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                :placeholder="t('auth.passwordPlaceholder')"
                minlength="8"
                required
                class="w-full px-4 py-3 pr-11 rounded-2xl border border-mama-border bg-mama-input text-mama-text placeholder-mama-muted/60 text-sm focus:outline-none focus:border-mama-teal focus:bg-mama-surface transition-colors"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-mama-muted hover:text-mama-text transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
            <p class="text-[11px] text-mama-muted mt-1">{{ t('auth.passwordMin') }}</p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-xs font-semibold text-mama-text mb-1.5">{{ t('auth.confirmPasswordLabel') }}</label>
            <div class="relative">
              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                :placeholder="t('auth.passwordPlaceholder')"
                required
                class="w-full px-4 py-3 pr-11 rounded-2xl border bg-mama-input text-mama-text placeholder-mama-muted/60 text-sm focus:outline-none focus:bg-mama-surface transition-colors"
                :class="confirmPassword && !passwordsMatch
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-mama-border focus:border-mama-teal'"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-mama-muted hover:text-mama-text transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path v-if="!showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
            <p v-if="confirmPassword && !passwordsMatch" class="text-[11px] text-red-400 mt-1">
              {{ t('auth.passwordMismatch') }}
            </p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isLoading || !passwordsMatch"
            class="w-full py-3.5 rounded-2xl bg-mama-teal text-white font-semibold text-sm hover:bg-mama-teal-dark disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm mt-2"
          >
            <span v-if="!isLoading">{{ t('auth.signUp') }}</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              {{ t('auth.registering') }}
            </span>
          </button>
        </form>
      </div>

      <!-- Footer links -->
      <p class="text-center text-sm text-mama-muted mt-6">
        {{ t('auth.haveAccount') }}
        <NuxtLink to="/auth/login" class="font-semibold text-mama-teal hover:underline ml-1">
          {{ t('auth.signIn') }}
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

useSeoMeta({ title: 'Create Account — MamaVoice' })

const { t } = useI18n()
const auth = useAuthStore()
const { error: toastError } = useToast()

onMounted(() => {
  if (auth.isAuthenticated) navigateTo('/chat')
})

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = computed(() => auth.isLoading)

const passwordsMatch = computed(() =>
  confirmPassword.value === '' || password.value === confirmPassword.value
)

function extractError(err: unknown, fallback: string): string {
  const data = (err as { data?: { message?: string | string[] } })?.data
  if (!data) return (err as { message?: string })?.message ?? fallback
  return Array.isArray(data.message) ? data.message[0] : (data.message ?? fallback)
}

async function handleSubmit() {
  if (!passwordsMatch.value) {
    toastError(t('auth.passwordMismatch'))
    return
  }
  try {
    // auth.register stores pendingOtp so verify-email can read it even if
    // query params are stripped by the router (e.g. i18n beforeEach).
    const res = await auth.register(email.value, password.value)
    await navigateTo(
      `/auth/verify-email?otpId=${encodeURIComponent(res.otpId)}&email=${encodeURIComponent(email.value)}`
    )
  } catch (err: unknown) {
    toastError(extractError(err, t('auth.registerError')))
  }
}
</script>
