<template>
  <section class="relative flex items-center min-h-[90vh] md:min-h-screen pt-6 pb-16 px-4 sm:px-6 overflow-hidden">
    <!-- Background gradient blobs -->
    <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div class="absolute -top-20 right-0 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] bg-gradient-to-bl from-mama-sky via-mama-sky/30 to-transparent rounded-full blur-3xl opacity-70" />
      <div class="absolute bottom-0 left-0 w-48 sm:w-80 h-48 sm:h-80 bg-gradient-to-tr from-mama-teal/10 to-transparent rounded-full blur-3xl" />
    </div>

    <div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

      <!-- ── Left: Text content ─────────────────────────────────── -->
      <div class="animate-fade-in-up order-1 text-center lg:text-left">

        <!-- Headline — fluid typography -->
        <h1 class="text-fluid-hero font-black leading-tight text-mama-text mb-5">
          {{ t('hero.headline1') }}
          <span class="bg-gradient-to-r from-mama-teal to-mama-teal-light bg-clip-text text-transparent block sm:inline"> {{ t('hero.headline2') }}</span>
          <span class="text-mama-coral block sm:inline"> {{ t('hero.headline3') }}</span>
        </h1>

        <p class="text-fluid-lg text-mama-muted max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8">
          {{ t('hero.sub') }}
        </p>

        <!-- CTA buttons — stacked on mobile, row on sm+ -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
          <a
            href="#download"
            class="inline-flex items-center justify-center gap-2 bg-mama-teal text-white px-8 py-4 rounded-full font-bold text-base shadow-md hover:bg-mama-teal-dark hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.37.74 3.19.8.96-.1 1.95-.8 3.2-.8 1.5.07 2.63.64 3.33 1.6-3.04 1.77-2.55 6.19.28 7.28zM13 3.5c-.55 2.29-2.48 4-4.33 3.88C8.37 5.04 10.5 3 13 3.5z"/>
            </svg>
            {{ t('hero.downloadApp') }}
          </a>
          <NuxtLink
            to="/chat"
            class="inline-flex items-center justify-center gap-2 border-2 border-mama-teal text-mama-teal px-8 py-4 rounded-full font-bold text-base hover:bg-mama-sky transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
            {{ t('hero.tryWebApp') }}
          </NuxtLink>
        </div>

      </div>

      <!-- ── Right: Phone mockup ────────────────────────────────── -->
      <!-- Hidden on xs (< 480px), visible from sm upward -->
      <div class="order-2 flex justify-center lg:justify-end hidden sm:flex">
        <div class="relative animate-float">
          <!-- Glow behind phone -->
          <div class="absolute inset-0 bg-gradient-to-br from-mama-teal/20 to-mama-sky/40 rounded-[2.5rem] blur-2xl scale-110" aria-hidden="true" />

          <!-- Phone frame — slightly smaller on tablet, full on desktop -->
          <div
            class="relative w-[260px] sm:w-[280px] lg:w-[320px] bg-mama-surface rounded-[2rem] overflow-hidden"
            :style="{ boxShadow: phoneShadow }"
          >
            <!-- Status bar -->
            <div class="bg-mama-teal px-4 pt-4 pb-3 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span class="text-white text-xs font-bold">S</span>
                </div>
                <div>
                  <div class="text-white text-xs font-bold leading-tight">Sarah Adeyemi</div>
                  <div class="text-white/70 text-[10px]">Week 28 · 2nd Trimester</div>
                </div>
              </div>
              <div class="w-7 h-7 rounded-full bg-mama-coral flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>

            <!-- Pregnancy progress -->
            <div class="px-4 py-3 border-b border-mama-border-light">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-xs font-semibold text-mama-text">Pregnancy Progress</span>
                <span class="text-xs font-bold text-mama-teal">28 / 40 wks</span>
              </div>
              <div class="h-2 bg-mama-input rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-mama-teal to-mama-teal-light rounded-full" style="width: 70%" />
              </div>
              <div class="text-[10px] text-mama-muted mt-1">12 weeks remaining</div>
            </div>

            <!-- Stats row -->
            <div class="px-4 py-3 grid grid-cols-2 gap-2 border-b border-mama-border-light">
              <div class="bg-mama-sky/50 dark:bg-slate-700/50 rounded-xl p-2.5">
                <div class="text-[10px] text-mama-muted font-medium">Blood Pressure</div>
                <div class="text-sm font-bold text-mama-text">118/76</div>
                <div class="text-[9px] text-mama-green font-medium">● Normal</div>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-2.5">
                <div class="text-[10px] text-mama-muted font-medium">Weight</div>
                <div class="text-sm font-bold text-mama-text">68 kg</div>
                <div class="text-[9px] text-mama-coral font-medium">↑ +1.2 kg</div>
              </div>
            </div>

            <!-- Voice chat preview -->
            <div class="px-4 py-3 space-y-2.5">
              <div class="flex justify-end">
                <div class="bg-mama-teal text-white text-[11px] px-3 py-2 rounded-2xl rounded-br-sm max-w-[80%] leading-relaxed">
                  "My legs feel swollen today"
                </div>
              </div>
              <div class="flex items-start gap-2">
                <div class="w-6 h-6 rounded-full bg-mama-coral flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  </svg>
                </div>
                <div class="bg-mama-input text-mama-text text-[11px] px-3 py-2 rounded-2xl rounded-bl-sm max-w-[80%] leading-relaxed">
                  Mild swelling is common at week 28. Elevate your feet and stay hydrated. 💧
                </div>
              </div>
              <!-- Voice input bar -->
              <div class="flex items-center gap-2 bg-mama-input rounded-full px-3 py-2 border border-mama-border-light">
                <div class="w-5 h-5 rounded-full bg-mama-coral flex items-center justify-center flex-shrink-0">
                  <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  </svg>
                </div>
                <span class="text-[10px] text-mama-muted flex-1">Tap to speak...</span>
                <div class="flex items-end gap-0.5 h-4">
                  <div v-for="i in 4" :key="i" class="w-0.5 bg-mama-teal rounded-full animate-wave-bar"
                    :style="{ height: `${[40, 100, 60, 80][i-1]}%`, animationDelay: `${i * 100}ms` }" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useColorMode } from '../../composables/useColorMode'

const { isDark } = useColorMode()
const { t } = useI18n()

const phoneShadow = computed(() => isDark.value
  ? '0 32px 64px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)'
  : '0 32px 64px rgba(0,137,123,0.2), 0 8px 24px rgba(0,0,0,0.08)')

</script>
