<template>
  <section id="health" class="py-16 sm:py-20 px-4 sm:px-6 bg-mama-bg overflow-hidden">
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

      <!-- Phone showcase — labelled horizontal row inside card -->
      <div class="rounded-3xl bg-gradient-to-br from-mama-sky/60 to-mama-teal/5 px-6 pt-8 pb-0 sm:px-10 sm:pt-10 overflow-hidden">
        <div class="flex items-start gap-4 sm:gap-6 lg:gap-8 overflow-x-auto sm:justify-center scroll-x">

          <!-- Screen 1: Health Tracker (dark) -->
          <div class="flex-none flex flex-col items-center gap-4">
            <span class="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-mama-teal">Health Tracker</span>
            <div class="animate-float w-[55vw] sm:w-52 lg:w-60" style="animation-delay: 0ms">
              <img
                src="/health-dashboard-image-one.png"
                alt="MamaVoice health tracker in dark mode showing weight, blood pressure and symptom history"
                class="w-full object-contain drop-shadow-xl"
              />
            </div>
          </div>

          <!-- Screen 2: Daily Check-In (light) -->
          <div class="flex-none flex flex-col items-center gap-4">
            <span class="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-mama-teal">Daily Check-In</span>
            <div class="animate-float w-[55vw] sm:w-52 lg:w-60" style="animation-delay: 100ms">
              <img
                src="/health-dashboard-image-two.png"
                alt="MamaVoice daily health check-in in light mode"
                class="w-full object-contain drop-shadow-xl"
              />
            </div>
          </div>

          <!-- Screen 3: My Profile (dark) -->
          <div class="flex-none flex flex-col items-center gap-4">
            <span class="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-mama-teal">My Profile</span>
            <div class="animate-float w-[55vw] sm:w-52 lg:w-60" style="animation-delay: 200ms">
              <img
                src="/health-dashboard-three.png"
                alt="MamaVoice user profile with language and notification preferences"
                class="w-full object-contain drop-shadow-xl"
              />
            </div>
          </div>

          <!-- Screen 4: Vaccines (light) -->
          <div class="flex-none flex flex-col items-center gap-4">
            <span class="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-mama-teal">Vaccines</span>
            <div class="animate-float w-[55vw] sm:w-52 lg:w-60" style="animation-delay: 300ms">
              <img
                src="/health-dashboard-four.png"
                alt="MamaVoice vaccine schedule showing baby immunization progress"
                class="w-full object-contain drop-shadow-xl"
              />
            </div>
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
