<template>
  <div class="min-h-screen bg-mama-bg py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      
      <!-- Back button -->
      <div class="mb-8">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-sm font-semibold text-mama-teal hover:text-mama-teal-dark transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
          </svg>
          {{ t('donate.backHome') }}
        </NuxtLink>
      </div>

      <!-- Hero Header -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <h1 class="text-4xl sm:text-5xl font-black text-mama-text leading-tight mb-4">
          {{ t('donate.title') }}
        </h1>
        <p class="text-lg text-mama-muted leading-relaxed">
          {{ t('donate.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        <!-- Left: Donation Form (7 cols) -->
        <div class="lg:col-span-7 bg-mama-surface border border-mama-border-light rounded-3xl p-6 sm:p-8 shadow-soft-sm">
          <form @submit.prevent="handleDonate" class="space-y-6">
            
            <!-- Quick select amounts -->
            <div>
              <label class="block text-sm font-bold text-mama-text mb-3">
                {{ t('donate.amountLabel') }}
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  v-for="amt in quickAmounts"
                  :key="amt"
                  type="button"
                  @click="selectAmount(amt)"
                  class="py-3 px-4 rounded-xl border font-bold text-sm text-center transition-all duration-200"
                  :class="amount === amt && !isCustom
                    ? 'bg-mama-teal border-mama-teal text-white shadow-soft-sm scale-[1.02]'
                    : 'bg-mama-bg dark:bg-slate-800 border-mama-border hover:border-mama-teal text-mama-text hover:text-mama-teal'"
                >
                  ₦{{ formatNumber(amt) }}
                </button>
              </div>
            </div>

            <!-- Custom Amount input -->
            <div>
              <div class="relative rounded-xl shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span class="text-mama-muted font-bold text-sm">₦</span>
                </div>
                <input
                  v-model.number="customAmount"
                  type="number"
                  min="100"
                  step="100"
                  :placeholder="t('donate.customAmountPlaceholder')"
                  @input="onCustomAmountInput"
                  class="block w-full pl-8 pr-4 py-3 rounded-xl bg-mama-bg dark:bg-slate-800 border border-mama-border text-mama-text placeholder-mama-muted focus:outline-none focus:ring-2 focus:ring-mama-teal/20 focus:border-mama-teal text-sm font-semibold transition-all"
                />
              </div>
              <p v-if="validationError" class="mt-2 text-xs text-red-500 font-semibold flex items-center gap-1">
                <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                {{ validationError }}
              </p>
            </div>

            <!-- Optional details (Name & Email) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-mama-muted uppercase tracking-wider mb-2">
                  {{ t('donate.donorName') }}
                </label>
                <input
                  v-model="donorName"
                  type="text"
                  :disabled="isAnonymous"
                  :placeholder="t('donate.donorNamePlaceholder')"
                  class="block w-full px-4 py-3 rounded-xl bg-mama-bg dark:bg-slate-800 border border-mama-border text-mama-text placeholder-mama-muted focus:outline-none focus:ring-2 focus:ring-mama-teal/20 focus:border-mama-teal text-sm transition-all"
                  :class="isAnonymous ? 'opacity-50 cursor-not-allowed' : ''"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-mama-muted uppercase tracking-wider mb-2">
                  {{ t('donate.donorEmail') }}
                </label>
                <input
                  v-model="donorEmail"
                  type="email"
                  :placeholder="t('donate.donorEmailPlaceholder')"
                  class="block w-full px-4 py-3 rounded-xl bg-mama-bg dark:bg-slate-800 border border-mama-border text-mama-text placeholder-mama-muted focus:outline-none focus:ring-2 focus:ring-mama-teal/20 focus:border-mama-teal text-sm transition-all"
                />
              </div>
            </div>

            <!-- Optional message -->
            <div>
              <label class="block text-xs font-bold text-mama-muted uppercase tracking-wider mb-2">
                {{ t('donate.message') }}
              </label>
              <textarea
                v-model="message"
                rows="3"
                :placeholder="t('donate.messagePlaceholder')"
                class="block w-full px-4 py-3 rounded-xl bg-mama-bg dark:bg-slate-800 border border-mama-border text-mama-text placeholder-mama-muted focus:outline-none focus:ring-2 focus:ring-mama-teal/20 focus:border-mama-teal text-sm transition-all resize-none"
              />
            </div>

            <!-- Anonymous checkbox -->
            <div class="flex items-center">
              <input
                id="anonymous-toggle"
                v-model="isAnonymous"
                type="checkbox"
                class="h-4.5 w-4.5 rounded border-mama-border text-mama-teal focus:ring-mama-teal bg-mama-bg dark:bg-slate-800 cursor-pointer"
              />
              <label for="anonymous-toggle" class="ml-2.5 text-sm font-semibold text-mama-text select-none cursor-pointer">
                {{ t('donate.anonymous') }}
              </label>
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex items-center justify-center gap-2 bg-mama-teal text-white py-4 rounded-full font-bold text-base shadow-md hover:bg-mama-teal-dark transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>{{ loading ? t('donate.initializing') : t('donate.submit') }}</span>
            </button>

          </form>
        </div>

        <!-- Right: Supporters Wall (5 cols) -->
        <div class="lg:col-span-5 bg-mama-surface border border-mama-border-light rounded-3xl p-6 sm:p-8 shadow-soft-sm flex flex-col h-[520px] max-h-[520px]">
          <h3 class="text-xl font-bold text-mama-text mb-4 flex items-center gap-2">
            <span>✨</span> {{ t('donate.supportersWall') }}
          </h3>

          <!-- Supporters List -->
          <div class="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
            
            <div v-if="loadingSupporters" class="flex flex-col items-center justify-center h-full gap-3 py-12 text-center text-mama-muted">
              <svg class="animate-spin h-8 w-8 text-mama-teal" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>

            <div v-else-if="supporters.length === 0" class="flex flex-col items-center justify-center h-full text-center py-12 px-4 gap-3">
              <span class="text-4xl">🌱</span>
              <p class="text-sm font-semibold text-mama-text">
                {{ t('donate.noSupporters') }}
              </p>
            </div>

            <div
              v-else
              v-for="(supporter, idx) in supporters"
              :key="idx"
              class="p-4 bg-mama-bg dark:bg-slate-800/40 rounded-2xl border border-mama-border-light/50 flex flex-col gap-2 hover:-translate-y-0.5 transition-transform duration-200"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="text-sm font-bold text-mama-text truncate">
                  {{ supporter.name }}
                </span>
                <span class="text-xs font-bold text-mama-teal bg-mama-sky px-2 py-0.5 rounded-full whitespace-nowrap">
                  ₦{{ formatNumber(supporter.amount) }}
                </span>
              </div>
              <p v-if="supporter.message" class="text-xs text-mama-muted italic leading-relaxed">
                "{{ supporter.message }}"
              </p>
              <span class="text-[10px] text-mama-muted self-end">
                {{ formatDate(supporter.date) }}
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../stores/auth'
import { useToast } from '../../composables/useToast'

const { t } = useI18n()
const auth = useAuthStore()
const toast = useToast()

const quickAmounts = [1000, 2500, 5000, 10000]

const amount = ref(2500)
const customAmount = ref<number | null>(null)
const isCustom = ref(false)
const donorName = ref('')
const donorEmail = ref('')
const message = ref('')
const isAnonymous = ref(false)
const loading = ref(false)
const validationError = ref('')

const supporters = ref<Array<{ name: string; amount: number; message: string; date: string }>>([])
const loadingSupporters = ref(true)

function selectAmount(amt: number) {
  amount.value = amt
  isCustom.value = false
  customAmount.value = null
  validationError.value = ''
}

function onCustomAmountInput() {
  if (customAmount.value !== null && customAmount.value > 0) {
    amount.value = customAmount.value
    isCustom.value = true
    validationError.value = customAmount.value < 100 ? t('donate.minAmountError') : ''
  } else {
    // Fall back to default quick amount
    amount.value = 2500
    isCustom.value = false
    validationError.value = ''
  }
}

function formatNumber(num: number): string {
  return num.toLocaleString()
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
}

async function fetchSupporters() {
  loadingSupporters.value = true
  try {
    const res = await $fetch<{ success: boolean; supporters: typeof supporters.value }>('/api/donate/supporters')
    if (res.success) {
      supporters.value = res.supporters
    }
  } catch (error) {
    console.error('[Fetch Supporters Error]', error)
  } finally {
    loadingSupporters.value = false
  }
}

async function handleDonate() {
  if (amount.value < 100) {
    validationError.value = t('donate.minAmountError')
    return
  }
  validationError.value = ''
  loading.value = true

  try {
    const res = await $fetch<{ success: boolean; checkoutUrl: string; paymentReference: string }>('/api/donate/initialize', {
      method: 'POST',
      body: {
        amount: amount.value,
        donorName: isAnonymous.value ? 'Anonymous Supporter' : donorName.value,
        donorEmail: donorEmail.value,
        message: message.value,
        isAnonymous: isAnonymous.value,
      },
    })

    if (res.success && res.checkoutUrl) {
      // Redirect to Monnify payment page
      window.location.href = res.checkoutUrl
    } else {
      toast.show(t('donate.failedMessage'), 'error')
    }
  } catch (error: any) {
    console.error('[Donate Error]', error)
    toast.show(error.data?.statusMessage || t('donate.failedMessage'), 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // Pre-populate if logged in
  if (auth.user) {
    donorEmail.value = auth.user.email || ''
    donorName.value = [auth.user.firstName, auth.user.lastName].filter(Boolean).join(' ') || ''
  }
  fetchSupporters()
})
</script>
