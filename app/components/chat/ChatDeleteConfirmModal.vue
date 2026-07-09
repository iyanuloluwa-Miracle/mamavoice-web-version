<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        @click.self="$emit('cancel')"
      >
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-2"
        >
          <div
            v-if="visible"
            class="bg-mama-surface rounded-3xl shadow-2xl border border-mama-border-light w-full max-w-sm p-6 relative"
            role="alertdialog"
            aria-modal="true"
          >
            <!-- Icon -->
            <div class="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v13a1 1 0 01-1 1H8a1 1 0 01-1-1V7h10z"/>
              </svg>
            </div>

            <h2 class="text-xl font-bold text-mama-text mb-2">{{ t('chat.deleteConversationTitle') }}</h2>
            <p class="text-sm text-mama-muted leading-relaxed mb-6">{{ t('chat.deleteConversationBody') }}</p>

            <div class="flex gap-3">
              <button
                @click="$emit('cancel')"
                class="flex-1 py-3 rounded-2xl border-2 border-mama-border text-mama-text font-semibold text-sm hover:bg-mama-input transition-all"
              >
                {{ t('chat.deleteConversationCancel') }}
              </button>
              <button
                @click="$emit('confirm')"
                class="flex-1 py-3 rounded-2xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-all shadow-sm"
              >
                {{ t('chat.deleteConversationConfirm') }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{ visible: boolean }>()
defineEmits<{ confirm: []; cancel: [] }>()
</script>
