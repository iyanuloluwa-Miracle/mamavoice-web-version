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
        @click.self="$emit('close')"
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
          >
            <!-- Close -->
            <button
              @click="$emit('close')"
              class="absolute top-4 right-4 w-8 h-8 rounded-full text-mama-muted hover:text-mama-text hover:bg-mama-input transition-colors flex items-center justify-center"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <!-- Icon -->
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-mama-teal to-mama-teal-light flex items-center justify-center mb-4 shadow-soft">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </div>

            <h2 class="text-xl font-bold text-mama-text mb-2">{{ t('auth.authModalHeading') }}</h2>
            <p class="text-sm text-mama-muted leading-relaxed mb-6">{{ t('auth.authModalBody') }}</p>

            <div class="flex flex-col gap-3">
              <NuxtLink
                to="/auth/register"
                @click="$emit('close')"
                class="w-full py-3 rounded-2xl bg-mama-teal text-white font-semibold text-sm text-center hover:bg-mama-teal-dark transition-all shadow-sm"
              >
                {{ t('auth.authModalSignUp') }}
              </NuxtLink>
              <NuxtLink
                to="/auth/login"
                @click="$emit('close')"
                class="w-full py-3 rounded-2xl border-2 border-mama-teal text-mama-teal font-semibold text-sm text-center hover:bg-mama-sky transition-all"
              >
                {{ t('auth.authModalSignIn') }}
              </NuxtLink>
              <button
                @click="$emit('close')"
                class="text-xs text-mama-muted hover:text-mama-text transition-colors mt-1"
              >
                {{ t('auth.authModalGuest') }}
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
defineEmits<{ close: [] }>()
</script>
