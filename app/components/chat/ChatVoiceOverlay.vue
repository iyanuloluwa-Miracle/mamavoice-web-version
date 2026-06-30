<template>
  <!-- Only shown on mobile; desktop shows voice state inline in composer -->
  <div class="lg:hidden fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-mama-bg/85 dark:bg-[#0F172A]/90 backdrop-blur-md" />

    <!-- Card -->
    <div class="relative z-10 flex flex-col items-center gap-6 px-8 py-10 mx-6 rounded-3xl bg-mama-surface shadow-soft border border-mama-border-light w-full max-w-xs">

      <!-- Recording state: pulsing mic rings -->
      <div v-if="isRecording" class="relative flex items-center justify-center w-24 h-24">
        <!-- Outer rings -->
        <div class="absolute w-24 h-24 rounded-full bg-mama-coral/15 animate-pulse-ring" style="animation-delay: 0ms;" />
        <div class="absolute w-20 h-20 rounded-full bg-mama-coral/20 animate-pulse-ring" style="animation-delay: 300ms;" />
        <div class="absolute w-16 h-16 rounded-full bg-mama-coral/25 animate-pulse-ring" style="animation-delay: 600ms;" />
        <!-- Mic circle -->
        <div class="relative w-14 h-14 rounded-full bg-mama-coral flex items-center justify-center shadow-lg">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
        </div>
      </div>

      <!-- Speaking state: animated wave bars -->
      <div v-else class="relative flex items-center justify-center w-24 h-24">
        <!-- Outer glow ring -->
        <div class="absolute w-24 h-24 rounded-full bg-mama-teal/10 animate-pulse-ring" style="animation-delay: 0ms;" />
        <!-- Teal circle with wave bars inside -->
        <div class="relative w-14 h-14 rounded-full bg-gradient-to-br from-mama-teal to-mama-teal-light flex items-center justify-center shadow-lg gap-0.5">
          <div v-for="n in 5" :key="n"
            class="w-0.5 bg-white rounded-full animate-wave-bar"
            :style="{ height: '14px', animationDelay: `${(n - 1) * 120}ms` }" />
        </div>
      </div>

      <!-- Status text -->
      <div class="text-center">
        <p class="text-base font-semibold text-mama-text">
          {{ isRecording ? t('chat.listening') : t('chat.speaking') }}
        </p>
        <!-- Transcript preview during recording -->
        <p v-if="isRecording && transcript" class="mt-2 text-sm text-mama-muted italic line-clamp-2 max-w-[220px]">
          "{{ transcript }}"
        </p>
      </div>

      <!-- Stop button -->
      <button
        @click="$emit('stop')"
        class="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95"
        :class="isRecording
          ? 'bg-mama-coral text-white hover:bg-mama-coral-dark'
          : 'bg-mama-teal text-white hover:bg-mama-teal-dark'"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <rect x="6" y="6" width="12" height="12" rx="2"/>
        </svg>
        {{ t('chat.stopVoice') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  isRecording: boolean
  isSpeaking: boolean
  transcript: string
}>()

defineEmits<{
  stop: []
}>()

const { t } = useI18n()
</script>
