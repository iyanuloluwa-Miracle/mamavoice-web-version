<template>
  <div class="relative" ref="containerRef">
    <button
      @click="open = !open"
      :aria-expanded="open"
      aria-haspopup="menu"
      class="w-9 h-9 rounded-full bg-mama-teal text-white flex items-center justify-center text-sm font-bold hover:bg-mama-teal-dark transition-all shadow-sm flex-shrink-0"
      :aria-label="t('auth.userMenu')"
    >
      {{ initials }}
    </button>

    <Transition
      enter-active-class="transition-all duration-150 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-100 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-1"
    >
      <div
        v-if="open"
        role="menu"
        class="absolute right-0 mt-2 w-52 bg-mama-surface rounded-2xl shadow-lg border border-mama-border-light overflow-hidden z-50 origin-top-right"
      >
        <!-- User info -->
        <div class="px-4 py-3 border-b border-mama-border-light">
          <p class="text-xs font-semibold text-mama-text truncate">
            {{ [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.email }}
          </p>
          <p class="text-[11px] text-mama-muted truncate">{{ user?.email }}</p>
        </div>

        <!-- Menu items -->
        <div class="py-1.5">
          <!-- My Profile -->
          <NuxtLink
            to="/onboarding"
            role="menuitem"
            @click="open = false"
            class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-mama-text hover:bg-mama-sky dark:hover:bg-slate-700 hover:text-mama-teal transition-colors"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            {{ t('auth.myProfile') }}
          </NuxtLink>

          <!-- Settings (disabled — no backend support yet) -->
          <div role="menuitem" aria-disabled="true" class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-mama-muted opacity-50 cursor-not-allowed select-none">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {{ t('auth.settings') }}
            <span class="ml-auto text-[10px] bg-mama-sky text-mama-teal px-1.5 py-0.5 rounded-full font-semibold leading-tight">
              {{ t('auth.settingsSoon') }}
            </span>
          </div>
        </div>

        <!-- Logout -->
        <div class="border-t border-mama-border-light py-1.5">
          <button
            role="menuitem"
            @click="handleLogout"
            class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-mama-coral hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            {{ t('auth.logOut') }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '~/stores/auth'
import { useLogout } from '../../composables/useLogout'

const { t } = useI18n()
const auth = useAuthStore()
const logout = useLogout()

const open = ref(false)
const containerRef = ref<HTMLElement>()

const user = computed(() => auth.user)
const initials = computed(() => auth.initials)

async function handleLogout() {
  open.value = false
  await logout()
}

function handleClickOutside(e: MouseEvent) {
  if (!containerRef.value?.contains(e.target as Node)) {
    open.value = false
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>
