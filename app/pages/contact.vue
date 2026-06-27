<template>
  <div class="bg-mama-bg dark:bg-[#0F172A] min-h-screen">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-mama-teal to-mama-teal-dark text-white py-20 sm:py-28">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div class="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-mama-coral/20 blur-3xl" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="animate-fade-in-up">
          <div class="w-16 h-16 rounded-3xl bg-white/15 flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 class="text-fluid-hero font-black text-white mb-4">{{ t('contact.heroHeadline') }}</h1>
          <p class="text-white/80 text-fluid-lg max-w-xl mx-auto">{{ t('contact.heroSub') }}</p>
        </div>
      </div>
    </section>

    <!-- Emergency Notice -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
      <div class="bg-mama-coral/10 dark:bg-mama-coral/5 border border-mama-coral/30 rounded-2xl px-5 py-4 flex items-start gap-3">
        <span class="text-2xl flex-shrink-0">🚨</span>
        <div>
          <p class="font-bold text-mama-coral text-sm">{{ t('contact.emergencyHeading') }}</p>
          <p class="text-mama-muted dark:text-white/60 text-sm mt-0.5">{{ t('contact.emergencyText') }}</p>
        </div>
      </div>
    </div>

    <!-- Main content: form + info -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <!-- Contact Form -->
        <div class="lg:col-span-3">
          <div class="bg-mama-surface dark:bg-mama-dark-card rounded-3xl shadow-soft border border-mama-border-light dark:border-white/5 p-8">
            <h2 class="text-fluid-2xl font-bold text-mama-text dark:text-white mb-8">{{ t('contact.formHeading') }}</h2>

            <!-- Success state -->
            <div v-if="isSuccess" class="text-center py-12">
              <div class="w-16 h-16 rounded-full bg-mama-green/10 flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-mama-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-fluid-lg font-bold text-mama-text dark:text-white mb-2">{{ t('contact.formSuccess') }}</p>
              <button @click="reset()" class="mt-4 text-mama-teal text-sm font-semibold hover:underline">
                Send another message
              </button>
            </div>

            <!-- Form -->
            <form v-else @submit.prevent="submitForm()" class="space-y-5" novalidate>
              <!-- Name -->
              <div>
                <label class="block text-sm font-semibold text-mama-text dark:text-white mb-1.5">
                  {{ t('contact.formName') }} <span class="text-mama-coral">*</span>
                </label>
                <input
                  v-model="formData.name"
                  type="text"
                  autocomplete="name"
                  :placeholder="t('contact.formNamePlaceholder')"
                  @blur="validateField('name')"
                  class="w-full px-4 py-3 rounded-2xl bg-mama-input dark:bg-white/5 border text-mama-text dark:text-white placeholder-mama-muted/60 outline-none transition-all text-sm"
                  :class="errors.name ? 'border-mama-coral' : 'border-mama-border dark:border-white/10 focus:border-mama-teal'"
                />
                <p v-if="errors.name" class="mt-1.5 text-xs text-mama-coral">{{ t(`contact.${errors.name}`) }}</p>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-semibold text-mama-text dark:text-white mb-1.5">
                  {{ t('contact.formEmail') }} <span class="text-mama-coral">*</span>
                </label>
                <input
                  v-model="formData.email"
                  type="email"
                  autocomplete="email"
                  :placeholder="t('contact.formEmailPlaceholder')"
                  @blur="validateField('email')"
                  class="w-full px-4 py-3 rounded-2xl bg-mama-input dark:bg-white/5 border text-mama-text dark:text-white placeholder-mama-muted/60 outline-none transition-all text-sm"
                  :class="errors.email ? 'border-mama-coral' : 'border-mama-border dark:border-white/10 focus:border-mama-teal'"
                />
                <p v-if="errors.email" class="mt-1.5 text-xs text-mama-coral">{{ t(`contact.${errors.email}`) }}</p>
              </div>

              <!-- Phone (optional) + Subject side by side on md+ -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-semibold text-mama-text dark:text-white mb-1.5">
                    {{ t('contact.formPhone') }}
                  </label>
                  <input
                    v-model="formData.phone"
                    type="tel"
                    autocomplete="tel"
                    :placeholder="t('contact.formPhonePlaceholder')"
                    class="w-full px-4 py-3 rounded-2xl bg-mama-input dark:bg-white/5 border border-mama-border dark:border-white/10 focus:border-mama-teal text-mama-text dark:text-white placeholder-mama-muted/60 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-mama-text dark:text-white mb-1.5">
                    {{ t('contact.formSubject') }} <span class="text-mama-coral">*</span>
                  </label>
                  <select
                    v-model="formData.subject"
                    @blur="validateField('subject')"
                    class="w-full px-4 py-3 rounded-2xl bg-mama-input dark:bg-white/5 border text-mama-text dark:text-white outline-none transition-all text-sm appearance-none"
                    :class="errors.subject ? 'border-mama-coral' : 'border-mama-border dark:border-white/10 focus:border-mama-teal'"
                  >
                    <option value="" disabled>{{ t('contact.formSubjectPlaceholder') }}</option>
                    <option v-for="opt in subjectOptions" :key="opt" :value="opt">{{ opt }}</option>
                  </select>
                  <p v-if="errors.subject" class="mt-1.5 text-xs text-mama-coral">{{ t(`contact.${errors.subject}`) }}</p>
                </div>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-sm font-semibold text-mama-text dark:text-white mb-1.5">
                  {{ t('contact.formMessage') }} <span class="text-mama-coral">*</span>
                </label>
                <textarea
                  v-model="formData.message"
                  rows="5"
                  :placeholder="t('contact.formMessagePlaceholder')"
                  @blur="validateField('message')"
                  class="w-full px-4 py-3 rounded-2xl bg-mama-input dark:bg-white/5 border text-mama-text dark:text-white placeholder-mama-muted/60 outline-none transition-all text-sm resize-none"
                  :class="errors.message ? 'border-mama-coral' : 'border-mama-border dark:border-white/10 focus:border-mama-teal'"
                />
                <div class="flex justify-between mt-1.5">
                  <p v-if="errors.message" class="text-xs text-mama-coral">{{ t(`contact.${errors.message}`) }}</p>
                  <p class="text-xs text-mama-muted ml-auto">{{ formData.message.length }}/1000</p>
                </div>
              </div>

              <!-- Error message -->
              <div v-if="isError" class="p-4 rounded-2xl bg-mama-coral/10 border border-mama-coral/30">
                <p class="text-sm text-mama-coral">{{ t('contact.formError') }}</p>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full py-4 px-8 rounded-full font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                :class="isLoading ? 'bg-mama-muted' : 'bg-gradient-to-r from-mama-teal to-mama-teal-dark'"
              >
                <span v-if="isLoading" class="flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  {{ t('contact.formLoading') }}
                </span>
                <span v-else>{{ t('contact.formSubmit') }}</span>
              </button>
            </form>
          </div>
        </div>

        <!-- Contact Info + Map -->
        <div class="lg:col-span-2 flex flex-col gap-6">
          <!-- Info cards -->
          <div class="bg-mama-surface dark:bg-mama-dark-card rounded-3xl shadow-soft border border-mama-border-light dark:border-white/5 p-6">
            <h3 class="font-bold text-mama-text dark:text-white mb-5">{{ t('contact.infoHeading') }}</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <span class="w-9 h-9 rounded-xl bg-mama-teal/10 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-mama-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </span>
                <div>
                  <p class="text-xs text-mama-muted mb-0.5">{{ t('contact.infoEmailLabel') }}</p>
                  <a :href="`mailto:${t('contact.infoEmailValue')}`" class="text-sm font-semibold text-mama-text dark:text-white hover:text-mama-teal transition-colors">
                    {{ t('contact.infoEmailValue') }}
                  </a>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-9 h-9 rounded-xl bg-mama-teal/10 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-mama-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </span>
                <div>
                  <p class="text-xs text-mama-muted mb-0.5">{{ t('contact.infoPhoneLabel') }}</p>
                  <p class="text-sm font-semibold text-mama-text dark:text-white">{{ t('contact.infoPhoneValue') }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-9 h-9 rounded-xl bg-mama-teal/10 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-mama-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </span>
                <div>
                  <p class="text-xs text-mama-muted mb-0.5">{{ t('contact.infoAddressLabel') }}</p>
                  <p class="text-sm font-semibold text-mama-text dark:text-white">{{ t('contact.infoAddressValue') }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-9 h-9 rounded-xl bg-mama-teal/10 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-mama-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </span>
                <div>
                  <p class="text-xs text-mama-muted mb-0.5">{{ t('contact.infoHoursLabel') }}</p>
                  <p class="text-sm font-semibold text-mama-text dark:text-white">{{ t('contact.infoHoursValue') }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Social media -->
          <div class="bg-mama-surface dark:bg-mama-dark-card rounded-3xl shadow-soft border border-mama-border-light dark:border-white/5 p-6">
            <h3 class="font-bold text-mama-text dark:text-white mb-4">{{ t('contact.socialHeading') }}</h3>
            <div class="flex flex-wrap gap-3">
              <a v-for="social in socialLinks" :key="social.label" href="#"
                class="flex items-center gap-2 px-3 py-2 rounded-xl bg-mama-bg dark:bg-white/5 hover:bg-mama-teal/10 dark:hover:bg-mama-teal/10 border border-mama-border dark:border-white/10 transition-colors text-sm text-mama-text dark:text-white">
                <span v-html="social.svg" class="w-4 h-4 [&>svg]:w-4 [&>svg]:h-4 text-mama-teal" />
                {{ social.label }}
              </a>
            </div>
          </div>

          <!-- Map placeholder -->
          <div class="bg-mama-sky dark:bg-mama-teal/5 rounded-3xl border border-mama-teal/20 overflow-hidden">
            <div class="h-44 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <svg class="w-10 h-10 text-mama-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              <p class="text-sm font-semibold text-mama-text dark:text-white">{{ t('contact.mapPlaceholder') }}</p>
              <a href="https://maps.google.com/?q=Lagos,Nigeria" target="_blank" rel="noopener"
                class="text-xs font-bold text-mama-teal hover:underline">
                {{ t('contact.mapCta') }} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-fluid-3xl font-black text-mama-text dark:text-white mb-8 text-center">
          {{ t('contact.faqHeading') }}
        </h2>
        <div class="space-y-3">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="bg-mama-surface dark:bg-mama-dark-card rounded-2xl border border-mama-border-light dark:border-white/5 overflow-hidden"
          >
            <button
              @click="toggleFaq(i)"
              class="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
            >
              <span class="font-semibold text-mama-text dark:text-white text-sm">{{ t(faq.q) }}</span>
              <svg
                class="w-5 h-5 text-mama-teal flex-shrink-0 transition-transform duration-300"
                :class="openFaq === i ? 'rotate-180' : ''"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
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
              <div v-if="openFaq === i" class="px-6 pb-5 overflow-hidden">
                <p class="text-sm text-mama-muted dark:text-white/60 leading-relaxed">{{ t(faq.a) }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Community CTA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div class="bg-gradient-to-br from-mama-teal to-mama-teal-dark rounded-3xl p-8 sm:p-12 text-center text-white">
        <div class="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12c0 2.09.538 4.09 1.485 5.836L0 24l6.335-1.463A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.85 0-3.6-.476-5.13-1.314l-.37-.216-3.8.878.907-3.696-.243-.39A9.946 9.946 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
        </div>
        <h3 class="text-fluid-2xl font-black mb-2">{{ t('contact.communityHeading') }}</h3>
        <p class="text-white/80 mb-6 max-w-md mx-auto">{{ t('contact.communitySub') }}</p>
        <a href="#"
          class="inline-flex items-center gap-2 bg-white text-mama-teal font-bold px-8 py-4 rounded-full hover:scale-105 active:scale-[0.98] transition-transform">
          {{ t('contact.communityCtaWhatsApp') }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSeoMeta } from '@unhead/vue'
import { useContactForm } from '~/composables/useContactForm'

const { t } = useI18n()
const { formData, errors, isLoading, isSuccess, isError, validateField, submitForm, reset } = useContactForm()

useSeoMeta({
  title: () => t('contact.pageTitle'),
  description: () => t('contact.metaDescription'),
})

const subjectOptions = computed(() => t('contact.subjectOptions') as unknown as string[])

const openFaq = ref<number | null>(null)
function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i
}

const faqs = [
  { q: 'contact.faq0q', a: 'contact.faq0a' },
  { q: 'contact.faq1q', a: 'contact.faq1a' },
  { q: 'contact.faq2q', a: 'contact.faq2a' },
  { q: 'contact.faq3q', a: 'contact.faq3a' },
  { q: 'contact.faq4q', a: 'contact.faq4a' },
  { q: 'contact.faq5q', a: 'contact.faq5a' },
]

const socialLinks = [
  {
    label: 'Facebook',
    svg: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  },
  {
    label: 'Instagram',
    svg: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
  },
  {
    label: 'X (Twitter)',
    svg: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  },
  {
    label: 'LinkedIn',
    svg: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  },
  {
    label: 'YouTube',
    svg: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  },
]
</script>
