<template>
  <section id="download" class="py-16 sm:py-20 px-4 sm:px-6 bg-mama-bg">
    <div class="max-w-5xl mx-auto">
      <div class="bg-mama-surface rounded-[1.75rem] sm:rounded-[2rem] shadow-soft overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2">

          <!-- Left: Text & store buttons -->
          <div class="p-7 sm:p-10 lg:p-14 flex flex-col justify-center">
            <h2 class="text-fluid-4xl font-black text-mama-text mb-3 sm:mb-4 leading-tight">
              {{ t('download.headline1') }}<br />
              <span class="text-mama-teal">{{ t('download.headline2') }}</span>
            </h2>

            <p class="text-mama-muted text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed max-w-md">
              {{ t('download.sub') }}
            </p>

            <!-- App store buttons — stacked on xs, row on sm+ -->
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              <a href="#"
                class="flex items-center gap-3 bg-mama-dark text-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl hover:bg-mama-dark/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md flex-1 sm:flex-initial">
                <svg class="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div class="text-[10px] text-white/60 leading-none mb-0.5">{{ t('download.appStoreLabel') }}</div>
                  <div class="text-sm sm:text-base font-bold leading-none">App Store</div>
                </div>
              </a>

              <a href="#"
                class="flex items-center gap-3 bg-mama-dark text-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl hover:bg-mama-dark/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md flex-1 sm:flex-initial">
                <svg class="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M3.18 23.76c.39.22.83.24 1.24.07l12.1-6.99-2.56-2.56-10.78 9.48z" fill="#EA4335"/>
                  <path d="M20.82 10.07L17.48 8.1 14.65 10.7l2.83 2.83 3.35-1.96c.96-.56.96-1.95-.01-2.5z" fill="#FBBC04"/>
                  <path d="M4.42.24C4.01.07 3.57.09 3.18.31L14.65 11.7l2.83-2.83L4.42.24z" fill="#4285F4"/>
                  <path d="M3.18.31C2.45.74 2 1.5 2 2.41v19.18c0 .91.45 1.67 1.18 2.1L14.65 12 3.18.31z" fill="#34A853"/>
                </svg>
                <div>
                  <div class="text-[10px] text-white/60 leading-none mb-0.5">{{ t('download.playStoreLabel') }}</div>
                  <div class="text-sm sm:text-base font-bold leading-none">Google Play</div>
                </div>
              </a>
            </div>

            <!-- Continue on web -->
            <div class="flex items-center gap-3 pt-5 sm:pt-6 border-t border-mama-border-light">
              <svg class="w-5 h-5 text-mama-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
              </svg>
              <span class="text-mama-muted text-sm">{{ t('download.orWeb') }}</span>
              <NuxtLink to="/chat" class="text-mama-teal font-semibold text-sm hover:underline">
                {{ t('download.continueWeb') }}
              </NuxtLink>
            </div>
          </div>

          <!-- Right: QR + stats — hidden on mobile to keep the card compact -->
          <div class="hidden lg:flex bg-gradient-to-br from-mama-sky/40 to-mama-teal/10 p-10 lg:p-14 flex-col items-center justify-center gap-8">
            <!-- QR code -->
            <div class="bg-mama-surface rounded-2xl p-5 shadow-soft">
              <div class="w-40 h-40 relative">
                <div class="grid grid-cols-7 grid-rows-7 gap-1 w-full h-full">
                  <div v-for="(cell, i) in qrPattern" :key="i"
                    class="rounded-sm"
                    :class="cell ? 'bg-mama-dark' : 'bg-transparent'"
                  />
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-10 h-10 bg-mama-surface rounded-lg flex items-center justify-center shadow-sm">
                    <span class="text-mama-teal font-black text-xs">MV</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center">
              <p class="text-mama-text font-bold text-lg mb-1">{{ t('download.scanTitle') }}</p>
              <p class="text-mama-muted text-sm">{{ t('download.scanSub') }}</p>
            </div>

            <!-- Stat pills -->
            <div class="grid grid-cols-3 gap-4 w-full max-w-xs">
              <div v-for="stat in appStats" :key="stat.label"
                class="text-center bg-mama-surface/70 dark:bg-slate-800/70 rounded-2xl p-3 shadow-soft-sm">
                <div class="text-xl font-black text-mama-teal">{{ stat.value }}</div>
                <div class="text-[10px] text-mama-muted">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- Mobile-only: stat strip inside card -->
          <div class="lg:hidden grid grid-cols-3 gap-3 px-7 pb-7 sm:px-10 sm:pb-10">
            <div v-for="stat in appStats" :key="stat.label"
              class="text-center bg-mama-sky/30 rounded-2xl p-3">
              <div class="text-lg font-black text-mama-teal">{{ stat.value }}</div>
              <div class="text-[10px] text-mama-muted">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const appStats = computed(() => [
  { value: '4.9★', label: t('download.statRating') },
  { value: '10K+', label: t('download.statDownloads') },
  { value: '50+',  label: t('download.statDoctors') },
])

const qrPattern = [
  1,1,1,1,1,1,1,
  1,0,0,0,0,0,1,
  1,0,1,0,1,0,1,
  1,0,0,1,0,0,1,
  1,0,1,0,1,0,1,
  1,0,0,0,0,0,1,
  1,1,1,1,1,1,1,
]
</script>
