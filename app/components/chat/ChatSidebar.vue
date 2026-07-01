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
      <NuxtLink v-if="isOpen" to="/" class="flex items-center gap-2 min-w-0">
        <img src="/mamavoiceLogo.png" alt="MamaVoice logo" class="h-7 w-auto rounded-xl flex-shrink-0" />
        <span class="text-base font-black text-mama-coral truncate">MamaVoice</span>
      </NuxtLink>
      <NuxtLink v-else to="/" class="flex items-center justify-center">
        <img src="/mamavoiceLogo.png" alt="MamaVoice logo" class="h-7 w-auto" />
      </NuxtLink>
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

    <!-- New Chat button -->
    <div class="px-2 pt-3 pb-2 flex-shrink-0">
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
    </div>

    <!-- Sessions list (scrollable) -->
    <div class="flex-1 overflow-y-auto px-2 pb-2">

      <!-- Section label -->
      <p v-if="isOpen && allSessions.length > 0"
        class="text-[10px] font-semibold text-mama-muted uppercase tracking-wider px-2 mb-1.5">
        {{ t('chat.currentChat') }}
      </p>

      <!-- No sessions yet -->
      <div v-if="allSessions.length === 0 && messages.length === 0"
        class="flex items-center gap-2 rounded-xl px-3 py-2 opacity-50"
        :class="isOpen ? '' : 'justify-center'">
        <svg class="w-3.5 h-3.5 text-mama-muted flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <p v-if="isOpen" class="text-xs text-mama-muted italic truncate">{{ t('chat.noMessages') }}</p>
      </div>

      <!-- Current in-progress conversation (not yet saved as a session) -->
      <div
        v-if="messages.length > 0 && !currentSessionId"
        class="flex items-center gap-2.5 rounded-xl px-3 py-2.5 bg-mama-sky border border-mama-teal/25 cursor-default mb-1"
        :class="isOpen ? '' : 'justify-center'"
      >
        <svg class="w-3.5 h-3.5 text-mama-teal flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
        </svg>
        <div v-if="isOpen" class="flex-1 min-w-0">
          <p class="text-xs text-mama-text font-medium truncate">{{ currentPreview }}</p>
          <p class="text-[10px] text-mama-teal font-semibold">Active</p>
        </div>
      </div>

      <!-- Session entries -->
      <button
        v-for="session in allSessions"
        :key="session.id"
        @click="session.id !== currentSessionId ? $emit('loadSession', session.id) : undefined"
        class="w-full flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all mb-0.5"
        :class="[
          isOpen ? '' : 'justify-center',
          session.id === currentSessionId
            ? 'bg-mama-sky border border-mama-teal/25 cursor-default'
            : 'hover:bg-mama-border-light cursor-pointer active:scale-[0.98]'
        ]"
        :title="!isOpen ? session.title : undefined"
      >
        <svg class="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
          :class="session.id === currentSessionId ? 'text-mama-teal' : 'text-mama-muted'"
          fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <div v-if="isOpen" class="flex-1 min-w-0">
          <p class="text-xs font-medium truncate"
            :class="session.id === currentSessionId ? 'text-mama-text' : 'text-mama-text/80'">
            {{ session.title }}
          </p>
          <p class="text-[10px] mt-0.5"
            :class="session.id === currentSessionId ? 'text-mama-teal font-semibold' : 'text-mama-muted'">
            {{ session.id === currentSessionId ? 'Active' : formatTime(session.updatedAt) }}
          </p>
        </div>
      </button>
    </div>

    <!-- Quick Actions (pinned at bottom above locale) -->
    <div class="flex-shrink-0 px-2 pb-2 border-t border-mama-border-light pt-2">
      <div v-if="isOpen" class="flex items-center gap-2 px-2 mb-1.5">
        <div class="flex-1 h-px bg-mama-border-light" />
        <p class="text-[10px] font-semibold text-mama-muted uppercase tracking-wider whitespace-nowrap">
          {{ t('chat.quickActions') }}
        </p>
        <div class="flex-1 h-px bg-mama-border-light" />
      </div>

      <button
        @click="$emit('selectPrompt', 'Share important maternal health tips for this week')"
        class="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-mama-text
               hover:bg-mama-sky hover:text-mama-teal transition-all group active:scale-[0.98]"
        :class="isOpen ? 'justify-start' : 'justify-center'"
        :title="!isOpen ? t('chat.maternalTips') : undefined"
      >
        <span class="text-sm flex-shrink-0">🤰</span>
        <span v-if="isOpen" class="text-xs font-medium truncate group-hover:text-mama-teal transition-colors">{{ t('chat.maternalTips') }}</span>
      </button>

      <button
        @click="$emit('selectPrompt', 'What vaccinations do I need during pregnancy?')"
        class="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-mama-text
               hover:bg-mama-sky hover:text-mama-teal transition-all group active:scale-[0.98]"
        :class="isOpen ? 'justify-start' : 'justify-center'"
        :title="!isOpen ? t('chat.vaccinationSchedule') : undefined"
      >
        <span class="text-sm flex-shrink-0">💉</span>
        <span v-if="isOpen" class="text-xs font-medium truncate group-hover:text-mama-teal transition-colors">{{ t('chat.vaccinationSchedule') }}</span>
      </button>

      <button
        @click="$emit('selectPrompt', 'What should I expect in my current trimester?')"
        class="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-mama-text
               hover:bg-mama-sky hover:text-mama-teal transition-all group active:scale-[0.98]"
        :class="isOpen ? 'justify-start' : 'justify-center'"
        :title="!isOpen ? t('chat.pregnancyTracker') : undefined"
      >
        <span class="text-sm flex-shrink-0">👶</span>
        <span v-if="isOpen" class="text-xs font-medium truncate group-hover:text-mama-teal transition-colors">{{ t('chat.pregnancyTracker') }}</span>
      </button>
    </div>

    <!-- Locale badge -->
    <div class="flex-shrink-0 px-3 py-2.5 border-t border-mama-border-light"
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
  sessions: Array<{ id: string; title: string; updatedAt: string }>
  currentSessionId: string | null
}>()

defineEmits<{
  close: []
  newChat: []
  selectPrompt: [text: string]
  loadSession: [id: string]
}>()

const { t } = useI18n()

const LOCALE_DISPLAY: Record<string, string> = {
  en: 'EN', yo: 'YO', ha: 'HA', ig: 'IG', pcm: 'PCM',
}

const allSessions = computed(() => props.sessions)

const currentPreview = computed(() => {
  const first = props.messages.find(m => m.role === 'user')
  if (!first) return ''
  return first.text.length > 45 ? first.text.slice(0, 45) + '…' : first.text
})

function formatTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric' })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
