<template>
  <section id="health" class="py-16 sm:py-20 bg-mama-bg">

    <!-- Header -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-14">
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

    <!-- Premium phone showcase card -->
    <div class="px-4 sm:px-6">
      <div class="max-w-[1400px] mx-auto showcase-card rounded-[2.5rem] px-8 sm:px-10 pt-10 sm:pt-14 pb-0">
        <div class="flex items-start gap-4 sm:gap-5 xl:gap-6 overflow-x-auto xl:justify-center">

          <!-- Screen 1: Health Tracker (dark) -->
          <div class="flex-none flex flex-col items-center gap-4 phone-enter" style="animation-delay: 0ms">
            <span class="text-[10px] font-bold tracking-[0.22em] uppercase text-mama-teal/70 whitespace-nowrap">Health Tracker</span>
            <div class="phone-display">
              <div class="animate-float w-[52vw] sm:w-40 lg:w-44 xl:w-48" style="animation-delay: 0ms">
                <img
                  src="/health-dashboard-image-one.png"
                  alt="MamaVoice health tracker in dark mode showing weight, blood pressure and symptom history"
                  class="w-full object-contain"
                />
              </div>
            </div>
          </div>

          <!-- Screen 2: Daily Check-In (light) -->
          <div class="flex-none flex flex-col items-center gap-4 phone-enter" style="animation-delay: 100ms">
            <span class="text-[10px] font-bold tracking-[0.22em] uppercase text-mama-teal/70 whitespace-nowrap">Daily Check-In</span>
            <div class="phone-display">
              <div class="animate-float w-[52vw] sm:w-40 lg:w-44 xl:w-48" style="animation-delay: 100ms">
                <img
                  src="/health-dashboard-image-two.png"
                  alt="MamaVoice daily health check-in in light mode"
                  class="w-full object-contain"
                />
              </div>
            </div>
          </div>

          <!-- Screen 3: My Profile (dark) -->
          <div class="flex-none flex flex-col items-center gap-4 phone-enter" style="animation-delay: 200ms">
            <span class="text-[10px] font-bold tracking-[0.22em] uppercase text-mama-teal/70 whitespace-nowrap">My Profile</span>
            <div class="phone-display">
              <div class="animate-float w-[52vw] sm:w-40 lg:w-44 xl:w-48" style="animation-delay: 200ms">
                <img
                  src="/health-dashboard-three.png"
                  alt="MamaVoice user profile with language and notification preferences"
                  class="w-full object-contain"
                />
              </div>
            </div>
          </div>

          <!-- Screen 4: Vaccines (light) -->
          <div class="flex-none flex flex-col items-center gap-4 phone-enter" style="animation-delay: 300ms">
            <span class="text-[10px] font-bold tracking-[0.22em] uppercase text-mama-teal/70 whitespace-nowrap">Vaccines</span>
            <div class="phone-display">
              <div class="animate-float w-[52vw] sm:w-40 lg:w-44 xl:w-48" style="animation-delay: 300ms">
                <img
                  src="/health-dashboard-four.png"
                  alt="MamaVoice vaccine schedule showing baby immunization progress"
                  class="w-full object-contain"
                />
              </div>
            </div>
          </div>

          <!-- Screen 5: Voice AI (dark) -->
          <div class="flex-none flex flex-col items-center gap-4 phone-enter" style="animation-delay: 400ms">
            <span class="text-[10px] font-bold tracking-[0.22em] uppercase text-mama-teal/70 whitespace-nowrap">Voice AI</span>
            <div class="phone-display">
              <div class="animate-float w-[52vw] sm:w-40 lg:w-44 xl:w-48" style="animation-delay: 400ms">
                <img
                  src="/health-dashboard-five.png"
                  alt="MamaVoice AI voice chat answering pregnancy questions in dark mode"
                  class="w-full object-contain"
                />
              </div>
            </div>
          </div>

          <!-- Screen 6: Home (light) -->
          <div class="flex-none flex flex-col items-center gap-4 phone-enter" style="animation-delay: 500ms">
            <span class="text-[10px] font-bold tracking-[0.22em] uppercase text-mama-teal/70 whitespace-nowrap">Home</span>
            <div class="phone-display">
              <div class="animate-float w-[52vw] sm:w-40 lg:w-44 xl:w-48" style="animation-delay: 500ms">
                <img
                  src="/health-dashboard-six.png"
                  alt="MamaVoice home screen showing pregnancy week tracker and voice prompt"
                  class="w-full object-contain"
                />
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

const { t } = useI18n()
</script>
