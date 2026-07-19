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

      <!-- ── Right: Hero image ────────────────────────────────── -->
      <div class="order-2 flex justify-center lg:justify-end w-full">
        <div class="relative animate-float w-full flex justify-center lg:justify-end">
          <!-- Subtle glow -->
          <div class="absolute inset-0 bg-gradient-to-br from-mama-teal/20 to-mama-sky/40 rounded-3xl blur-2xl scale-105" aria-hidden="true" />
          <img
            src="/Pregnancy-stages-pana.svg"
            alt="MamaVoice Companion app showing pregnancy health dashboard"
            class="relative w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl object-contain drop-shadow-2xl"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
