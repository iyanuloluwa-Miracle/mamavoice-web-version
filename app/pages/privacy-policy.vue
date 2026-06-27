<template>
  <div class="bg-mama-bg dark:bg-[#0F172A] min-h-screen">
    <!-- Hero -->
    <section class="bg-mama-dark text-white py-16 sm:py-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
        <h1 class="text-fluid-4xl font-black text-white mb-4">{{ t('privacy.pageTitle') }}</h1>
        <p class="text-white/60 text-fluid-base leading-relaxed">{{ t('privacy.intro') }}</p>
        <p class="mt-4 text-white/40 text-sm">{{ t('privacy.lastUpdated') }}</p>
      </div>
    </section>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div class="lg:flex lg:gap-12 xl:gap-16 lg:items-start">
        <!-- ToC: mobile pills on top, desktop sticky sidebar -->
        <UiTableOfContents :sections="tocSections" :title="t('privacy.tocTitle')" />

        <!-- Article -->
        <article class="flex-1 min-w-0 w-full mt-8 lg:mt-0">
          <section
            v-for="section in sections"
            :key="section.id"
            :id="section.id"
            class="mb-6 scroll-mt-28"
          >
            <h2 class="text-lg sm:text-xl font-bold text-mama-text dark:text-white mb-3 flex items-center gap-3 border-l-4 border-mama-teal pl-4">
              <span class="w-6 h-6 rounded-md bg-mama-teal/10 text-mama-teal text-xs font-black flex items-center justify-center flex-shrink-0">
                {{ section.num }}
              </span>
              {{ t(section.titleKey) }}
            </h2>

            <!-- AI Disclaimer callout -->
            <div
              v-if="section.id === 'ai-disclaimer'"
              class="p-4 sm:p-5 rounded-2xl bg-mama-sky dark:bg-mama-teal/10 border border-mama-teal/20 flex gap-3"
            >
              <span class="text-xl flex-shrink-0">🤖</span>
              <p class="text-sm text-mama-text dark:text-white/80 font-medium leading-relaxed">
                {{ t(section.bodyKey) }}
              </p>
            </div>

            <!-- User Rights callout -->
            <div
              v-else-if="section.id === 'user-rights'"
              class="p-4 sm:p-5 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30"
            >
              <p class="text-sm text-mama-text dark:text-white/80 leading-relaxed">
                {{ t(section.bodyKey) }}
              </p>
            </div>

            <!-- Standard section body -->
            <div v-else class="bg-mama-surface dark:bg-mama-dark-card rounded-2xl p-4 sm:p-6 border border-mama-border-light dark:border-white/5">
              <p class="text-sm sm:text-base text-mama-muted dark:text-white/70 leading-relaxed">
                {{ t(section.bodyKey) }}
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSeoMeta } from '@unhead/vue'

const { t } = useI18n()

useSeoMeta({
  title: () => t('privacy.pageTitle'),
  description: () => t('privacy.metaDescription'),
})

interface PolicySection {
  id: string
  num: number
  titleKey: string
  bodyKey: string
}

const sections = computed<PolicySection[]>(() => [
  { num: 1,  id: t('privacy.s1id'),  titleKey: 'privacy.s1title',  bodyKey: 'privacy.s1body' },
  { num: 2,  id: t('privacy.s2id'),  titleKey: 'privacy.s2title',  bodyKey: 'privacy.s2body' },
  { num: 3,  id: t('privacy.s3id'),  titleKey: 'privacy.s3title',  bodyKey: 'privacy.s3body' },
  { num: 4,  id: t('privacy.s4id'),  titleKey: 'privacy.s4title',  bodyKey: 'privacy.s4body' },
  { num: 5,  id: t('privacy.s5id'),  titleKey: 'privacy.s5title',  bodyKey: 'privacy.s5body' },
  { num: 6,  id: t('privacy.s6id'),  titleKey: 'privacy.s6title',  bodyKey: 'privacy.s6body' },
  { num: 7,  id: t('privacy.s7id'),  titleKey: 'privacy.s7title',  bodyKey: 'privacy.s7body' },
  { num: 8,  id: t('privacy.s8id'),  titleKey: 'privacy.s8title',  bodyKey: 'privacy.s8body' },
  { num: 9,  id: t('privacy.s9id'),  titleKey: 'privacy.s9title',  bodyKey: 'privacy.s9body' },
  { num: 10, id: t('privacy.s10id'), titleKey: 'privacy.s10title', bodyKey: 'privacy.s10body' },
  { num: 11, id: t('privacy.s11id'), titleKey: 'privacy.s11title', bodyKey: 'privacy.s11body' },
  { num: 12, id: t('privacy.s12id'), titleKey: 'privacy.s12title', bodyKey: 'privacy.s12body' },
])

const tocSections = computed(() =>
  sections.value.map(s => ({ id: s.id, title: t(s.titleKey) })),
)
</script>
