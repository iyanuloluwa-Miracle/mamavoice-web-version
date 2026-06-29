<template>
  <section id="nutrition" class="py-16 sm:py-20 px-4 sm:px-6 bg-mama-surface-section">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10 sm:mb-14">
        <h2 class="text-fluid-4xl font-black text-mama-text mb-4">
          {{ t('nutrition.headline1') }}<br class="hidden sm:block" />
          <span class="text-mama-teal">{{ t('nutrition.headline2') }}</span>
        </h2>
        <p class="text-fluid-lg text-mama-muted max-w-xl mx-auto">
          {{ t('nutrition.sub') }}
        </p>
      </div>

      <!-- Food cards: 1 col → 2 col (sm) → 3 col (md) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        <div
          v-for="food in foods"
          :key="food.key"
          class="bg-mama-bg rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all duration-300 group"
        >
          <!-- Food image area -->
          <div class="h-36 sm:h-44 flex items-center justify-center relative overflow-hidden" :class="food.gradient">
            <span class="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-300">{{ food.emoji }}</span>
            <div class="absolute top-3 sm:top-4 right-3 sm:right-4">
              <span class="bg-mama-teal text-white text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-bold">
                {{ food.badge }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5 sm:p-6">
            <h3 class="text-lg sm:text-xl font-bold text-mama-text mb-1">{{ food.name }}</h3>
            <p class="text-mama-muted text-sm mb-4">{{ food.description }}</p>

            <!-- Benefits -->
            <ul class="space-y-2 mb-4 sm:mb-5">
              <li v-for="benefit in food.benefits" :key="benefit" class="flex items-start gap-2 text-sm text-mama-text">
                <svg class="w-4 h-4 text-mama-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                {{ benefit }}
              </li>
            </ul>

            <!-- Meta row -->
            <div class="flex items-center gap-3 pt-3 sm:pt-4 border-t border-mama-border-light flex-wrap">
              <div class="flex items-center gap-1.5 text-xs text-mama-muted">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ food.prepDuration }} {{ t('nutrition.prep') }}
              </div>
              <div class="flex items-center gap-1.5 text-xs text-mama-muted">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {{ t('nutrition.serves') }} {{ food.servesCount }}
              </div>
              <span class="ml-auto text-xs font-bold px-2.5 py-1 rounded-full" :class="food.safetyClass">
                {{ food.safety }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-10 sm:mt-12">
        <p class="text-mama-muted mb-4 text-sm sm:text-base">{{ t('nutrition.ctaSub') }}</p>
        <NuxtLink to="/chat"
          class="inline-flex items-center gap-2 bg-mama-teal text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold hover:bg-mama-teal-dark transition-all shadow-md text-sm sm:text-base">
          {{ t('nutrition.cta') }}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

const foods = computed(() => [
  {
    key: 'moimoi',
    emoji: '🫘',
    gradient: 'bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20',
    safetyClass: 'bg-green-50 dark:bg-green-900/30 text-mama-green dark:text-green-400',
    name: t('nutrition.moimoi.name'),
    badge: t('nutrition.moimoi.badge'),
    description: t('nutrition.moimoi.desc'),
    benefits: [t('nutrition.moimoi.b0'), t('nutrition.moimoi.b1'), t('nutrition.moimoi.b2')],
    prepDuration: '45 min',
    servesCount: '4–6',
    safety: t('nutrition.moimoi.safety'),
  },
  {
    key: 'ugu',
    emoji: '🥬',
    gradient: 'bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20',
    safetyClass: 'bg-green-50 dark:bg-green-900/30 text-mama-green dark:text-green-400',
    name: t('nutrition.ugu.name'),
    badge: t('nutrition.ugu.badge'),
    description: t('nutrition.ugu.desc'),
    benefits: [t('nutrition.ugu.b0'), t('nutrition.ugu.b1'), t('nutrition.ugu.b2')],
    prepDuration: '30 min',
    servesCount: '3–4',
    safety: t('nutrition.ugu.safety'),
  },
  {
    key: 'pap',
    emoji: '🌽',
    gradient: 'bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20',
    safetyClass: 'bg-green-50 dark:bg-green-900/30 text-mama-green dark:text-green-400',
    name: t('nutrition.pap.name'),
    badge: t('nutrition.pap.badge'),
    description: t('nutrition.pap.desc'),
    benefits: [t('nutrition.pap.b0'), t('nutrition.pap.b1'), t('nutrition.pap.b2')],
    prepDuration: '20 min',
    servesCount: '2',
    safety: t('nutrition.pap.safety'),
  },
])
</script>
