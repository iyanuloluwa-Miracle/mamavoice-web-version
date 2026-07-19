<template>
  <footer class="bg-mama-dark text-white">
    <!-- Newsletter band -->
    <div class="bg-gradient-to-r from-mama-teal to-mama-teal-dark">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p class="font-bold text-white text-base">{{ t('footer.newsletterHeading') }}</p>
            <p class="text-white/70 text-sm mt-0.5">{{ t('footer.newsletterSub') }}</p>
          </div>
          <form v-if="!newsletterSuccess" @submit.prevent="subscribeNewsletter" class="flex gap-2 w-full sm:w-auto">
            <input
              v-model="newsletterEmail"
              type="email"
              :placeholder="t('footer.newsletterPlaceholder')"
              class="flex-1 sm:w-64 px-4 py-2.5 rounded-full bg-white/15 border border-white/20 text-white placeholder-white/50 outline-none focus:border-white/50 text-sm"
            />
            <button type="submit" class="px-5 py-2.5 rounded-full bg-mama-dark hover:bg-mama-dark/80 text-white font-bold text-sm transition-colors flex-shrink-0">
              {{ t('footer.newsletterCta') }}
            </button>
          </form>
          <p v-else class="text-white font-semibold text-sm flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            {{ t('footer.newsletterSuccess') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Main footer body -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">

        <!-- Brand column (2 cols on lg) -->
        <div class="md:col-span-2 lg:col-span-2">
          <!-- Logo -->
          <div class="flex items-center gap-3 mb-4">
            <img src="/mamavoiceLogo.png" alt="MamaVoice logo" class="h-11 w-auto" />
            <div>
              <div class="text-xl font-black text-white leading-none">Mama</div>
              <div class="text-xl font-black text-mama-coral leading-none">Voice</div>
            </div>
          </div>
          <p class="text-white/55 text-sm leading-relaxed mb-5 max-w-xs">
            {{ t('footer.tagline') }}
          </p>

          <!-- Social icons -->
          <div class="flex items-center gap-2 mb-7">
            <a v-for="social in socialIcons" :key="social.label"
              href="#"
              :aria-label="social.label"
              class="w-8 h-8 rounded-full bg-white/10 hover:bg-mama-teal flex items-center justify-center transition-colors"
            >
              <span class="w-4 h-4 [&>svg]:w-4 [&>svg]:h-4" v-html="social.svg" />
            </a>
          </div>

          <!-- Language selector -->
          <p class="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">{{ t('footer.languageHeading') }}</p>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="loc in footerLocales"
              :key="loc.code"
              @click="setLocale(loc.code)"
              class="px-3 py-1 rounded-full text-xs font-semibold transition-colors"
              :class="locale === loc.code
                ? 'bg-mama-teal text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'"
            >
              {{ loc.name }}
            </button>
          </div>
        </div>

        <!-- Company -->
        <div>
          <h3 class="font-bold text-white text-xs uppercase tracking-wider mb-4">{{ t('footer.companyHeading') }}</h3>
          <ul class="space-y-2.5">
            <li v-for="(label, i) in companyLinks" :key="i">
              <a href="#" class="text-white/55 hover:text-mama-teal-light text-sm transition-colors">{{ label }}</a>
            </li>
            <li>
              <NuxtLink to="/donate" class="text-white/55 hover:text-mama-teal-light text-sm transition-colors flex items-center gap-1.5">
                💝 {{ t('nav.donate') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Product -->
        <div>
          <h3 class="font-bold text-white text-xs uppercase tracking-wider mb-4">{{ t('footer.productHeading') }}</h3>
          <ul class="space-y-2.5">
            <li v-for="(label, i) in productLinks" :key="i">
              <a href="#" class="text-white/55 hover:text-mama-teal-light text-sm transition-colors">{{ label }}</a>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="font-bold text-white text-xs uppercase tracking-wider mb-4">{{ t('footer.resourcesHeading') }}</h3>
          <ul class="space-y-2.5">
            <li v-for="(label, i) in resourceLinks" :key="i">
              <a href="#" class="text-white/55 hover:text-mama-teal-light text-sm transition-colors">{{ label }}</a>
            </li>
          </ul>
        </div>

        <!-- Legal + Contact stacked -->
        <div class="flex flex-col gap-8">
          <div>
            <h3 class="font-bold text-white text-xs uppercase tracking-wider mb-4">{{ t('footer.legalHeading') }}</h3>
            <ul class="space-y-2.5">
              <li>
                <NuxtLink to="/privacy-policy" class="text-white/55 hover:text-mama-teal-light text-sm transition-colors">
                  {{ t('footer.l0') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/terms-of-service" class="text-white/55 hover:text-mama-teal-light text-sm transition-colors">
                  {{ t('footer.l1') }}
                </NuxtLink>
              </li>
              <li>
                <a href="#" class="text-white/55 hover:text-mama-teal-light text-sm transition-colors">
                  {{ t('footer.l2') }}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold text-white text-xs uppercase tracking-wider mb-4">{{ t('footer.contactHeading') }}</h3>
            <ul class="space-y-2.5">
              <li>
                <NuxtLink to="/contact" class="text-white/55 hover:text-mama-teal-light text-sm transition-colors flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-mama-teal-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  {{ t('footer.contactEmail') }}
                </NuxtLink>
              </li>
              <li class="flex items-center gap-1.5 text-sm text-white/55">
                <svg class="w-3.5 h-3.5 text-mama-teal-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {{ t('footer.contactPhone') }}
              </li>
              <li class="flex items-center gap-1.5 text-sm text-white/55">
                <svg class="w-3.5 h-3.5 text-mama-teal-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {{ t('footer.contactAddress') }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
          <p class="text-white/35 text-sm">{{ t('footer.copyright') }}</p>
          <span class="hidden sm:block text-white/20">·</span>
          <p class="text-white/35 text-sm">{{ t('footer.madeWith') }}</p>
        </div>
        <div class="flex items-center gap-5 text-sm text-white/35">
          <NuxtLink to="/privacy-policy" class="hover:text-mama-teal-light transition-colors">{{ t('footer.privacy') }}</NuxtLink>
          <NuxtLink to="/terms-of-service" class="hover:text-mama-teal-light transition-colors">{{ t('footer.terms') }}</NuxtLink>
          <a href="#" class="hover:text-mama-teal-light transition-colors">{{ t('footer.cookie') }}</a>
          <span class="text-white/20 text-xs">{{ t('footer.version') }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const { t, locale } = i18n
const setLocale = (i18n as unknown as { setLocale: (code: string) => Promise<void> }).setLocale

const newsletterEmail = ref('')
const newsletterSuccess = ref(false)

function subscribeNewsletter() {
  if (!newsletterEmail.value.trim()) return
  newsletterSuccess.value = true
}

const footerLocales = [
  { code: 'en', name: 'English' },
  { code: 'yo', name: 'Yorùbá' },
  { code: 'ha', name: 'Hausa' },
  { code: 'ig', name: 'Igbo' },
  { code: 'pcm', name: 'Naija' },
]

const companyLinks = computed(() => [
  t('footer.c0'), t('footer.c1'), t('footer.c2'), t('footer.c3'),
])

const productLinks = computed(() => [
  t('footer.p0'), t('footer.p1'), t('footer.p2'), t('footer.p3'),
])

const resourceLinks = computed(() => [
  t('footer.r0'), t('footer.r1'), t('footer.r2'), t('footer.r3'),
])

const socialIcons = [
  {
    label: 'WhatsApp',
    svg: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.09.538 4.09 1.485 5.836L0 24l6.335-1.463A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.85 0-3.6-.476-5.13-1.314l-.37-.216-3.8.878.907-3.696-.243-.39A9.946 9.946 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>',
  },
  {
    label: 'Facebook',
    svg: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
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
  {
    label: 'Instagram',
    svg: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
  },
]
</script>
