<template>
  <section id="health" class="py-16 sm:py-20 px-4 sm:px-6 bg-mama-bg">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10 sm:mb-14">
        <div class="inline-flex items-center gap-2 bg-mama-sky text-mama-teal px-4 py-2 rounded-full text-sm font-semibold mb-4">
          {{ t('dashboard.badge') }}
        </div>
        <h2 class="text-fluid-4xl font-black text-mama-text mb-4">
          {{ t('dashboard.headline1') }}<br class="hidden sm:block" />
          <span class="text-mama-teal">{{ t('dashboard.headline2') }}</span>
        </h2>
        <p class="text-fluid-lg text-mama-muted max-w-xl mx-auto">
          {{ t('dashboard.sub') }}
        </p>
      </div>

      <!-- App screenshots — staggered 2-column layout -->
      <div class="max-w-3xl mx-auto grid grid-cols-2 gap-6 sm:gap-10 items-start">

        <!-- Left column -->
        <div class="flex flex-col gap-6 sm:gap-10">
          <div class="animate-float" style="animation-delay: 0ms">
            <img
              src="/health-dashboard-image-one.png"
              alt="MamaVoice health check-in screen in dark mode showing weight, blood pressure, and symptom history"
              class="w-full object-contain drop-shadow-xl"
            />
          </div>
          <div class="animate-float" style="animation-delay: 200ms">
            <img
              src="/health-dashboard-four.png"
              alt="MamaVoice vaccine schedule tracker showing baby immunisation milestones"
              class="w-full object-contain drop-shadow-xl"
            />
          </div>
        </div>

        <!-- Right column — offset down for stagger -->
        <div class="flex flex-col gap-6 sm:gap-10 mt-10 sm:mt-16">
          <div class="animate-float" style="animation-delay: 100ms">
            <img
              src="/health-dashboard-image-two.png"
              alt="MamaVoice health check-in screen in light mode"
              class="w-full object-contain drop-shadow-xl"
            />
          </div>
          <div class="animate-float" style="animation-delay: 300ms">
            <img
              src="/health-dashboard-three.png"
              alt="MamaVoice profile screen showing user Amara Okeke, language, reminders, and theme settings"
              class="w-full object-contain drop-shadow-xl"
            />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
