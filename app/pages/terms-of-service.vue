<template>
  <div class="bg-mama-bg dark:bg-[#0F172A] min-h-screen">
    <!-- Hero -->
    <section class="bg-mama-dark text-white py-16 sm:py-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
        <h1 class="text-fluid-4xl font-black text-white mb-4">{{ t('terms.pageTitle') }}</h1>
        <p class="text-white/60 text-fluid-base leading-relaxed">{{ t('terms.intro') }}</p>
        <p class="mt-4 text-white/40 text-sm">{{ t('terms.lastUpdated') }}</p>
      </div>
    </section>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div class="lg:flex lg:gap-12 xl:gap-16 lg:items-start">
        <!-- ToC: mobile pills + desktop sticky sidebar (handled inside component) -->
        <UiTableOfContents :sections="tocSections" :title="t('terms.tocTitle')" />

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

            <!-- Emergency warning card -->
            <div
              v-if="section.id === 'emergency-disclaimer'"
              class="p-4 sm:p-5 rounded-2xl bg-mama-coral/10 border-2 border-mama-coral/30 dark:bg-mama-coral/5"
            >
              <p class="text-sm sm:text-base text-mama-text dark:text-white/90 leading-relaxed font-medium">
                {{ t(section.bodyKey) }}
              </p>
            </div>

            <!-- AI disclaimer callout -->
            <div
              v-else-if="section.id === 'ai-medical-disclaimer'"
              class="p-4 sm:p-5 rounded-2xl bg-mama-sky dark:bg-mama-teal/10 border border-mama-teal/20"
            >
              <p class="text-sm sm:text-base text-mama-text dark:text-white/80 leading-relaxed">
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
  title: () => t('terms.pageTitle'),
  description: () => t('terms.metaDescription'),
})

interface PolicySection {
  id: string
  num: number
  titleKey: string
  bodyKey: string
}

const sections = computed<PolicySection[]>(() => [
  { num: 1,  id: t('terms.s1id'),  titleKey: 'terms.s1title',  bodyKey: 'terms.s1body' },
  { num: 2,  id: t('terms.s2id'),  titleKey: 'terms.s2title',  bodyKey: 'terms.s2body' },
  { num: 3,  id: t('terms.s3id'),  titleKey: 'terms.s3title',  bodyKey: 'terms.s3body' },
  { num: 4,  id: t('terms.s4id'),  titleKey: 'terms.s4title',  bodyKey: 'terms.s4body' },
  { num: 5,  id: t('terms.s5id'),  titleKey: 'terms.s5title',  bodyKey: 'terms.s5body' },
  { num: 6,  id: t('terms.s6id'),  titleKey: 'terms.s6title',  bodyKey: 'terms.s6body' },
  { num: 7,  id: t('terms.s7id'),  titleKey: 'terms.s7title',  bodyKey: 'terms.s7body' },
  { num: 8,  id: t('terms.s8id'),  titleKey: 'terms.s8title',  bodyKey: 'terms.s8body' },
  { num: 9,  id: t('terms.s9id'),  titleKey: 'terms.s9title',  bodyKey: 'terms.s9body' },
  { num: 10, id: t('terms.s10id'), titleKey: 'terms.s10title', bodyKey: 'terms.s10body' },
  { num: 11, id: t('terms.s11id'), titleKey: 'terms.s11title', bodyKey: 'terms.s11body' },
  { num: 12, id: t('terms.s12id'), titleKey: 'terms.s12title', bodyKey: 'terms.s12body' },
  { num: 13, id: t('terms.s13id'), titleKey: 'terms.s13title', bodyKey: 'terms.s13body' },
])

const tocSections = computed(() =>
  sections.value.map(s => ({ id: s.id, title: t(s.titleKey) })),
)
</script>
