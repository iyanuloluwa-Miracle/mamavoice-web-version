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
        <!-- Email icon -->
        <div class="w-14 h-14 rounded-2xl bg-mama-sky flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-mama-teal" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
          </svg>
        </div>

        <h1 class="text-2xl font-bold text-mama-text mb-1">{{ t('auth.verifyTitle') }}</h1>

        <!-- Missing-params error (navigated here without an active OTP) -->
        <div v-if="hasParamsError" class="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {{ t('auth.verifyMissingParams') }}
          <NuxtLink to="/auth/register" class="font-semibold underline ml-1">{{ t('auth.backToRegister') }}</NuxtLink>
        </div>

        <p v-else class="text-sm text-mama-muted mb-6">
          {{ t('auth.verifySubtitle') }}
          <span class="font-semibold text-mama-text">{{ emailParam }}</span>
        </p>

        <!-- OTP inputs -->
        <form v-if="!hasParamsError" @submit.prevent="handleSubmit">
          <div class="flex gap-2 justify-center mb-6">
            <input
              v-for="(_, i) in 6"
              :key="i"
              :ref="(el) => setInputRef(i, el)"
              v-model="digits[i]"
              type="text"
              inputmode="numeric"
              maxlength="1"
              @input="onDigitInput(i)"
              @keydown.backspace="onBackspace(i)"
              @paste.prevent="onPaste"
              class="w-11 h-12 text-center text-lg font-bold rounded-xl border-2 bg-mama-input text-mama-text focus:outline-none transition-all"
              :class="digits[i] ? 'border-mama-teal bg-mama-sky' : 'border-mama-border focus:border-mama-teal'"
            />
          </div>

          <button
            type="submit"
            :disabled="otp.length < 6 || isLoading"
            class="w-full py-3.5 rounded-2xl bg-mama-teal text-white font-semibold text-sm hover:bg-mama-teal-dark disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <span v-if="!isLoading">{{ t('auth.verifyButton') }}</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              {{ t('auth.verifying') }}
            </span>
          </button>
        </form>

        <!-- Resend -->
        <div v-if="!hasParamsError" class="text-center mt-4">
          <button
            v-if="resendCountdown === 0"
            @click="handleResend"
            :disabled="isResending"
            class="text-sm font-semibold text-mama-teal hover:underline disabled:opacity-50"
          >
            {{ t('auth.resendOtp') }}
          </button>
          <p v-else class="text-sm text-mama-muted">
            {{ t('auth.resendIn', { s: resendCountdown }) }}
          </p>
        </div>
      </div>

      <p class="text-center text-sm text-mama-muted mt-6">
        <NuxtLink to="/auth/register" class="font-semibold text-mama-teal hover:underline">
          {{ t('auth.backToRegister') }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: false })

useSeoMeta({ title: 'Verify Email — MamaVoice' })

const { t, setLocale } = useI18n()
const auth = useAuthStore()
const { error: toastError, success: toastSuccess } = useToast()
const route = useRoute()

// Prefer in-memory OTP state (set by register/resend actions); fall back to
// URL query params so that direct links and page refreshes still work.
const emailParam = computed(() =>
  auth.pendingOtp?.email ?? (route.query.email as string) ?? ''
)
const currentOtpId = ref(
  auth.pendingOtp?.otpId ?? (route.query.otpId as string) ?? ''
)

const hasParamsError = ref(false)

onMounted(async () => {
  await nextTick()
  // Re-read in case the store was populated after component creation
  if (!currentOtpId.value) {
    currentOtpId.value = auth.pendingOtp?.otpId ?? (route.query.otpId as string) ?? ''
  }

  if (auth.isAuthenticated && auth.user?.profileCompleted) {
    navigateTo('/chat')
    return
  }
  if (!currentOtpId.value || !emailParam.value) {
    hasParamsError.value = true
    return
  }
  startResendTimer()
})

const digits = ref<string[]>(['', '', '', '', '', ''])
const inputs = ref<HTMLInputElement[]>([])
const otp = computed(() => digits.value.join(''))

const isLoading = computed(() => auth.isLoading)
const isResending = ref(false)
const resendCountdown = ref(60)

function extractError(err: unknown, fallback: string): string {
  const data = (err as { data?: { message?: string | string[] } })?.data
  if (!data) return (err as { message?: string })?.message ?? fallback
  return Array.isArray(data.message) ? data.message[0] : (data.message ?? fallback)
}

let countdownTimer: ReturnType<typeof setInterval> | null = null

function startResendTimer() {
  resendCountdown.value = 60
  countdownTimer = setInterval(() => {
    resendCountdown.value--
    if (resendCountdown.value <= 0 && countdownTimer) {
      clearInterval(countdownTimer)
      countdownTimer = null
    }
  }, 1000)
}

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer)
})

function setInputRef(i: number, el: unknown) {
  if (el) inputs.value[i] = el as HTMLInputElement
}

function onDigitInput(i: number) {
  digits.value[i] = digits.value[i].replace(/\D/g, '').slice(-1)
  if (digits.value[i] && i < 5) {
    inputs.value[i + 1]?.focus()
  }
  if (otp.value.length === 6) handleSubmit()
}

function onBackspace(i: number) {
  if (!digits.value[i] && i > 0) {
    inputs.value[i - 1]?.focus()
  }
}

function onPaste(e: ClipboardEvent) {
  const text = e.clipboardData?.getData('text') ?? ''
  const nums = text.replace(/\D/g, '').slice(0, 6).split('')
  nums.forEach((d, i) => { digits.value[i] = d })
  inputs.value[Math.min(nums.length, 5)]?.focus()
  if (nums.length === 6) handleSubmit()
}

async function handleSubmit() {
  if (otp.value.length < 6 || isLoading.value) return
  try {
    await auth.verifyEmail(currentOtpId.value, otp.value)
    const savedLocale = profileLanguageToLocale(auth.user?.language)
    if (savedLocale) setLocale(savedLocale)
    if (!auth.user?.profileCompleted) {
      await navigateTo('/onboarding')
    } else {
      await navigateTo('/chat')
    }
  } catch (err: unknown) {
    toastError(extractError(err, t('auth.verifyError')))
    digits.value = ['', '', '', '', '', '']
    inputs.value[0]?.focus()
  }
}

async function handleResend() {
  isResending.value = true
  try {
    const res = await auth.resendOtp(emailParam.value)
    currentOtpId.value = res.otpId
    hasParamsError.value = false
    toastSuccess(t('auth.resendSuccess'))
    startResendTimer()
  } catch (err: unknown) {
    toastError(extractError(err, t('auth.resendError')))
  } finally {
    isResending.value = false
  }
}
</script>
