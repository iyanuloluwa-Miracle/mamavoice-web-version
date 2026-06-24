<template>
  <footer class="bg-mama-dark text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Brand column -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-1 mb-4">
            <span class="text-2xl font-black bg-gradient-to-r from-mama-teal-light to-mama-teal bg-clip-text text-transparent">Mama</span>
            <span class="text-2xl font-black text-mama-coral">Voice</span>
          </div>
          <p class="text-white/60 text-sm leading-relaxed mb-6">
            {{ t('footer.tagline') }}
          </p>
          <!-- Social icons -->
          <div class="flex items-center gap-4">
            <a href="#" class="w-9 h-9 rounded-full bg-white/10 hover:bg-mama-teal flex items-center justify-center transition-colors" aria-label="WhatsApp">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.09.538 4.09 1.485 5.836L0 24l6.335-1.463A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.85 0-3.6-.476-5.13-1.314l-.37-.216-3.8.878.907-3.696-.243-.39A9.946 9.946 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
            </a>
            <a href="#" class="w-9 h-9 rounded-full bg-white/10 hover:bg-mama-teal flex items-center justify-center transition-colors" aria-label="Facebook">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="w-9 h-9 rounded-full bg-white/10 hover:bg-mama-teal flex items-center justify-center transition-colors" aria-label="Twitter / X">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" class="w-9 h-9 rounded-full bg-white/10 hover:bg-mama-teal flex items-center justify-center transition-colors" aria-label="LinkedIn">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Platform column -->
        <div>
          <h3 class="font-bold text-white mb-5 text-sm uppercase tracking-wider">{{ t('footer.platformHeading') }}</h3>
          <ul class="space-y-3">
            <li v-for="link in platformLinks" :key="link.key">
              <a href="#" class="text-white/60 hover:text-mama-teal-light text-sm transition-colors">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <!-- Resources column -->
        <div>
          <h3 class="font-bold text-white mb-5 text-sm uppercase tracking-wider">{{ t('footer.resourcesHeading') }}</h3>
          <ul class="space-y-3">
            <li v-for="link in resourceLinks" :key="link.key">
              <a href="#" class="text-white/60 hover:text-mama-teal-light text-sm transition-colors">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <!-- Contact column -->
        <div>
          <h3 class="font-bold text-white mb-5 text-sm uppercase tracking-wider">{{ t('footer.contactHeading') }}</h3>
          <ul class="space-y-3">
            <li class="flex items-start gap-2 text-sm text-white/60">
              <svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-mama-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              hello@mamavoice.africa
            </li>
            <li class="flex items-start gap-2 text-sm text-white/60">
              <svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-mama-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              +234 800 MAMA VOICE
            </li>
            <li class="flex items-start gap-2 text-sm text-white/60">
              <svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-mama-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Lagos, Nigeria &amp; across Africa
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-white/40 text-sm">{{ t('footer.copyright') }}</p>
        <div class="flex items-center gap-6 text-sm text-white/40">
          <a href="#" class="hover:text-mama-teal-light transition-colors">{{ t('footer.privacy') }}</a>
          <a href="#" class="hover:text-mama-teal-light transition-colors">{{ t('footer.terms') }}</a>
          <a href="#" class="hover:text-mama-teal-light transition-colors">{{ t('footer.cookie') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const platformLinks = computed(() => [
  { key: 'pl0', label: t('footer.pl0') },
  { key: 'pl1', label: t('footer.pl1') },
  { key: 'pl2', label: t('footer.pl2') },
  { key: 'pl3', label: t('footer.pl3') },
  { key: 'pl4', label: t('footer.pl4') },
  { key: 'pl5', label: t('footer.pl5') },
])

const resourceLinks = computed(() => [
  { key: 'rl0', label: t('footer.rl0') },
  { key: 'rl1', label: t('footer.rl1') },
  { key: 'rl2', label: t('footer.rl2') },
  { key: 'rl3', label: t('footer.rl3') },
  { key: 'rl4', label: t('footer.rl4') },
  { key: 'rl5', label: t('footer.rl5') },
])
</script>
