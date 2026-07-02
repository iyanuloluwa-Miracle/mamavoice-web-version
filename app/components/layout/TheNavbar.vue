<template>
  <nav
    class="sticky top-0 z-50 transition-all duration-300"
    :class="isScrolled
      ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm'
      : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 flex-shrink-0">
          <img src="/mamavoiceLogo.png" alt="MamaVoice logo" class="h-10 w-auto" />
          <span class="text-xl sm:text-2xl font-black text-mama-coral">MamaVoice</span>
        </NuxtLink>

        <!-- Desktop nav links (lg+) -->
        <div class="hidden lg:flex items-center gap-8">
          <a v-for="link in navLinks" :key="link.href" :href="link.href"
            class="text-mama-dark/70 dark:text-slate-400 hover:text-mama-teal dark:hover:text-mama-teal font-medium transition-colors text-sm">
            {{ link.label }}
          </a>
        </div>

        <!-- Desktop right actions (lg+) -->
        <div class="hidden lg:flex items-center gap-3">
          <!-- Auth: Sign In / Sign Up (guest) or UserAvatar (authenticated) -->
          <template v-if="isAuthenticated">
            <AuthUserAvatar />
          </template>
          <template v-else>
            <NuxtLink to="/auth/login"
              class="px-4 py-2 rounded-full border border-mama-teal text-mama-teal font-semibold text-sm hover:bg-mama-sky dark:hover:bg-mama-teal/20 transition-all">
              {{ t('auth.signIn') }}
            </NuxtLink>
            <NuxtLink to="/auth/register"
              class="px-5 py-2 rounded-full bg-mama-teal text-white font-semibold text-sm hover:bg-mama-teal-dark transition-all shadow-sm">
              {{ t('auth.signUp') }}
            </NuxtLink>
          </template>

          <!-- Language picker -->
          <div class="relative" data-lang-picker>
            <button
              @click="isLangOpen = !isLangOpen"
              class="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 dark:border-slate-700 text-sm font-medium text-mama-dark dark:text-slate-300 hover:border-mama-teal hover:text-mama-teal transition-all"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              {{ locale.toUpperCase() }}
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div v-if="isLangOpen"
              class="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden z-50">
              <button v-for="l in locales" :key="l.code"
                @click="switchLocale(l.code); isLangOpen = false"
                class="w-full px-4 py-2.5 text-left text-sm hover:bg-mama-sky dark:hover:bg-slate-700 hover:text-mama-teal transition-colors flex items-center justify-between"
                :class="locale === l.code ? 'text-mama-teal font-semibold bg-mama-sky dark:bg-slate-700' : 'text-mama-dark dark:text-slate-300'">
                {{ l.name }}
                <svg v-if="locale === l.code" class="w-3.5 h-3.5 text-mama-teal" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Dark mode toggle -->
          <button @click="toggle"
            class="w-10 h-10 rounded-full flex items-center justify-center bg-mama-sky dark:bg-slate-800 text-mama-teal hover:scale-110 transition-all"
            :aria-label="isDark ? t('chat.switchLight') : t('chat.switchDark')">
            <svg v-if="!isDark" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <svg v-else class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"/>
              <path stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </button>

          <NuxtLink to="/chat"
            class="px-5 py-2 rounded-full border-2 border-mama-teal text-mama-teal font-semibold text-sm hover:bg-mama-sky dark:hover:bg-mama-teal/20 transition-all">
            {{ t('nav.tryWebApp') }}
          </NuxtLink>
          <a href="#download"
            class="px-5 py-2 rounded-full bg-mama-teal text-white font-semibold text-sm hover:bg-mama-teal-dark transition-all shadow-sm">
            {{ t('nav.downloadApp') }}
          </a>
        </div>

        <!-- Mobile/Tablet right cluster -->
        <div class="flex lg:hidden items-center gap-2">
          <button @click="toggle"
            class="w-10 h-10 rounded-full flex items-center justify-center bg-mama-sky dark:bg-slate-800 text-mama-teal"
            :aria-label="isDark ? t('chat.switchLight') : t('chat.switchDark')">
            <svg v-if="!isDark" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <svg v-else class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"/>
              <path stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </button>
          <button @click="isMenuOpen = true"
            class="w-10 h-10 rounded-xl text-mama-dark dark:text-slate-300 hover:bg-mama-sky dark:hover:bg-slate-800 transition-colors"
            aria-label="Open menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <Teleport to="body">
    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="isMenuOpen" class="drawer-backdrop lg:hidden" @click="isMenuOpen = false" />
    </Transition>

    <Transition enter-active-class="transition-transform duration-300 ease-out" enter-from-class="translate-x-full" enter-to-class="translate-x-0" leave-active-class="transition-transform duration-300 ease-in" leave-from-class="translate-x-0" leave-to-class="translate-x-full">
      <div v-if="isMenuOpen"
        class="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-mama-surface flex flex-col shadow-2xl lg:hidden"
      >
        <div class="flex items-center justify-between px-6 h-16 border-b border-mama-border-light flex-shrink-0">
          <div class="flex items-center gap-3">
            <img src="/mamavoiceLogo.png" alt="MamaVoice logo" class="h-10 w-auto" />
            <span class="text-xl font-black text-mama-coral">MamaVoice</span>
          </div>
          <button @click="isMenuOpen = false"
            class="w-10 h-10 rounded-xl text-mama-muted hover:text-mama-text hover:bg-mama-input transition-colors"
            aria-label="Close menu">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <nav class="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <a v-for="link in navLinks" :key="link.href" :href="link.href"
            @click="isMenuOpen = false"
            class="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-mama-text font-medium hover:bg-mama-sky hover:text-mama-teal transition-colors">
            <span class="text-lg">{{ link.emoji }}</span>
            {{ link.label }}
          </a>
        </nav>

        <!-- Language picker in drawer — 2×2 grid with native names -->
        <div class="px-4 py-4 border-t border-mama-border-light">
          <p class="text-xs font-semibold text-mama-muted uppercase tracking-wider mb-3 px-2">{{ t('nav.language') }}</p>
          <div class="grid grid-cols-2 gap-2">
            <button v-for="l in locales" :key="l.code"
              @click="switchLocale(l.code)"
              class="py-2.5 px-3 rounded-xl text-sm font-semibold transition-all text-left"
              :class="locale === l.code
                ? 'bg-mama-teal text-white shadow-sm'
                : 'bg-mama-input text-mama-muted hover:bg-mama-sky hover:text-mama-teal'">
              {{ l.name }}
            </button>
          </div>
        </div>

        <div class="px-4 pb-6 pb-safe space-y-3 border-t border-mama-border-light pt-4">
          <template v-if="isAuthenticated">
            <NuxtLink to="/chat" @click="isMenuOpen = false"
              class="flex items-center justify-center w-full py-3.5 rounded-2xl bg-mama-teal text-white font-bold text-base shadow-sm">
              {{ t('nav.tryWebApp') }}
            </NuxtLink>
            <button @click="handleLogout"
              class="flex items-center justify-center w-full py-3.5 rounded-2xl border-2 border-mama-coral text-mama-coral font-bold text-base">
              {{ t('auth.logOut') }}
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/auth/register" @click="isMenuOpen = false"
              class="flex items-center justify-center w-full py-3.5 rounded-2xl bg-mama-teal text-white font-bold text-base shadow-sm">
              {{ t('auth.signUp') }}
            </NuxtLink>
            <NuxtLink to="/auth/login" @click="isMenuOpen = false"
              class="flex items-center justify-center w-full py-3.5 rounded-2xl border-2 border-mama-teal text-mama-teal font-bold text-base">
              {{ t('auth.signIn') }}
            </NuxtLink>
            <NuxtLink to="/chat" @click="isMenuOpen = false"
              class="flex items-center justify-center w-full py-3 rounded-2xl text-mama-muted text-sm font-medium hover:text-mama-text transition-colors">
              {{ t('nav.tryWebApp') }}
            </NuxtLink>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useColorMode } from '../../composables/useColorMode'
import { useAuthStore } from '~/stores/auth'

const { isDark, toggle } = useColorMode()
const { t, locale, locales, setLocale } = useI18n()
const auth = useAuthStore()
const isAuthenticated = computed(() => auth.isAuthenticated)

async function handleLogout() {
  auth.logout()
  isMenuOpen.value = false
  await navigateTo('/')
}

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const isLangOpen = ref(false)

const navLinks = computed(() => [
  { href: '#features',     label: t('nav.features'),    emoji: '✨' },
  { href: '#nutrition',    label: t('nav.nutrition'),   emoji: '🌿' },
  { href: '#how-it-works', label: t('nav.howItWorks'),  emoji: '🚀' },
])

function switchLocale(code: string) {
  setLocale(code)
  isMenuOpen.value = false
}

const handleScroll = () => { isScrolled.value = window.scrollY > 20 }

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('[data-lang-picker]')) isLangOpen.value = false
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(isMenuOpen, (open) => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})
</script>
