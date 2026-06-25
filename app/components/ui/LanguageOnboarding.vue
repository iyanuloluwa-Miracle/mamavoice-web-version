<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        id="language-onboarding-overlay"
        class="fixed inset-0 z-[9999] flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label="Choose your language"
      >
        <!-- Backdrop with blurred gradient -->
        <div class="absolute inset-0 onboarding-backdrop" aria-hidden="true" />

        <!-- Content card -->
        <Transition
          enter-active-class="transition-all duration-500 ease-out delay-150"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-250 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="visible"
            class="relative z-10 w-[92vw] max-w-lg mx-auto px-6 py-8 sm:px-10 sm:py-10 rounded-3xl onboarding-card"
          >
            <!-- Logo + branding -->
            <div class="flex flex-col items-center mb-6">
              <div class="flex items-center gap-2.5 mb-3">
                <img
                  src="/mamavoiceLogo.png"
                  alt="MamaVoice logo"
                  class="w-12 h-12 sm:w-14 sm:h-14"
                />
                <span class="text-2xl sm:text-3xl font-black text-mama-coral">
                  MamaVoice
                </span>
              </div>

              <!-- Rotating welcome greeting -->
              <div class="h-10 sm:h-12 flex items-center justify-center overflow-hidden">
                <Transition
                  mode="out-in"
                  enter-active-class="transition-all duration-400 ease-out"
                  enter-from-class="opacity-0 translate-y-3"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition-all duration-250 ease-in"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 -translate-y-3"
                >
                  <h1
                    :key="currentGreetingIndex"
                    class="text-fluid-3xl sm:text-fluid-4xl font-black text-center bg-gradient-to-r from-mama-teal to-mama-teal-light bg-clip-text text-transparent"
                  >
                    {{ greetings[currentGreetingIndex].text }}
                  </h1>
                </Transition>
              </div>

              <!-- Subtitle -->
              <p class="text-sm sm:text-base text-mama-muted text-center mt-2 font-medium">
                MamaVoice speaks your language
              </p>
            </div>

            <!-- "Choose your language" label with pulse -->
            <p class="text-xs sm:text-sm font-bold text-mama-teal uppercase tracking-widest text-center mb-4 onboarding-pulse">
              Choose your language
            </p>

            <!-- Language cards 2×2 grid -->
            <div class="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
              <button
                v-for="(lang, index) in languages"
                :key="lang.code"
                :id="`lang-card-${lang.code}`"
                @click="selectLanguage(lang.code)"
                class="lang-card group relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer"
                :class="[
                  selectedLang === lang.code
                    ? 'border-mama-teal bg-mama-sky dark:bg-mama-teal/15 shadow-lg scale-[1.02]'
                    : 'border-mama-border bg-mama-surface hover:border-mama-teal-light hover:shadow-md hover:scale-[1.01]',
                  `card-entrance-${index}`
                ]"
                :style="{ animationDelay: `${300 + index * 100}ms` }"
              >
                <!-- Selection checkmark -->
                <Transition
                  enter-active-class="transition-all duration-300 ease-out"
                  enter-from-class="opacity-0 scale-0"
                  enter-to-class="opacity-100 scale-100"
                  leave-active-class="transition-all duration-200 ease-in"
                  leave-from-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-0"
                >
                  <div
                    v-if="selectedLang === lang.code"
                    class="absolute top-2 right-2 w-6 h-6 rounded-full bg-mama-teal flex items-center justify-center"
                  >
                    <svg class="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                </Transition>

                <!-- Cultural accent stripe -->
                <div
                  class="w-10 h-1 rounded-full mb-3 transition-all duration-300"
                  :class="lang.accentClass"
                />

                <!-- Language name (native) -->
                <span class="text-base sm:text-lg font-bold text-mama-text mb-0.5 transition-colors">
                  {{ lang.nativeName }}
                </span>

                <!-- Greeting in that language -->
                <span class="text-xs sm:text-sm text-mama-muted font-medium">
                  {{ lang.greeting }}
                </span>
              </button>
            </div>

            <!-- Continue button -->
            <Transition
              enter-active-class="transition-all duration-400 ease-out"
              enter-from-class="opacity-0 translate-y-3"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <button
                v-if="selectedLang"
                id="onboarding-continue-btn"
                @click="handleContinue"
                class="w-full py-4 rounded-2xl bg-gradient-to-r from-mama-teal to-mama-teal-light text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 onboarding-shimmer"
              >
                Continue →
              </button>
            </Transition>

            <!-- Powered by note -->
            <p class="text-[10px] sm:text-xs text-mama-muted/60 text-center mt-4 font-medium">
              You can always change your language later
            </p>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { setLocale } = useI18n()

const selectedLang = ref<string | null>(null)
const currentGreetingIndex = ref(0)
let greetingInterval: ReturnType<typeof setInterval> | null = null

// Greetings that rotate in the header
const greetings = [
  { text: 'Welcome', lang: 'en' },
  { text: 'Ẹ kú àbọ̀', lang: 'yo' },
  { text: 'Barka da zuwa', lang: 'ha' },
  { text: 'Nnọọ', lang: 'ig' },
  { text: 'Bawo o, Mama', lang: 'pcm' },
]

// Language card data — static, doesn't need i18n since these are always in native language
const languages = [
  {
    code: 'en',
    nativeName: 'English',
    greeting: 'Hello, Mama!',
    accentClass: 'bg-mama-teal',
  },
  {
    code: 'yo',
    nativeName: 'Yorùbá',
    greeting: 'Báwo ni, Mama!',
    accentClass: 'bg-amber-500',
  },
  {
    code: 'ha',
    nativeName: 'Hausa',
    greeting: 'Sannu, Mama!',
    accentClass: 'bg-emerald-500',
  },
  {
    code: 'ig',
    nativeName: 'Igbo',
    greeting: 'Ndewo, Mama!',
    accentClass: 'bg-mama-coral',
  },
  {
    code: 'pcm',
    nativeName: 'Naija',
    greeting: 'Bawo o, Mama!',
    accentClass: 'bg-orange-500',
  },
]

function selectLanguage(code: string) {
  selectedLang.value = code
}

function handleContinue() {
  if (!selectedLang.value) return
  setLocale(selectedLang.value)
  emit('close')
}

// Rotate greetings
function startGreetingRotation() {
  greetingInterval = setInterval(() => {
    currentGreetingIndex.value = (currentGreetingIndex.value + 1) % greetings.length
  }, 2500)
}

function stopGreetingRotation() {
  if (greetingInterval) {
    clearInterval(greetingInterval)
    greetingInterval = null
  }
}

// Lock/unlock body scroll
watch(
  () => props.visible,
  (isVisible) => {
    if (typeof window === 'undefined') return
    document.body.style.overflow = isVisible ? 'hidden' : ''
  },
  { immediate: true }
)

onMounted(() => {
  if (props.visible) {
    startGreetingRotation()
  }
})

watch(
  () => props.visible,
  (isVisible) => {
    if (isVisible) {
      startGreetingRotation()
    } else {
      stopGreetingRotation()
    }
  }
)

onUnmounted(() => {
  stopGreetingRotation()
  if (typeof window !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* ── Backdrop ── */
.onboarding-backdrop {
  background: linear-gradient(
    135deg,
    rgba(0, 137, 123, 0.15) 0%,
    rgba(0, 105, 92, 0.08) 30%,
    rgba(250, 250, 250, 0.95) 50%,
    rgba(227, 242, 253, 0.4) 70%,
    rgba(255, 138, 101, 0.1) 100%
  );
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
}

:where(.dark) .onboarding-backdrop {
  background: linear-gradient(
    135deg,
    rgba(0, 137, 123, 0.12) 0%,
    rgba(15, 23, 42, 0.97) 50%,
    rgba(255, 138, 101, 0.06) 100%
  );
}

/* ── Card ── */
.onboarding-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px) saturate(1.5);
  -webkit-backdrop-filter: blur(24px) saturate(1.5);
  box-shadow:
    0 32px 64px rgba(0, 137, 123, 0.12),
    0 8px 24px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 137, 123, 0.08);
}

:where(.dark) .onboarding-card {
  background: rgba(30, 41, 59, 0.9);
  box-shadow:
    0 32px 64px rgba(0, 0, 0, 0.5),
    0 8px 24px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* ── Pulsing label ── */
.onboarding-pulse {
  animation: onboardingPulse 2.5s ease-in-out infinite;
}

@keyframes onboardingPulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

/* ── Lang cards entrance ── */
.lang-card {
  animation: cardFadeInUp 0.5s ease-out both;
}

@keyframes cardFadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Shimmer on continue button ── */
.onboarding-shimmer {
  position: relative;
  overflow: hidden;
}

.onboarding-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: shimmerSlide 3s ease-in-out infinite;
}

@keyframes shimmerSlide {
  0% { left: -100%; }
  50% { left: 120%; }
  100% { left: 120%; }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .onboarding-pulse,
  .lang-card,
  .onboarding-shimmer::after {
    animation: none;
  }
  .onboarding-pulse { opacity: 1; }
  .lang-card { opacity: 1; transform: none; }
}
</style>
