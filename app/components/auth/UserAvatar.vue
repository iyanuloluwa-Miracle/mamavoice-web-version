<template>
  <div class="relative" ref="containerRef">
    <button
      @click="open = !open"
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
        class="absolute right-0 mt-2 w-48 bg-mama-surface rounded-2xl shadow-lg border border-mama-border-light overflow-hidden z-50 origin-top-right"
      >
        <!-- User info -->
        <div class="px-4 py-3 border-b border-mama-border-light">
          <p class="text-xs font-semibold text-mama-text truncate">
            {{ user?.firstName }} {{ user?.lastName }}
          </p>
          <p class="text-[11px] text-mama-muted truncate">{{ user?.email }}</p>
        </div>

        <!-- Logout -->
        <div class="border-t border-mama-border-light py-1.5">
          <button
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '~/stores/auth'

const { t } = useI18n()
const auth = useAuthStore()

const open = ref(false)
const containerRef = ref<HTMLElement>()

const user = computed(() => auth.user)
const initials = computed(() => auth.initials)

async function handleLogout() {
  open.value = false
  auth.logout()
  await navigateTo('/')
}

function handleClickOutside(e: MouseEvent) {
  if (!containerRef.value?.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>
