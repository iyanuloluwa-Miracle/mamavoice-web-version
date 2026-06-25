<template>
  <div class="h-[100dvh] flex flex-col bg-mama-bg overflow-hidden">

    <!-- ── Header ─────────────────────────────────────────────── -->
    <header class="bg-mama-surface border-b border-mama-border-light px-3 sm:px-5 flex items-center justify-between h-14 flex-shrink-0 shadow-sm pt-safe">
      <NuxtLink to="/" class="flex items-center gap-0.5">
        <span class="text-lg sm:text-xl font-black bg-gradient-to-r from-mama-teal to-mama-teal-light bg-clip-text text-transparent">Mama</span>
        <span class="text-lg sm:text-xl font-black text-mama-coral">Voice</span>
        <span class="ml-1.5 text-[10px] sm:text-xs font-semibold bg-mama-sky text-mama-teal px-1.5 sm:px-2 py-0.5 rounded-full">AI</span>
        <!-- Web Preview badge -->
        <span class="ml-2 text-[9px] sm:text-[10px] font-bold bg-mama-coral/10 text-mama-coral px-2 py-0.5 rounded-full tracking-wide">
          {{ t('chat.webPreviewBadge') }}
        </span>
      </NuxtLink>

      <div class="flex items-center gap-2">
        <!-- Language selector -->
        <div class="relative">
          <button
            @click="isLangOpen = !isLangOpen"
            class="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 rounded-full border border-mama-border text-xs sm:text-sm font-medium text-mama-text hover:border-mama-teal hover:text-mama-teal transition-all"
          >
            <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            {{ LOCALE_DISPLAY[locale] ?? locale.toUpperCase() }}
            <svg class="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div v-if="isLangOpen"
            class="absolute right-0 mt-2 w-28 sm:w-32 bg-mama-surface rounded-2xl shadow-lg border border-mama-border-light overflow-hidden z-50">
            <button v-for="l in locales" :key="l.code"
              @click="setLocale(l.code); isLangOpen = false"
              class="w-full px-3 sm:px-4 py-2.5 text-left text-xs sm:text-sm hover:bg-mama-sky hover:text-mama-teal transition-colors"
              :class="locale === l.code ? 'text-mama-teal font-semibold bg-mama-sky' : 'text-mama-text'">
              {{ l.name }}
            </button>
          </div>
        </div>

        <!-- TTS toggle -->
        <button
          v-if="ttsSupported"
          @click="toggleEnabled()"
          :title="t('chat.ttsToggle')"
          class="w-9 h-9 rounded-full flex items-center justify-center transition-all"
          :class="ttsEnabled ? 'bg-mama-sky text-mama-teal' : 'bg-mama-input text-mama-muted'"
        >
          <svg v-if="ttsEnabled" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
          <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l1.27 1.27L20.27 18 5.27 3 4.27 3zM12 4 9.91 6.09 12 8.18V4z"/>
          </svg>
        </button>

        <!-- Dark mode toggle -->
        <button @click="toggle"
          class="w-9 h-9 rounded-full flex items-center justify-center bg-mama-sky dark:bg-slate-800 text-mama-teal"
          :aria-label="isDark ? t('chat.switchLight') : t('chat.switchDark')">
          <svg v-if="!isDark" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <svg v-else class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"/>
            <path stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </button>

        <!-- New chat -->
        <button
          v-if="messages.length > 0"
          @click="clearChat"
          title="New chat"
          class="w-9 h-9 rounded-full flex items-center justify-center bg-mama-input text-mama-muted hover:bg-mama-sky hover:text-mama-teal transition-all"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>

        <!-- Download CTA -->
        <a href="/#download"
          class="hidden xs:hidden sm:flex items-center gap-2 bg-mama-teal text-white px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-mama-teal-dark transition-all">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.37.74 3.19.8.96-.1 1.95-.8 3.2-.8 1.5.07 2.63.64 3.33 1.6-3.04 1.77-2.55 6.19.28 7.28zM13 3.5c-.55 2.29-2.48 4-4.33 3.88C8.37 5.04 10.5 3 13 3.5z"/>
          </svg>
          {{ t('chat.downloadApp') }}
        </a>
      </div>
    </header>

    <!-- ── Web Preview banner (dismissible) ───────────────────── -->
    <div
      v-if="!previewDismissed"
      class="flex-shrink-0 bg-mama-teal/10 border-b border-mama-teal/20 px-4 py-2.5 flex items-center justify-between gap-3"
    >
      <p class="text-xs text-mama-text">
        📱 {{ t('chat.webPreviewBanner') }}
        <a href="/#download" class="font-semibold text-mama-teal hover:underline">{{ t('chat.getFullApp') }}</a>
      </p>
      <button
        @click="dismissPreview"
        class="flex-shrink-0 text-xs font-semibold text-mama-muted hover:text-mama-text transition-colors"
      >
        {{ t('chat.previewDismiss') }}
      </button>
    </div>

    <!-- ── Conversation area ──────────────────────────────────── -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6 overscroll-contain">
      <div class="max-w-3xl mx-auto w-full">

        <!-- Empty state -->
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center min-h-[55vh] sm:min-h-[60vh] text-center gap-5 sm:gap-6 py-4">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-mama-teal to-mama-teal-light flex items-center justify-center shadow-md">
            <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </div>

          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-mama-text mb-2">{{ t('chat.greeting') }}</h2>
            <p class="text-mama-muted text-sm sm:text-base max-w-xs sm:max-w-sm mx-auto">
              {{ t('chat.greetingSub') }}
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-2xl">
            <button
              v-for="prompt in suggestedPrompts"
              :key="prompt.key"
              @click="sendSuggested(prompt.text)"
              class="flex items-start gap-3 bg-mama-surface rounded-2xl p-3.5 sm:p-4 text-left shadow-soft hover:shadow-soft-hover hover:border-mama-teal border-2 border-transparent transition-all group active:scale-[0.98]"
            >
              <span class="text-lg sm:text-xl flex-shrink-0">{{ prompt.emoji }}</span>
              <span class="text-xs sm:text-sm font-medium text-mama-text group-hover:text-mama-teal transition-colors leading-snug">{{ prompt.text }}</span>
            </button>
          </div>
        </div>

        <!-- Messages thread -->
        <template v-else>
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="flex items-end gap-2 sm:gap-3 mb-3 sm:mb-4"
            :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div v-if="msg.role === 'ai'"
              class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-mama-teal to-mama-teal-light flex items-center justify-center flex-shrink-0 mb-1">
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              </svg>
            </div>

            <div class="max-w-[82%] sm:max-w-[75%] md:max-w-[65%]">
              <div
                class="px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm leading-relaxed whitespace-pre-wrap"
                :class="msg.role === 'user'
                  ? 'bg-mama-teal text-white rounded-3xl rounded-br-sm'
                  : 'bg-mama-surface text-mama-text rounded-3xl rounded-bl-sm shadow-soft-sm border border-mama-border-light'"
              >
                {{ msg.text }}
              </div>
              <div class="text-[10px] sm:text-[11px] text-mama-muted mt-1 sm:mt-1.5 px-1"
                :class="msg.role === 'user' ? 'text-right' : 'text-left'">
                {{ msg.time }}
              </div>
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="isTyping" class="flex items-end gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-mama-teal to-mama-teal-light flex items-center justify-center flex-shrink-0">
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              </svg>
            </div>
            <div class="bg-mama-surface rounded-3xl rounded-bl-sm px-4 sm:px-5 py-3 sm:py-4 shadow-soft-sm border border-mama-border-light flex items-center gap-1.5">
              <div v-for="n in 3" :key="n"
                class="w-2 h-2 rounded-full bg-mama-teal/50 animate-typing-dot"
                :style="{ animationDelay: `${n * 150}ms` }" />
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- ── Mobile nudge banner ─────────────────────────────────── -->
    <div v-if="hasReplied" class="px-3 sm:px-4 mb-2 flex-shrink-0">
      <div class="bg-mama-sky rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3 max-w-3xl mx-auto">
        <div class="flex items-center gap-2 min-w-0">
          <span class="text-sm sm:text-base flex-shrink-0">📱</span>
          <p class="text-[11px] sm:text-xs text-mama-text font-medium truncate">
            {{ t('chat.nudge') }}
          </p>
        </div>
        <a href="/#download" class="flex-shrink-0 text-xs font-bold text-mama-teal hover:text-mama-teal-dark whitespace-nowrap">
          {{ t('chat.getApp') }}
        </a>
      </div>
    </div>

    <!-- ── Input bar ───────────────────────────────────────────── -->
    <div class="bg-mama-surface border-t border-mama-border-light px-3 sm:px-4 pt-2.5 sm:pt-3 pb-safe flex-shrink-0"
      style="padding-bottom: max(12px, env(safe-area-inset-bottom));">
      <div class="max-w-3xl mx-auto">
        <div class="flex items-end gap-2 sm:gap-3 bg-mama-input rounded-[1.25rem] sm:rounded-[1.5rem] border border-mama-border shadow-soft-sm px-3 sm:px-4 py-2.5 sm:py-3"
          :class="isRecording ? 'border-mama-coral' : ''">

          <!-- Mic button -->
          <button
            @click="handleMicClick"
            class="flex-shrink-0 w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200"
            :class="isRecording ? 'bg-mama-coral scale-110' : (sttSupported ? 'bg-mama-sky hover:bg-mama-teal hover:scale-105' : 'bg-mama-input cursor-not-allowed opacity-50')"
            :aria-label="isRecording ? t('chat.stopRecording') : t('chat.startRecording')"
            :disabled="!sttSupported && !isRecording"
          >
            <svg v-if="!isRecording" class="w-4 h-4" :class="sttSupported ? 'text-mama-teal' : 'text-mama-muted'" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
            <svg v-else class="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="2"/>
            </svg>
          </button>

          <!-- Auto-resize textarea -->
          <textarea
            ref="inputRef"
            v-model="inputText"
            @keydown.enter.exact.prevent="sendMessage"
            @keydown.enter.shift.exact="() => {}"
            @input="autoResize"
            rows="1"
            :placeholder="isRecording ? t('chat.listening') : t('chat.placeholder')"
            class="flex-1 resize-none bg-transparent text-mama-text placeholder-mama-muted/60 text-sm leading-relaxed focus:outline-none min-h-[24px] max-h-28 overflow-y-auto"
            :class="isRecording ? 'placeholder-mama-coral/70' : ''"
          />

          <!-- Voice wave while recording -->
          <div v-if="isRecording" class="flex-shrink-0 flex items-center">
            <UiVoiceWave :is-active="true" size="sm" color="teal" />
          </div>

          <!-- Send button -->
          <button
            @click="sendMessage"
            :disabled="(!inputText.trim() && !isRecording) || isTyping"
            class="flex-shrink-0 w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200"
            :class="inputText.trim() && !isTyping
              ? 'bg-mama-teal hover:bg-mama-teal-dark hover:scale-105 active:scale-95'
              : 'bg-mama-input cursor-not-allowed'"
            :aria-label="t('chat.sendMessage')"
          >
            <svg class="w-4 h-4"
              :class="inputText.trim() && !isTyping ? 'text-white' : 'text-mama-muted'"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <p class="text-center text-[10px] sm:text-[10px] text-mama-muted mt-2 px-2">
          {{ t('chat.disclaimer') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useColorMode } from '../composables/useColorMode'
import { useChatHistory } from '../composables/useChatHistory'
import { useSeoMeta } from '@unhead/vue'

definePageMeta({ layout: false })

const { t, locale, locales, setLocale } = useI18n()
const { isDark, toggle } = useColorMode()

const LOCALE_DISPLAY: Record<string, string> = {
  en: 'EN', yo: 'YO', ha: 'HA', ig: 'IG', pcm: 'PCM',
}
const { isRecording, isSupported: sttSupported, startRecording, stopRecording } = useSpeechToText()
const { isEnabled: ttsEnabled, isSupported: ttsSupported, speak, toggleEnabled } = useTextToSpeech()
const { load: loadHistory, save: saveHistory, clear: clearHistory } = useChatHistory()

useSeoMeta({
  title: 'MamaVoice AI Chat — Your Maternal Health Companion',
  description: 'Chat with MamaVoice AI for trusted pregnancy and newborn health guidance in Yoruba, Hausa, Igbo, or English.',
})

interface Message {
  role: 'user' | 'ai'
  text: string
  time: string
}

const messages = ref<Message[]>([])
watch(messages, (val) => saveHistory(val), { deep: true })

const inputText = ref('')
const isTyping = ref(false)
const hasReplied = ref(false)
const isLangOpen = ref(false)
const messagesContainer = ref<HTMLElement>()
const inputRef = ref<HTMLTextAreaElement>()

// Web Preview banner
const previewDismissed = ref(false)
onMounted(() => {
  previewDismissed.value = localStorage.getItem('mama-preview-dismissed') === 'true'
  messages.value = loadHistory()
})
function dismissPreview() {
  previewDismissed.value = true
  localStorage.setItem('mama-preview-dismissed', 'true')
}

function clearChat() {
  clearHistory()
  messages.value = []
  hasReplied.value = false
}

const suggestedPrompts = computed(() => [
  { key: 'p0', emoji: '🤰', text: t('chat.p0') },
  { key: 'p1', emoji: '🥦', text: t('chat.p1') },
  { key: 'p2', emoji: '💉', text: t('chat.p2') },
  { key: 'p3', emoji: '👶', text: t('chat.p3') },
])

function getTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isTyping.value) return

  messages.value.push({ role: 'user', text, time: getTime() })
  inputText.value = ''
  resetTextarea()
  scrollToBottom()

  isTyping.value = true

  try {
    const apiMessages = messages.value.map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant' as 'user' | 'assistant',
      content: m.text,
    }))

    const res = await $fetch<{ text: string }>('/api/chat', {
      method: 'POST',
      body: { messages: apiMessages, locale: locale.value },
    })

    const aiText = res.text || t('chat.errorResponse')
    messages.value.push({ role: 'ai', text: aiText, time: getTime() })
    speak(aiText, locale.value)
  } catch {
    messages.value.push({ role: 'ai', text: t('chat.errorResponse'), time: getTime() })
  } finally {
    isTyping.value = false
    hasReplied.value = true
    scrollToBottom()
  }
}

async function sendSuggested(text: string) {
  inputText.value = text
  await nextTick()
  await sendMessage()
}

async function handleMicClick() {
  if (isRecording.value) {
    stopRecording()
    return
  }

  if (!sttSupported.value) {
    messages.value.push({ role: 'ai', text: t('chat.micNotSupported'), time: getTime() })
    scrollToBottom()
    return
  }

  try {
    const transcript = await startRecording(locale.value, (interim) => {
      inputText.value = interim
      autoResize()
    })
    if (transcript.trim()) {
      inputText.value = transcript.trim()
      await nextTick()
      await sendMessage()
    } else {
      messages.value.push({ role: 'ai', text: t('chat.sttLangFallback'), time: getTime() })
      scrollToBottom()
    }
  } catch {
    messages.value.push({ role: 'ai', text: t('chat.sttLangFallback'), time: getTime() })
    scrollToBottom()
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function autoResize() {
  const el = inputRef.value
  if (el) {
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`
  }
}

function resetTextarea() {
  const el = inputRef.value
  if (el) { el.style.height = 'auto' }
}
</script>
