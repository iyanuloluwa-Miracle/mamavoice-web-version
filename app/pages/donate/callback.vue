<template>
  <div class="min-h-screen bg-mama-bg flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-mama-surface border border-mama-border-light rounded-3xl p-6 sm:p-8 shadow-lg text-center relative overflow-hidden">
      
      <!-- ── Verification in progress ────────────────────────── -->
      <div v-if="state === 'loading'" class="py-12 flex flex-col items-center gap-6">
        <div class="w-16 h-16 rounded-full border-4 border-mama-teal/20 border-t-mama-teal animate-spin" />
        <div>
          <h2 class="text-2xl font-bold text-mama-text mb-2">
            Confirming Payment
          </h2>
          <p class="text-sm text-mama-muted px-4">
            We are verifying your donation status with Monnify. Please do not close or refresh this page.
          </p>
        </div>
      </div>

      <!-- ── Success State ───────────────────────────────────── -->
      <div v-else-if="state === 'success'" class="py-4 space-y-6">
        
        <!-- Confetti/Checkmark Animation Container -->
        <div class="flex justify-center">
          <div class="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 animate-bounce">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="24" stroke-dashoffset="0" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        </div>

        <div>
          <h2 class="text-2xl sm:text-3xl font-black text-mama-text mb-2">
            {{ t('donate.successTitle') }}
          </h2>
          <p class="text-sm text-mama-muted">
            {{ t('donate.successMessage') }}
          </p>
        </div>

        <!-- Receipt Card -->
        <div class="bg-mama-bg dark:bg-slate-800/40 rounded-2xl p-5 border border-mama-border-light/70 text-left space-y-3.5">
          <h3 class="text-xs font-bold text-mama-muted uppercase tracking-wider text-center border-b border-mama-border-light pb-2 mb-1">
            {{ t('donate.receipt') }}
          </h3>
          
          <div class="flex justify-between items-start gap-2">
            <span class="text-xs text-mama-muted">{{ t('donate.donorName') }}</span>
            <span class="text-xs font-bold text-mama-text text-right">{{ donation?.donorName }}</span>
          </div>

          <div v-if="donation?.donorEmail && !donation.donorEmail.includes('anonymous-supporter')" class="flex justify-between items-start gap-2">
            <span class="text-xs text-mama-muted">{{ t('donate.donorEmail') }}</span>
            <span class="text-xs font-semibold text-mama-text text-right truncate max-w-[200px]">{{ donation?.donorEmail }}</span>
          </div>

          <div class="flex justify-between items-start gap-2">
            <span class="text-xs text-mama-muted">{{ t('donate.amount') }}</span>
            <span class="text-xs font-black text-mama-teal bg-mama-sky px-2 py-0.5 rounded-md">₦{{ formatNumber(donation?.amount || 0) }}</span>
          </div>

          <div class="flex justify-between items-start gap-2">
            <span class="text-xs text-mama-muted">{{ t('donate.paymentRef') }}</span>
            <span class="text-[10px] font-mono text-mama-text text-right truncate max-w-[150px]">{{ donation?.id }}</span>
          </div>

          <div class="flex justify-between items-start gap-2">
            <span class="text-xs text-mama-muted">{{ t('donate.date') }}</span>
            <span class="text-xs font-medium text-mama-text text-right">{{ formatDate(donation?.createdAt) }}</span>
          </div>

          <div class="flex justify-between items-start gap-2">
            <span class="text-xs text-mama-muted">{{ t('donate.status') }}</span>
            <span class="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400 px-2 py-0.5 rounded-md">
              SUCCESSFUL
            </span>
          </div>
        </div>

        <div class="pt-2">
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center w-full bg-mama-teal text-white py-3.5 rounded-full font-bold text-base shadow-md hover:bg-mama-teal-dark transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
          >
            {{ t('donate.backHome') }}
          </NuxtLink>
        </div>

      </div>

      <!-- ── Failed/Cancelled State ──────────────────────────── -->
      <div v-else-if="state === 'failed'" class="py-4 space-y-6">
        <div class="flex justify-center">
          <div class="w-20 h-20 rounded-full bg-red-50 dark:bg-red-950/30 border-2 border-red-500 flex items-center justify-center text-red-500">
            <svg class="w-10 h-10 animate-pulse" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
        </div>

        <div>
          <h2 class="text-2xl sm:text-3xl font-black text-mama-text mb-2">
            {{ t('donate.failedTitle') }}
          </h2>
          <p class="text-sm text-mama-muted">
            {{ t('donate.failedMessage') }}
          </p>
        </div>

        <div class="flex flex-col gap-3 pt-4">
          <NuxtLink
            to="/donate"
            class="inline-flex items-center justify-center w-full bg-mama-teal text-white py-3.5 rounded-full font-bold text-base shadow-md hover:bg-mama-teal-dark transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
          >
            {{ t('donate.retry') }}
          </NuxtLink>
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center w-full border-2 border-mama-border text-mama-text py-3 rounded-full font-bold text-base hover:bg-mama-sky/50 transition-all duration-300"
          >
            {{ t('donate.backHome') }}
          </NuxtLink>
        </div>
      </div>

      <!-- ── Pending State ───────────────────────────────────── -->
      <div v-else-if="state === 'pending'" class="py-4 space-y-6">
        <div class="flex justify-center">
          <div class="w-20 h-20 rounded-full bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-500 flex items-center justify-center text-amber-500">
            <svg class="w-10 h-10 animate-spin" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>

        <div>
          <h2 class="text-2xl sm:text-3xl font-black text-mama-text mb-2">
            {{ t('donate.pendingTitle') }}
          </h2>
          <p class="text-sm text-mama-muted">
            {{ t('donate.pendingMessage') }}
          </p>
        </div>

        <div class="flex flex-col gap-3 pt-4">
          <button
            @click="verify"
            class="inline-flex items-center justify-center w-full bg-mama-teal text-white py-3.5 rounded-full font-bold text-base shadow-md hover:bg-mama-teal-dark transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
          >
            Refresh Status
          </button>
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center w-full border-2 border-mama-border text-mama-text py-3 rounded-full font-bold text-base hover:bg-mama-sky/50 transition-all duration-300"
          >
            {{ t('donate.backHome') }}
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from '../../composables/useToast'

interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  createdAt: string;
  status: string;
}

const { t } = useI18n()
const route = useRoute()
const toast = useToast()

const state = ref<'loading' | 'success' | 'failed' | 'pending'>('loading')
const donation = ref<Donation | null>(null)

function formatNumber(num: number): string {
  return num.toLocaleString()
}

function formatDate(iso?: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

async function verify() {
  const paymentReference = route.query.paymentReference as string | undefined

  if (!paymentReference) {
    state.value = 'failed'
    return
  }

  state.value = 'loading'

  try {
    const res = await $fetch<{ success: boolean; donation: Donation }>(`/api/donate/verify?paymentReference=${encodeURIComponent(paymentReference)}`)

    if (res.success && res.donation?.status === 'SUCCESS') {
      donation.value = res.donation
      state.value = 'success'
    } else if (res.donation?.status === 'PENDING') {
      donation.value = res.donation
      state.value = 'pending'
    } else {
      state.value = 'failed'
    }
  } catch (error) {
    console.error('[Verification Request Error]', error)
    state.value = 'failed'
  }
}

onMounted(() => {
  verify()
})
</script>
