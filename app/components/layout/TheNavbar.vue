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
        <NuxtLink to="/" class="flex items-center gap-1 flex-shrink-0">
          <span class="text-2xl font-black bg-gradient-to-r from-mama-teal to-mama-teal-light bg-clip-text text-transparent">Mama</span>
          <span class="text-2xl font-black text-mama-coral">Voice</span>
        </NuxtLink>

        <!-- Desktop nav links -->
        <div class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-mama-dark/70 dark:text-slate-400 hover:text-mama-teal dark:hover:text-mama-teal font-medium transition-colors text-sm">Features</a>
          <a href="#specialists" class="text-mama-dark/70 dark:text-slate-400 hover:text-mama-teal dark:hover:text-mama-teal font-medium transition-colors text-sm">Specialists</a>
          <a href="#nutrition" class="text-mama-dark/70 dark:text-slate-400 hover:text-mama-teal dark:hover:text-mama-teal font-medium transition-colors text-sm">Nutrition</a>
          <a href="#how-it-works" class="text-mama-dark/70 dark:text-slate-400 hover:text-mama-teal dark:hover:text-mama-teal font-medium transition-colors text-sm">How It Works</a>
        </div>

        <!-- Desktop right actions -->
        <div class="hidden md:flex items-center gap-3">
          <!-- Language picker -->
          <div class="relative">
            <button
              @click="isLangOpen = !isLangOpen"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 text-sm font-medium text-mama-dark dark:text-slate-300 hover:border-mama-teal hover:text-mama-teal transition-all dark:bg-transparent"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              {{ selectedLang }}
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div
              v-if="isLangOpen"
              class="absolute right-0 mt-2 w-28 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden z-50"
            >
              <button
                v-for="lang in langs"
                :key="lang"
                @click="selectedLang = lang; isLangOpen = false"
                class="w-full px-4 py-2.5 text-left text-sm hover:bg-mama-sky dark:hover:bg-slate-700 hover:text-mama-teal transition-colors"
                :class="selectedLang === lang
                  ? 'text-mama-teal font-semibold bg-mama-sky dark:bg-slate-700'
                  : 'text-mama-dark dark:text-slate-300'"
              >
                {{ lang }}
              </button>
            </div>
          </div>

          <!-- Dark mode toggle -->
          <button
            @click="toggle"
            class="w-9 h-9 rounded-full flex items-center justify-center bg-mama-sky dark:bg-slate-800 text-mama-teal hover:scale-110 transition-all"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <!-- Moon: shown in light mode -->
            <svg v-if="!isDark" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <!-- Sun: shown in dark mode -->
            <svg v-else class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"/>
              <path stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </button>

          <NuxtLink
            to="/chat"
            class="px-5 py-2 rounded-full border-2 border-mama-teal text-mama-teal font-semibold text-sm hover:bg-mama-sky dark:hover:bg-mama-teal/20 transition-all"
          >
            Try Web App
          </NuxtLink>
          <a
            href="#download"
            class="px-5 py-2 rounded-full bg-mama-teal text-white font-semibold text-sm hover:bg-mama-teal-dark transition-all shadow-sm"
          >
            Download App
          </a>
        </div>

        <!-- Mobile right actions -->
        <div class="flex md:hidden items-center gap-2">
          <!-- Dark mode toggle (mobile) -->
          <button
            @click="toggle"
            class="w-9 h-9 rounded-full flex items-center justify-center bg-mama-sky dark:bg-slate-800 text-mama-teal"
          >
            <svg v-if="!isDark" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <svg v-else class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"/>
              <path stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </button>
          <!-- Hamburger -->
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="p-2 rounded-xl text-mama-dark dark:text-slate-300 hover:bg-mama-sky dark:hover:bg-slate-800 transition-colors"
          >
            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-100 dark:border-slate-800">
      <div class="px-6 py-4 flex flex-col gap-4">
        <a href="#features" @click="isMenuOpen = false" class="text-mama-dark dark:text-slate-300 font-medium py-2">Features</a>
        <a href="#specialists" @click="isMenuOpen = false" class="text-mama-dark dark:text-slate-300 font-medium py-2">Specialists</a>
        <a href="#nutrition" @click="isMenuOpen = false" class="text-mama-dark dark:text-slate-300 font-medium py-2">Nutrition</a>
        <a href="#how-it-works" @click="isMenuOpen = false" class="text-mama-dark dark:text-slate-300 font-medium py-2">How It Works</a>
        <div class="flex gap-3 pt-2 border-t border-gray-100 dark:border-slate-800">
          <NuxtLink to="/chat" @click="isMenuOpen = false" class="flex-1 py-3 text-center rounded-full border-2 border-mama-teal text-mama-teal font-semibold text-sm">
            Try Web App
          </NuxtLink>
          <a href="#download" @click="isMenuOpen = false" class="flex-1 py-3 text-center rounded-full bg-mama-teal text-white font-semibold text-sm">
            Download App
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { isDark, toggle } = useColorMode()

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const isLangOpen = ref(false)
const selectedLang = ref('EN')
const langs = ['EN', 'YO', 'HA', 'IG']

const handleScroll = () => { isScrolled.value = window.scrollY > 20 }

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('[data-lang-picker]')) {
      isLangOpen.value = false
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
