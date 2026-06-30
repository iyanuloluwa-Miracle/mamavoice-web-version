<template>
  <!-- Mobile backdrop -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 lg:hidden drawer-backdrop"
      @click="$emit('close')"
    />
  </Transition>

  <!-- Sidebar panel -->
  <aside
    class="fixed inset-y-0 left-0 z-50 flex flex-col bg-mama-surface border-r border-mama-border transition-all duration-300 ease-out
           lg:relative lg:inset-auto lg:z-auto lg:flex-shrink-0"
    :class="isOpen
      ? 'w-72 lg:w-60 translate-x-0'
      : '-translate-x-full lg:translate-x-0 lg:w-14'"
  >
    <!-- Header -->
    <div class="flex items-center h-12 px-3 border-b border-mama-border-light flex-shrink-0"
      :class="isOpen ? 'justify-between' : 'justify-center'">
      <!-- Logo (expanded) -->
      <NuxtLink v-if="isOpen" to="/" class="flex items-center gap-2 min-w-0">
        <img src="/mamavoiceLogo.png" alt="MamaVoice logo" class="h-8 w-auto flex-shrink-0" />
        <span class="text-base font-black text-mama-coral truncate">MamaVoice</span>
      </NuxtLink>

      <!-- Logo icon only (collapsed desktop) -->
      <NuxtLink v-else to="/" class="flex items-center justify-center">
        <img src="/mamavoiceLogo.png" alt="MamaVoice logo" class="h-7 w-auto" />
      </NuxtLink>

      <!-- Mobile close button -->
      <button
        class="lg:hidden w-8 h-8 rounded-full flex items-center justify-center text-mama-muted hover:text-mama-text hover:bg-mama-border-light transition-colors"
        :aria-label="t('chat.closeSidebar')"
        @click="$emit('close')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Scrollable body -->
    <div class="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-1">

      <!-- New Chat button -->
      <button
        @click="$emit('newChat')"
        class="flex items-center gap-2.5 w-full rounded-xl px-3 py-2.5 text-sm font-semibold
               bg-mama-teal text-white hover:bg-mama-teal-dark transition-all active:scale-[0.98]"
        :class="isOpen ? 'justify-start' : 'justify-center'"
        :title="!isOpen ? t('chat.newChat') : undefined"
      >
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14"/>
        </svg>
        <span v-if="isOpen" class="truncate">{{ t('chat.newChat') }}</span>
      </button>

      <!-- Current Conversation -->
      <div v-if="messages.length > 0" class="mt-3">
        <p v-if="isOpen" class="text-[10px] font-semibold text-mama-muted uppercase tracking-wider px-2 mb-1">
          {{ t('chat.currentChat') }}
        </p>
        <div
          class="flex items-center gap-2 rounded-xl px-3 py-2.5 bg-mama-sky border border-mama-teal/20 cursor-default"
          :class="isOpen ? '' : 'justify-center'"
        >
          <div class="w-2 h-2 rounded-full bg-mama-teal flex-shrink-0" />
          <p v-if="isOpen" class="text-xs text-mama-text font-medium truncate">
            {{ firstMessagePreview }}
          </p>
        </div>
      </div>

      <!-- Empty chat state -->
      <div v-else class="mt-3">
        <p v-if="isOpen" class="text-[10px] font-semibold text-mama-muted uppercase tracking-wider px-2 mb-1">
          {{ t('chat.currentChat') }}
        </p>
        <div
          class="flex items-center gap-2 rounded-xl px-3 py-2 opacity-50"
          :class="isOpen ? '' : 'justify-center'"
        >
          <svg class="w-3.5 h-3.5 text-mama-muted flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <p v-if="isOpen" class="text-xs text-mama-muted italic truncate">{{ t('chat.noMessages') }}</p>
        </div>
      </div>

      <!-- Divider + Quick Actions -->
      <div class="mt-4">
        <div v-if="isOpen" class="flex items-center gap-2 px-2 mb-2">
          <div class="flex-1 h-px bg-mama-border-light" />
          <p class="text-[10px] font-semibold text-mama-muted uppercase tracking-wider whitespace-nowrap">
            {{ t('chat.quickActions') }}
          </p>
          <div class="flex-1 h-px bg-mama-border-light" />
        </div>
        <div v-else class="mx-2 h-px bg-mama-border-light mb-2" />

        <!-- Maternal Tips -->
        <button
          @click="$emit('selectPrompt', 'Share important maternal health tips for this week')"
          class="flex items-center gap-2.5 w-full rounded-xl px-3 py-2.5 text-sm text-mama-text
                 hover:bg-mama-sky hover:text-mama-teal transition-all group active:scale-[0.98]"
          :class="isOpen ? 'justify-start' : 'justify-center'"
          :title="!isOpen ? t('chat.maternalTips') : undefined"
        >
          <span class="text-base flex-shrink-0">🤰</span>
          <span v-if="isOpen" class="text-xs font-medium truncate group-hover:text-mama-teal transition-colors">
            {{ t('chat.maternalTips') }}
          </span>
        </button>

        <!-- Vaccination Schedule -->
        <button
          @click="$emit('selectPrompt', 'What vaccinations do I need during pregnancy?')"
          class="flex items-center gap-2.5 w-full rounded-xl px-3 py-2.5 text-sm text-mama-text
                 hover:bg-mama-sky hover:text-mama-teal transition-all group active:scale-[0.98]"
          :class="isOpen ? 'justify-start' : 'justify-center'"
          :title="!isOpen ? t('chat.vaccinationSchedule') : undefined"
        >
          <span class="text-base flex-shrink-0">💉</span>
          <span v-if="isOpen" class="text-xs font-medium truncate group-hover:text-mama-teal transition-colors">
            {{ t('chat.vaccinationSchedule') }}
          </span>
        </button>

        <!-- Pregnancy Tracker -->
        <button
          @click="$emit('selectPrompt', 'What should I expect in my current trimester?')"
          class="flex items-center gap-2.5 w-full rounded-xl px-3 py-2.5 text-sm text-mama-text
                 hover:bg-mama-sky hover:text-mama-teal transition-all group active:scale-[0.98]"
          :class="isOpen ? 'justify-start' : 'justify-center'"
          :title="!isOpen ? t('chat.pregnancyTracker') : undefined"
        >
          <span class="text-base flex-shrink-0">👶</span>
          <span v-if="isOpen" class="text-xs font-medium truncate group-hover:text-mama-teal transition-colors">
            {{ t('chat.pregnancyTracker') }}
          </span>
        </button>
      </div>
    </div>

    <!-- Bottom: locale badge -->
    <div class="flex-shrink-0 px-3 py-3 border-t border-mama-border-light"
      :class="isOpen ? '' : 'flex justify-center'">
      <div v-if="isOpen" class="flex items-center gap-2">
        <svg class="w-3.5 h-3.5 text-mama-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span class="text-[11px] text-mama-muted font-medium">{{ LOCALE_DISPLAY[locale] ?? locale.toUpperCase() }}</span>
      </div>
      <div v-else>
        <svg class="w-3.5 h-3.5 text-mama-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Message {
  role: 'user' | 'ai'
  text: string
  time: string
}

const props = defineProps<{
  isOpen: boolean
  messages: Message[]
  locale: string
}>()

defineEmits<{
  close: []
  newChat: []
  selectPrompt: [text: string]
}>()

const { t } = useI18n()

const LOCALE_DISPLAY: Record<string, string> = {
  en: 'EN', yo: 'YO', ha: 'HA', ig: 'IG', pcm: 'PCM',
}

const firstMessagePreview = computed(() => {
  const first = props.messages.find(m => m.role === 'user')
  if (!first) return ''
  return first.text.length > 40 ? first.text.slice(0, 40) + '…' : first.text
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
