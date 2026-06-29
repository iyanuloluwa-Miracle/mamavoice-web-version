<template>
  <section id="how-it-works" class="py-16 sm:py-20 px-4 sm:px-6 bg-mama-bg">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10 sm:mb-14">
        <h2 class="text-fluid-4xl font-black text-mama-text mb-4">
          {{ t('howItWorks.headline1') }}
          <span class="text-mama-teal">{{ t('howItWorks.headline2') }}</span>
        </h2>
        <p class="text-fluid-lg text-mama-muted max-w-xl mx-auto">
          {{ t('howItWorks.sub') }}
        </p>
      </div>

      <!-- Steps: 1 col → 2 col (sm) → 3 col (lg) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="step in steps"
          :key="step.num"
          class="bg-mama-surface rounded-3xl p-5 sm:p-6 shadow-soft hover:shadow-soft-hover transition-all duration-300 relative overflow-hidden group"
        >
          <!-- Ghost step number -->
          <div class="absolute top-2 right-4 text-6xl sm:text-7xl font-black text-mama-teal/8 select-none leading-none pointer-events-none">
            {{ step.num }}
          </div>

          <!-- Icon -->
          <div
            class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-lg sm:text-xl mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-110"
            :class="step.iconBg"
          >
            {{ step.emoji }}
          </div>

          <!-- Step badge -->
          <div class="inline-flex items-center gap-1 text-xs font-bold text-mama-teal bg-mama-sky px-2.5 py-1 rounded-full mb-3">
            {{ t('howItWorks.step') }} {{ step.num }}
          </div>

          <h3 class="text-base sm:text-lg font-bold text-mama-text mb-2">{{ step.title }}</h3>
          <p class="text-mama-muted text-sm leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-10 sm:mt-12">
        <NuxtLink
          to="/chat"
          class="inline-flex items-center gap-2 bg-mama-teal text-white px-8 sm:px-10 py-4 rounded-full font-bold text-sm sm:text-base shadow-md hover:bg-mama-teal-dark hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          {{ t('howItWorks.cta') }}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const steps = computed(() => [
  { num: '01', emoji: '📱', iconBg: 'bg-mama-sky dark:bg-slate-700',    title: t('howItWorks.s1.title'), desc: t('howItWorks.s1.desc') },
  { num: '02', emoji: '👤', iconBg: 'bg-green-50 dark:bg-slate-700',   title: t('howItWorks.s2.title'), desc: t('howItWorks.s2.desc') },
  { num: '03', emoji: '🎙️', iconBg: 'bg-orange-50 dark:bg-slate-700', title: t('howItWorks.s3.title'), desc: t('howItWorks.s3.desc') },
  { num: '04', emoji: '📊', iconBg: 'bg-purple-50 dark:bg-slate-700',  title: t('howItWorks.s4.title'), desc: t('howItWorks.s4.desc') },
  { num: '05', emoji: '🏥', iconBg: 'bg-mama-sky dark:bg-slate-700',    title: t('howItWorks.s5.title'), desc: t('howItWorks.s5.desc') },
  { num: '06', emoji: '🌍', iconBg: 'bg-green-50 dark:bg-slate-700',   title: t('howItWorks.s6.title'), desc: t('howItWorks.s6.desc') },
])
</script>
