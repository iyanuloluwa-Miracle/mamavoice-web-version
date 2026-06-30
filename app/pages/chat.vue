<template>
  <div class="h-[100dvh] flex bg-mama-bg overflow-hidden">

    <!-- ── Sidebar ──────────────────────────────────────────────── -->
    <ChatSidebar
      :is-open="sidebarOpen"
      :messages="messages"
      :locale="locale"
      @close="sidebarOpen = false"
      @new-chat="clearChat(); sidebarOpen = false"
      @select-prompt="sendSuggested"
    />

    <!-- ── Main Column ─────────────────────────────────────────── -->
    <div class="flex flex-col flex-1 min-w-0">

      <!-- ── Header ───────────────────────────────────────────── -->
      <header class="bg-mama-surface border-b border-mama-border-light px-3 sm:px-4 flex items-center justify-between h-12 flex-shrink-0 shadow-sm pt-safe">
        <!-- Left: sidebar toggle + logo -->
        <div class="flex items-center gap-2">
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="w-9 h-9 rounded-xl flex items-center justify-center text-mama-muted hover:text-mama-text hover:bg-mama-border-light transition-all"
            :aria-label="sidebarOpen ? t('chat.closeSidebar') : t('chat.openSidebar')"
          >
            <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <NuxtLink to="/" class="flex items-center gap-1.5">
            <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-mama-teal to-mama-teal-light flex items-center justify-center shadow-sm flex-shrink-0">
              <svg class="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </div>
            <div class="flex items-baseline gap-0.5">
              <span class="text-base sm:text-lg font-black bg-gradient-to-r from-mama-teal to-mama-teal-light bg-clip-text text-transparent">Mama</span>
              <span class="text-base sm:text-lg font-black text-mama-coral">Voice</span>
              <span class="ml-1 text-[9px] sm:text-[10px] font-semibold bg-mama-sky text-mama-teal px-1.5 py-0.5 rounded-full">AI</span>
            </div>
          </NuxtLink>
        </div>

        <!-- Right: controls -->
        <div class="flex items-center gap-1.5 sm:gap-2">
          <!-- Language selector -->
          <div class="relative">
            <button
              @click="isLangOpen = !isLangOpen"
              class="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-full border border-mama-border text-xs font-medium text-mama-text hover:border-mama-teal hover:text-mama-teal transition-all"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              {{ LOCALE_DISPLAY[locale] ?? locale.toUpperCase() }}
              <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
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

          <!-- Download CTA -->
          <a href="/#download"
            class="hidden sm:flex items-center gap-1.5 bg-mama-teal text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-mama-teal-dark transition-all">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.37.74 3.19.8.96-.1 1.95-.8 3.2-.8 1.5.07 2.63.64 3.33 1.6-3.04 1.77-2.55 6.19.28 7.28zM13 3.5c-.55 2.29-2.48 4-4.33 3.88C8.37 5.04 10.5 3 13 3.5z"/>
            </svg>
            {{ t('chat.downloadApp') }}
          </a>
        </div>
      </header>

      <!-- ── Web Preview banner ─────────────────────────────────── -->
      <div
        v-if="!previewDismissed"
        class="flex-shrink-0 bg-mama-teal/10 border-b border-mama-teal/20 px-4 py-2 flex items-center justify-between gap-3 animate-slide-in"
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
      <main ref="messagesContainer" class="flex-1 overflow-y-auto overscroll-contain">
        <div class="max-w-3xl mx-auto w-full px-3 sm:px-5 py-5 sm:py-7">

          <!-- ── Empty state ──────────────────────────────────── -->
          <div v-if="messages.length === 0"
            class="flex flex-col items-center justify-center min-h-[55vh] sm:min-h-[60vh] text-center gap-6 sm:gap-8 py-4">

            <!-- Floating icon -->
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-mama-teal to-mama-teal-light flex items-center justify-center shadow-soft animate-float">
              <svg class="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </div>

            <!-- Greeting -->
            <div class="animate-fade-in-up" style="animation-delay: 100ms;">
              <h2 class="text-2xl sm:text-3xl font-bold text-mama-text mb-2">
                {{ greeting }}<span class="ml-1">👋</span>
              </h2>
              <p class="text-mama-muted text-sm sm:text-base max-w-xs sm:max-w-sm mx-auto leading-relaxed">
                {{ t('chat.howCanIHelp') }}
              </p>
            </div>

            <!-- Suggested prompts -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-2xl">
              <button
                v-for="(prompt, idx) in suggestedPrompts"
                :key="prompt.key"
                @click="sendSuggested(prompt.text)"
                class="flex items-start gap-3 bg-mama-surface rounded-2xl p-3.5 sm:p-4 text-left
                       border-2 border-transparent shadow-soft-sm
                       hover:shadow-soft hover:border-mama-teal hover:-translate-y-0.5
                       transition-all duration-200 group active:scale-[0.98] animate-fade-in-up"
                :style="{ animationDelay: `${(idx + 2) * 80}ms` }"
              >
                <span class="text-lg sm:text-xl flex-shrink-0 mt-0.5">{{ prompt.emoji }}</span>
                <span class="text-xs sm:text-sm font-medium text-mama-text group-hover:text-mama-teal transition-colors leading-snug">
                  {{ prompt.text }}
                </span>
              </button>
            </div>
          </div>

          <!-- ── Messages thread ──────────────────────────────── -->
          <template v-else>
            <div
              v-for="(msg, i) in messages"
              :key="i"
              class="flex items-end gap-2 sm:gap-3 mb-4 sm:mb-5 animate-message-in"
              :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
              :style="{ animationDelay: `${Math.min(i * 30, 120)}ms` }"
            >
              <!-- AI Avatar -->
              <div v-if="msg.role === 'ai'"
                class="w-8 h-8 rounded-full bg-gradient-to-br from-mama-teal to-mama-teal-light flex items-center justify-center flex-shrink-0 mb-1 shadow-sm">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                </svg>
              </div>

              <div class="max-w-[82%] sm:max-w-[75%] md:max-w-[65%]">

                <!-- User bubble -->
                <div v-if="msg.role === 'user'"
                  class="px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
                         bg-mama-teal text-white rounded-3xl rounded-br-sm shadow-sm">
                  {{ msg.text }}
                </div>

                <!-- AI bubble -->
                <div v-else class="relative overflow-hidden rounded-3xl rounded-bl-sm shadow-soft-sm border border-mama-border-light bg-mama-surface">
                  <!-- Left accent stripe -->
                  <div class="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-mama-teal to-mama-teal-light" />
                  <!-- Content -->
                  <div class="pl-5 pr-4 sm:pr-5 py-3 sm:py-4 text-sm leading-relaxed whitespace-pre-wrap text-mama-text">
                    {{ msg.text }}
                  </div>
                </div>

                <!-- Meta row: timestamp + actions -->
                <div class="flex items-center gap-2 mt-1.5 px-1"
                  :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
                  <span class="text-[10px] text-mama-muted">{{ msg.time }}</span>

                  <template v-if="msg.role === 'ai'">
                    <!-- Speak button -->
                    <button
                      v-if="ttsSupported"
                      @click="speakMessage(i, msg.text)"
                      :title="speakingIndex === i ? 'Stop' : 'Read aloud'"
                      class="text-mama-muted hover:text-mama-teal transition-colors"
                    >
                      <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path v-if="speakingIndex !== i" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                        <path v-else d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l1.27 1.27L20.27 18 5.27 3 4.27 3zM12 4 9.91 6.09 12 8.18V4z"/>
                      </svg>
                    </button>

                    <!-- Copy button -->
                    <button
                      @click="copyMessage(i, msg.text)"
                      :title="copiedIndex === i ? 'Copied!' : 'Copy'"
                      class="text-mama-muted hover:text-mama-teal transition-colors"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path v-if="copiedIndex !== i" stroke-linecap="round" stroke-linejoin="round"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    </button>

                    <!-- Regenerate (last AI message only) -->
                    <button
                      v-if="i === messages.length - 1 && !isTyping"
                      @click="regenerateLastResponse"
                      :title="t('chat.regenerate')"
                      class="text-mama-muted hover:text-mama-teal transition-colors"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                      </svg>
                    </button>
                  </template>
                </div>
              </div>
            </div>

            <!-- Typing indicator -->
            <div v-if="isTyping" class="flex items-end gap-2 sm:gap-3 mb-4 sm:mb-5 animate-message-in">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-mama-teal to-mama-teal-light flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                </svg>
              </div>
              <div class="relative overflow-hidden rounded-3xl rounded-bl-sm shadow-soft-sm border border-mama-border-light bg-mama-surface">
                <div class="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-mama-teal/30 to-mama-teal-light/30" />
                <div class="pl-5 pr-5 py-4 flex items-center gap-1.5">
                  <div v-for="n in 3" :key="n"
                    class="w-2 h-2 rounded-full bg-mama-teal/50 animate-typing-dot"
                    :style="{ animationDelay: `${n * 150}ms` }" />
                </div>
              </div>
            </div>
          </template>
        </div>
      </main>

      <!-- ── Language switch confirmation ──────────────────────── -->
      <div v-if="pendingLocale" class="px-3 sm:px-4 mb-2 flex-shrink-0">
        <div class="bg-mama-sky border border-mama-teal/30 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 max-w-3xl mx-auto animate-slide-in">
          <p class="text-xs text-mama-text font-medium">{{ t('chat.langSwitchPrompt') }}</p>
          <div class="flex items-center gap-2 flex-shrink-0">
            <button @click="cancelLocaleSwitch"
              class="text-xs font-semibold text-mama-muted hover:text-mama-text transition-colors whitespace-nowrap">
              {{ t('chat.langSwitchCancel') }}
            </button>
            <button @click="confirmLocaleSwitch"
              class="text-xs font-bold text-white bg-mama-teal hover:bg-mama-teal-dark px-3 py-1.5 rounded-full transition-colors whitespace-nowrap">
              {{ t('chat.langSwitchConfirm') }}
            </button>
          </div>
        </div>
      </div>

      <!-- ── Emergency banner ──────────────────────────────────── -->
      <div v-if="showEmergencyBanner" class="px-3 sm:px-4 mb-2 flex-shrink-0">
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 max-w-3xl mx-auto animate-slide-in">
          <p class="text-xs text-red-700 dark:text-red-300 font-medium">🚨 {{ t('chat.emergencyPrompt') }}</p>
          <a href="tel:112"
            class="flex-shrink-0 text-xs font-bold text-red-600 dark:text-red-400 hover:underline whitespace-nowrap">
            {{ t('chat.emergencyCall') }} →
          </a>
        </div>
      </div>

      <!-- ── Mobile nudge banner ───────────────────────────────── -->
      <div v-if="hasReplied" class="px-3 sm:px-4 mb-2 flex-shrink-0">
        <div class="bg-mama-sky rounded-2xl px-3.5 sm:px-4 py-2.5 flex items-center justify-between gap-3 max-w-3xl mx-auto">
          <div class="flex items-center gap-2 min-w-0">
            <span class="text-sm flex-shrink-0">📱</span>
            <p class="text-[11px] sm:text-xs text-mama-text font-medium truncate">{{ t('chat.nudge') }}</p>
          </div>
          <a href="/#download" class="flex-shrink-0 text-xs font-bold text-mama-teal hover:text-mama-teal-dark whitespace-nowrap">
            {{ t('chat.getApp') }}
          </a>
        </div>
      </div>

      <!-- ── Composer ───────────────────────────────────────────── -->
      <div class="flex-shrink-0 bg-gradient-to-t from-mama-bg via-mama-bg/95 to-transparent px-3 sm:px-4 pt-2 pb-3"
        style="padding-bottom: max(12px, env(safe-area-inset-bottom));">
        <div class="max-w-3xl mx-auto">
          <div
            class="bg-mama-surface rounded-2xl border-2 shadow-soft focus-within:shadow-soft-hover transition-all duration-200 px-3 sm:px-4 py-2.5 sm:py-3"
            :class="isRecording ? 'border-mama-coral' : 'border-mama-border focus-within:border-mama-teal/60'"
          >
            <div class="flex items-end gap-2 sm:gap-3">
              <!-- Mic button -->
              <button
                @click="handleMicClick"
                class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                :class="isRecording
                  ? 'bg-mama-coral scale-110 ring-2 ring-mama-coral/30 ring-offset-2 ring-offset-mama-surface'
                  : (sttSupported ? 'bg-mama-sky hover:bg-mama-teal hover:text-white hover:scale-105' : 'bg-mama-input cursor-not-allowed opacity-50')"
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

              <!-- Textarea -->
              <textarea
                ref="inputRef"
                v-model="inputText"
                @keydown.enter.exact.prevent="sendMessage"
                @keydown.enter.shift.exact="() => {}"
                @input="autoResize"
                rows="1"
                :maxlength="MAX_CHARS"
                :placeholder="isRecording ? t('chat.listening') : t('chat.placeholder')"
                class="flex-1 resize-none bg-transparent text-mama-text placeholder-mama-muted/60 text-sm leading-relaxed focus:outline-none min-h-[24px] max-h-28 overflow-y-auto"
                :class="isRecording ? 'placeholder-mama-coral/70' : ''"
              />

              <!-- Voice wave while recording (desktop) -->
              <div v-if="isRecording" class="hidden sm:flex flex-shrink-0 items-center">
                <UiVoiceWave :is-active="true" size="sm" color="teal" />
              </div>

              <!-- Send button -->
              <button
                @click="sendMessage"
                :disabled="(!inputText.trim() && !isRecording) || isTyping"
                class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                :class="inputText.trim() && !isTyping
                  ? 'bg-mama-teal hover:bg-mama-teal-dark hover:scale-105 active:scale-95 shadow-sm'
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
          </div>

          <!-- Composer meta row -->
          <div class="flex items-center justify-between mt-1.5 px-1">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold text-mama-teal/60 uppercase tracking-wide">{{ locale }}</span>
              <span class="text-mama-border">·</span>
              <p class="text-[10px] text-mama-muted">{{ t('chat.disclaimer') }}</p>
            </div>
            <span v-if="inputText.length > 0"
              class="text-[10px] flex-shrink-0 ml-2 transition-colors"
              :class="inputText.length > 450 ? 'text-mama-coral font-semibold' : 'text-mama-muted'">
              {{ inputText.length }}/{{ MAX_CHARS }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Voice overlay (mobile only) ───────────────────────── -->
    <ChatVoiceOverlay
      v-if="isRecording || isSpeaking"
      :is-recording="isRecording"
      :is-speaking="isSpeaking"
      :transcript="inputText"
      @stop="handleVoiceStop"
    />
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
const { isEnabled: ttsEnabled, isSupported: ttsSupported, isSpeaking, speak, stop, toggleEnabled } = useTextToSpeech()

const speakingIndex = ref<number | null>(null)
watch(isSpeaking, (val) => { if (!val) speakingIndex.value = null })
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

watch(locale, (newLoc, oldLoc) => {
  if (newLoc === oldLoc || messages.value.length === 0 || pendingLocale.value !== null) return
  pendingLocale.value = newLoc  // set before setLocale so the re-triggered watch exits early
  setLocale(oldLoc)
})

const MAX_CHARS = 500

const inputText = ref('')
const isTyping = ref(false)
const hasReplied = ref(false)
const isLangOpen = ref(false)
const messagesContainer = ref<HTMLElement>()
const inputRef = ref<HTMLTextAreaElement>()

const pendingLocale = ref<string | null>(null)
const showEmergencyBanner = ref(false)
const copiedIndex = ref<number | null>(null)

// Sidebar state (addition 1)
const sidebarOpen = ref(false)

// Web Preview banner
const previewDismissed = ref(false)
onMounted(() => {
  previewDismissed.value = localStorage.getItem('mama-preview-dismissed') === 'true'
  messages.value = loadHistory()
  window.addEventListener('storage', (e) => {
    if (e.key === 'mama-chat-messages') messages.value = loadHistory()
  })
  // Open sidebar on desktop by default (addition 2)
  sidebarOpen.value = window.innerWidth >= 1024
})
function dismissPreview() {
  previewDismissed.value = true
  localStorage.setItem('mama-preview-dismissed', 'true')
}

function clearChat() {
  clearHistory()
  messages.value = []
  hasReplied.value = false
  showEmergencyBanner.value = false
}

// Time-aware greeting (addition 3)
const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return t('chat.goodMorning')
  if (h < 17) return t('chat.goodAfternoon')
  return t('chat.goodEvening')
})

const suggestedPrompts = computed(() => [
  { key: 'p0', emoji: '🤰', text: t('chat.p0') },
  { key: 'p1', emoji: '🥦', text: t('chat.p1') },
  { key: 'p2', emoji: '💉', text: t('chat.p2') },
  { key: 'p3', emoji: '👶', text: t('chat.p3') },
  { key: 'p4', emoji: '🩺', text: t('chat.p4') },
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
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 30_000)

  try {
    const apiMessages = messages.value.map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant' as 'user' | 'assistant',
      content: m.text,
    }))

    const res = await $fetch<{ text: string }>('/api/chat', {
      method: 'POST',
      body: { messages: apiMessages, locale: locale.value },
      signal: controller.signal,
    })

    const aiText = res.text || t('chat.errorResponse')
    messages.value.push({ role: 'ai', text: aiText, time: getTime() })
    checkEmergency(aiText)
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && err.name === 'AbortError'
    const msg = isTimeout ? t('chat.timeoutError') : t('chat.errorResponse')
    messages.value.push({ role: 'ai', text: msg, time: getTime() })
  } finally {
    clearTimeout(timer)
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

function speakMessage(i: number, text: string) {
  if (speakingIndex.value === i) {
    stop()
    speakingIndex.value = null
  } else {
    speak(text, locale.value)  // isSpeaking → true synchronously before returning
    speakingIndex.value = i    // set after speak() so the watcher sees isSpeaking=true and doesn't reset
  }
}

// Regenerate last AI response (addition 4)
async function regenerateLastResponse() {
  const lastUserMsg = [...messages.value].reverse().find(m => m.role === 'user')
  if (!lastUserMsg) return
  // Remove last AI message
  const lastAiIdx = messages.value.map(m => m.role).lastIndexOf('ai')
  if (lastAiIdx !== -1) messages.value.splice(lastAiIdx, 1)
  inputText.value = lastUserMsg.text
  await nextTick()
  await sendMessage()
}

// Combined voice stop handler (addition 5)
function handleVoiceStop() {
  if (isRecording.value) stopRecording()
  else stop()
}

const EMERGENCY_TRIGGERS = [
  'go to hospital', 'go to the hospital', 'go to a clinic',
  'seek medical attention immediately', 'rush to',
  'hospital immediately', 'clinic immediately', 'call 112', 'emergency',
]

function checkEmergency(text: string) {
  const lower = text.toLowerCase()
  showEmergencyBanner.value = EMERGENCY_TRIGGERS.some(trigger => lower.includes(trigger))
}

async function copyMessage(i: number, text: string) {
  await navigator.clipboard.writeText(text)
  copiedIndex.value = i
  setTimeout(() => { copiedIndex.value = null }, 2000)
}

function confirmLocaleSwitch() {
  if (!pendingLocale.value) return
  clearChat()
  setLocale(pendingLocale.value)
  pendingLocale.value = null
}

function cancelLocaleSwitch() { pendingLocale.value = null }

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
