<template>
  <section class="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-mama-teal to-mama-teal-dark relative overflow-hidden">
    <div class="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-white/5 rounded-full blur-3xl" aria-hidden="true" />
    <div class="absolute bottom-0 left-0 w-36 sm:w-56 h-36 sm:h-56 bg-mama-coral/20 rounded-full blur-3xl" aria-hidden="true" />

    <div class="max-w-4xl mx-auto text-center relative z-10">
      <div class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/15 backdrop-blur-sm rounded-3xl mb-6 sm:mb-8 text-3xl sm:text-4xl">
        🎙️
      </div>

      <h2 class="text-fluid-5xl font-black text-white mb-4 sm:mb-6 leading-tight">
        {{ t('webApp.headline1') }}<br />
        <span class="text-mama-sky">{{ t('webApp.headline2') }}</span>
      </h2>

      <p class="text-white/70 text-fluid-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
        {{ t('webApp.sub') }}
      </p>

      <!-- Feature pills — scroll on mobile, wrap on desktop -->
      <div class="scroll-x flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
        <div
          v-for="pill in pills"
          :key="pill"
          class="scroll-snap-start flex-shrink-0 flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium"
        >
          <svg class="w-3.5 h-3.5 text-mama-sky flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
          {{ pill }}
        </div>
      </div>

      <!-- Main CTA -->
      <NuxtLink
        to="/chat"
        class="inline-flex items-center gap-2 sm:gap-3 bg-white text-mama-teal px-8 sm:px-10 py-4 sm:py-5 rounded-full font-black text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start max-w-sm sm:max-w-none mx-auto"
      >
        <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
        {{ t('webApp.cta') }}
      </NuxtLink>

      <p class="text-white/50 text-xs sm:text-sm mt-4 sm:mt-5">
        {{ t('webApp.footnote') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const pills = computed(() => [
  t('webApp.pill0'),
  t('webApp.pill1'),
  t('webApp.pill2'),
  t('webApp.pill3'),
])
</script>
