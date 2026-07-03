<template>
  <div class="min-h-screen bg-mama-bg flex flex-col items-center justify-center px-4 py-12">
    <div class="w-full max-w-lg">

      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center justify-center gap-2 mb-8">
        <img src="/mamavoiceLogo.png" alt="MamaVoice" class="h-10 w-auto rounded-xl" />
        <span class="text-2xl font-black text-mama-coral">MamaVoice</span>
      </NuxtLink>

      <!-- Card -->
      <div class="bg-mama-surface rounded-3xl border border-mama-border-light shadow-soft p-6 sm:p-8">
        <!-- Header -->
        <div class="mb-6">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-mama-teal to-mama-teal-light flex items-center justify-center mb-4 shadow-soft">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-mama-text">{{ t('onboarding.title') }}</h1>
          <p class="text-sm text-mama-muted mt-1">{{ t('onboarding.subtitle') }}</p>
        </div>

        <!-- Enums load failure — state/LGA options unavailable -->
        <div v-if="enumsError"
          class="mb-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
          <p class="text-sm text-amber-800 dark:text-amber-300">{{ t('onboarding.enumsError') }}</p>
          <button
            type="button"
            @click="loadEnums"
            :disabled="enumsLoading"
            class="shrink-0 text-sm font-semibold text-mama-teal hover:underline disabled:opacity-50"
          >
            {{ enumsLoading ? t('onboarding.saving') : t('onboarding.retry') }}
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Name row -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-mama-text mb-1.5">{{ t('onboarding.firstName') }}</label>
              <input
                v-model="form.firstName"
                type="text"
                autocomplete="given-name"
                required
                minlength="2"
                maxlength="50"
                pattern="[a-zA-ZÀ-ÿ\s\-']{2,50}"
                class="w-full px-4 py-3 rounded-2xl border border-mama-border bg-mama-input text-mama-text text-sm focus:outline-none focus:border-mama-teal focus:bg-mama-surface transition-colors"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-mama-text mb-1.5">{{ t('onboarding.lastName') }}</label>
              <input
                v-model="form.lastName"
                type="text"
                autocomplete="family-name"
                required
                minlength="2"
                maxlength="50"
                pattern="[a-zA-ZÀ-ÿ\s\-']{2,50}"
                class="w-full px-4 py-3 rounded-2xl border border-mama-border bg-mama-input text-mama-text text-sm focus:outline-none focus:border-mama-teal focus:bg-mama-surface transition-colors"
              />
            </div>
          </div>

          <!-- Mother stage -->
          <div>
            <label class="block text-xs font-semibold text-mama-text mb-2">{{ t('onboarding.motherStage') }}</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="stage in stages"
                :key="stage.value"
                type="button"
                @click="form.motherStage = stage.value"
                class="py-3 px-4 rounded-2xl border-2 text-sm font-semibold transition-all"
                :class="form.motherStage === stage.value
                  ? 'border-mama-teal bg-mama-sky text-mama-teal'
                  : 'border-mama-border text-mama-muted hover:border-mama-teal/40 hover:text-mama-text'"
              >
                <span class="text-base mr-2">{{ stage.emoji }}</span>{{ stage.label }}
              </button>
            </div>
          </div>

          <!-- Target date -->
          <div>
            <label class="block text-xs font-semibold text-mama-text mb-1.5">{{ t('onboarding.targetDate') }}</label>
            <p class="text-[11px] text-mama-muted mb-1.5">{{ t('onboarding.targetDateHint') }}</p>
            <input
              v-model="form.targetDate"
              type="date"
              required
              class="w-full px-4 py-3 rounded-2xl border border-mama-border bg-mama-input text-mama-text text-sm focus:outline-none focus:border-mama-teal focus:bg-mama-surface transition-colors"
            />
          </div>

          <!-- Language -->
          <div>
            <label class="block text-xs font-semibold text-mama-text mb-1.5">{{ t('onboarding.language') }}</label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="lang in languages"
                :key="lang"
                type="button"
                @click="selectLanguage(lang)"
                class="py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all text-left"
                :class="form.language === lang
                  ? 'border-mama-teal bg-mama-sky text-mama-teal'
                  : 'border-mama-border text-mama-muted hover:border-mama-teal/40'"
              >
                {{ lang }}
              </button>
            </div>
          </div>

          <!-- State -->
          <div>
            <label class="block text-xs font-semibold text-mama-text mb-1.5">{{ t('onboarding.state') }}</label>
            <select
              v-model="form.state"
              required
              @change="form.lga = ''"
              class="w-full px-4 py-3 rounded-2xl border border-mama-border bg-mama-input text-mama-text text-sm focus:outline-none focus:border-mama-teal focus:bg-mama-surface transition-colors appearance-none"
            >
              <option value="" disabled>{{ t('onboarding.selectState') }}</option>
              <option v-for="s in states" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>

          <!-- LGA -->
          <div>
            <label class="block text-xs font-semibold text-mama-text mb-1.5">{{ t('onboarding.lga') }}</label>
            <select
              v-model="form.lga"
              required
              :disabled="!form.state"
              class="w-full px-4 py-3 rounded-2xl border border-mama-border bg-mama-input text-mama-text text-sm focus:outline-none focus:border-mama-teal focus:bg-mama-surface transition-colors appearance-none disabled:opacity-50"
            >
              <option value="" disabled>{{ t('onboarding.selectLga') }}</option>
              <option v-for="l in lgas" :key="l" :value="l">{{ l }}</option>
            </select>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="!canSubmit || isLoading"
            class="w-full py-3.5 rounded-2xl bg-mama-teal text-white font-semibold text-sm hover:bg-mama-teal-dark disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <span v-if="!isLoading">{{ t('onboarding.save') }}</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              {{ t('onboarding.saving') }}
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '~/stores/auth'
import { userService } from '~/services/user.service'
import { enumsService } from '~/services/enums.service'
import type { EnumsDto } from '~/types/api'

definePageMeta({ middleware: 'auth', layout: false })

useSeoMeta({ title: 'Set Up Your Profile — MamaVoice' })

const { t } = useI18n()
const auth = useAuthStore()
const { error: toastError, success: toastSuccess } = useToast()

const form = reactive({
  firstName: auth.user?.firstName ?? '',
  lastName: auth.user?.lastName ?? '',
  motherStage: null as 'Pregnant' | 'New Mom' | null,
  targetDate: '',
  language: 'English' as 'English' | 'Yoruba' | 'Igbo' | 'Hausa',
  state: '',
  lga: '',
})

const stages = [
  { value: 'Pregnant' as const, label: t('onboarding.pregnant'), emoji: '🤰' },
  { value: 'New Mom' as const, label: t('onboarding.newMom'), emoji: '👶' },
]

const languages = ['English', 'Yoruba', 'Igbo', 'Hausa'] as const

function selectLanguage(lang: string) {
  form.language = lang as typeof form.language
}

const enums = ref<EnumsDto | null>(null)
const enumsLoading = ref(false)
const enumsError = ref(false)
const isLoading = ref(false)

const states = computed(() => enums.value?.states ?? [])
const lgas = computed(() => {
  if (!form.state || !enums.value) return []
  return enums.value.stateLgas[form.state] ?? []
})

const canSubmit = computed(() =>
  form.firstName.length >= 2 &&
  form.lastName.length >= 2 &&
  form.motherStage !== null &&
  form.targetDate !== '' &&
  form.state !== '' &&
  form.lga !== '',
)

async function loadEnums() {
  enumsLoading.value = true
  enumsError.value = false
  try {
    enums.value = await enumsService.getEnums()
  } catch {
    enumsError.value = true
  } finally {
    enumsLoading.value = false
  }
}

onMounted(loadEnums)

async function handleSubmit() {
  if (!canSubmit.value || !form.motherStage) return
  isLoading.value = true
  try {
    const updated = await userService.updateProfile({
      firstName: form.firstName,
      lastName: form.lastName,
      language: form.language,
      state: form.state,
      lga: form.lga,
      motherStage: form.motherStage,
      targetDate: form.targetDate,
    })
    auth.setUser(updated)
    toastSuccess(t('onboarding.saved'))
    await navigateTo('/chat')
  } catch (err: unknown) {
    const msg = (err as { data?: { message?: string } })?.data?.message
      ?? (err as { message?: string })?.message
      ?? t('onboarding.saveError')
    toastError(msg)
  } finally {
    isLoading.value = false
  }
}
</script>
