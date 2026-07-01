<template>
  <section id="faq" class="py-16 sm:py-20 px-4 sm:px-6 bg-mama-bg">
    <div class="max-w-4xl mx-auto">

      <!-- Section header -->
      <div class="text-center mb-10 sm:mb-14 animate-fade-in-up">
        <h2 class="text-fluid-4xl font-black text-mama-text mb-4">
          {{ t('faq.headline1') }}
          <span class="text-mama-teal"> {{ t('faq.headline2') }}</span>
        </h2>
        <p class="text-fluid-lg text-mama-muted max-w-xl mx-auto leading-relaxed">
          {{ t('faq.sub') }}
        </p>
      </div>

      <!-- Accordion -->
      <div class="space-y-3">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="bg-mama-surface dark:bg-mama-dark-card rounded-2xl border border-mama-border-light dark:border-white/5 overflow-hidden transition-shadow duration-200"
          :class="openFaq === i ? 'shadow-soft' : ''"
        >
          <button
            @click="toggleFaq(i)"
            class="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-mama-bg dark:hover:bg-white/5 transition-colors duration-150"
            :aria-expanded="openFaq === i"
          >
            <span class="flex-1 font-semibold text-mama-text dark:text-white text-sm leading-snug">{{ t(faq.q) }}</span>
            <svg
              class="w-5 h-5 text-mama-teal flex-shrink-0 transition-transform duration-300"
              :class="openFaq === i ? 'rotate-180' : ''"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-if="openFaq === i" class="overflow-hidden">
              <div class="px-5 pb-5 pt-1">
                <p class="text-sm text-mama-muted dark:text-white/60 leading-relaxed">{{ t(faq.a) }}</p>
              </div>
            </div>
          </Transition>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const openFaq = ref<number | null>(null)

function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i
}

const faqs = [
  { q: 'faq.q0',  a: 'faq.a0'  },
  { q: 'faq.q1',  a: 'faq.a1'  },
  { q: 'faq.q2',  a: 'faq.a2'  },
  { q: 'faq.q3',  a: 'faq.a3'  },
  { q: 'faq.q4',  a: 'faq.a4'  },
  { q: 'faq.q5',  a: 'faq.a5'  },
  { q: 'faq.q6',  a: 'faq.a6'  },
  { q: 'faq.q7',  a: 'faq.a7'  },
  { q: 'faq.q8',  a: 'faq.a8'  },
  { q: 'faq.q9',  a: 'faq.a9'  },
  { q: 'faq.q10', a: 'faq.a10' },
  { q: 'faq.q11', a: 'faq.a11' },
]
</script>
