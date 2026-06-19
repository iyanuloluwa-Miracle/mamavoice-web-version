<template>
  <div class="h-screen flex flex-col bg-mama-bg overflow-hidden">
    <!-- Header -->
    <header class="bg-mama-surface border-b border-mama-border-light px-4 sm:px-6 flex items-center justify-between h-14 flex-shrink-0 shadow-sm">
      <NuxtLink to="/" class="flex items-center gap-1">
        <span class="text-xl font-black bg-gradient-to-r from-mama-teal to-mama-teal-light bg-clip-text text-transparent">Mama</span>
        <span class="text-xl font-black text-mama-coral">Voice</span>
        <span class="ml-2 text-xs font-semibold bg-mama-sky text-mama-teal px-2 py-0.5 rounded-full">AI</span>
      </NuxtLink>

      <div class="flex items-center gap-3">
        <!-- Language selector -->
        <div class="relative">
          <button
            @click="isLangOpen = !isLangOpen"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-mama-border text-sm font-medium text-mama-text hover:border-mama-teal hover:text-mama-teal transition-all"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            {{ selectedLang }}
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div v-if="isLangOpen" class="absolute right-0 mt-2 w-28 bg-mama-surface rounded-2xl shadow-lg border border-mama-border-light overflow-hidden z-50">
            <button
              v-for="lang in langs"
              :key="lang"
              @click="selectedLang = lang; isLangOpen = false"
              class="w-full px-4 py-2.5 text-left text-sm hover:bg-mama-sky hover:text-mama-teal transition-colors"
              :class="selectedLang === lang ? 'text-mama-teal font-semibold bg-mama-sky' : 'text-mama-text'"
            >
              {{ lang }}
            </button>
          </div>
        </div>

        <!-- Dark mode toggle -->
        <button
          @click="toggle"
          class="w-9 h-9 rounded-full flex items-center justify-center bg-mama-sky dark:bg-slate-800 text-mama-teal hover:scale-110 transition-all"
        >
          <svg v-if="!isDark" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <svg v-else class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"/>
            <path stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </button>

        <a
          href="/#download"
          class="hidden sm:flex items-center gap-2 bg-mama-teal text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-mama-teal-dark transition-all"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.37.74 3.19.8.96-.1 1.95-.8 3.2-.8 1.5.07 2.63.64 3.33 1.6-3.04 1.77-2.55 6.19.28 7.28zM13 3.5c-.55 2.29-2.48 4-4.33 3.88C8.37 5.04 10.5 3 13 3.5z"/>
          </svg>
          Download App
        </a>
      </div>
    </header>

    <!-- Conversation area -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto px-4 py-6">
      <div class="max-w-3xl mx-auto w-full space-y-1">

        <!-- Empty state -->
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
          <!-- Avatar -->
          <div class="w-20 h-20 rounded-3xl bg-gradient-to-br from-mama-teal to-mama-teal-light flex items-center justify-center shadow-md">
            <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-mama-text mb-2">Hi, I'm MamaVoice 👋</h2>
            <p class="text-mama-muted text-base max-w-sm">
              Your trusted AI health companion. Ask me anything about pregnancy, nutrition, newborn care, or vaccinations.
            </p>
          </div>

          <!-- Suggested prompts -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
            <button
              v-for="prompt in suggestedPrompts"
              :key="prompt.text"
              @click="sendSuggested(prompt.text)"
              class="flex items-start gap-3 bg-mama-surface rounded-2xl p-4 text-left shadow-soft hover:shadow-soft-hover hover:border-mama-teal border-2 border-transparent transition-all group"
            >
              <span class="text-xl flex-shrink-0">{{ prompt.emoji }}</span>
              <span class="text-sm font-medium text-mama-text group-hover:text-mama-teal transition-colors">{{ prompt.text }}</span>
            </button>
          </div>
        </div>

        <!-- Messages -->
        <template v-else>
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="flex items-end gap-3 mb-4"
            :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <!-- AI avatar -->
            <div v-if="msg.role === 'ai'" class="w-8 h-8 rounded-full bg-gradient-to-br from-mama-teal to-mama-teal-light flex items-center justify-center flex-shrink-0 mb-1">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              </svg>
            </div>

            <div class="max-w-[75%] sm:max-w-[65%]">
              <div
                class="px-4 py-3 text-sm leading-relaxed"
                :class="msg.role === 'user'
                  ? 'bg-mama-teal text-white rounded-3xl rounded-br-sm'
                  : 'bg-mama-surface text-mama-text rounded-3xl rounded-bl-sm shadow-soft-sm border border-mama-border-light'"
              >
                {{ msg.text }}
              </div>
              <div
                class="text-[11px] text-mama-muted mt-1.5 px-1"
                :class="msg.role === 'user' ? 'text-right' : 'text-left'"
              >
                {{ msg.time }}
              </div>
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="isTyping" class="flex items-end gap-3 mb-4">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-mama-teal to-mama-teal-light flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              </svg>
            </div>
            <div class="bg-mama-surface rounded-3xl rounded-bl-sm px-5 py-4 shadow-soft-sm border border-mama-border-light flex items-center gap-1.5">
              <div v-for="n in 3" :key="n" class="w-2 h-2 rounded-full bg-mama-teal/50 animate-typing-dot" :class="`anim-delay-${n * 100}`" />
            </div>
          </div>
        </template>

      </div>
    </div>

    <!-- Mobile nudge banner -->
    <div v-if="hasReplied" class="mx-4 mb-3">
      <div class="bg-mama-sky rounded-2xl px-4 py-3 flex items-center justify-between gap-3 max-w-3xl mx-auto">
        <div class="flex items-center gap-2 min-w-0">
          <span class="text-base flex-shrink-0">📱</span>
          <p class="text-xs text-mama-text font-medium truncate">
            Get your personalized health dashboard, vaccination reminders & more
          </p>
        </div>
        <a href="/#download" class="flex-shrink-0 text-xs font-bold text-mama-teal hover:text-mama-teal-dark whitespace-nowrap">
          Download App →
        </a>
      </div>
    </div>

    <!-- Input bar -->
    <div class="bg-mama-surface border-t border-mama-border-light px-4 py-3 flex-shrink-0">
      <div class="max-w-3xl mx-auto">
        <div class="flex items-end gap-3 bg-mama-input rounded-[1.5rem] border border-mama-border shadow-soft-sm px-4 py-3">
          <!-- Mic button -->
          <button
            @click="toggleRecording"
            class="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            :class="isRecording ? 'bg-mama-coral scale-110' : 'bg-mama-sky hover:bg-mama-teal hover:scale-105'"
          >
            <svg v-if="!isRecording" class="w-4 h-4 text-mama-teal" fill="currentColor" viewBox="0 0 24 24">
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
            placeholder="Ask MamaVoice anything… (Shift+Enter for new line)"
            class="flex-1 resize-none bg-transparent text-mama-text placeholder-mama-muted/60 text-sm leading-relaxed focus:outline-none min-h-[24px] max-h-32 overflow-y-auto"
          />

          <!-- Voice wave (when recording) -->
          <div v-if="isRecording" class="flex-shrink-0 flex items-center">
            <UiVoiceWave :is-active="true" size="sm" color="teal" />
          </div>

          <!-- Send button -->
          <button
            @click="sendMessage"
            :disabled="!inputText.trim() && !isRecording"
            class="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            :class="inputText.trim()
              ? 'bg-mama-teal hover:bg-mama-teal-dark hover:scale-105'
              : 'bg-mama-input cursor-not-allowed'"
          >
            <svg
              class="w-4 h-4"
              :class="inputText.trim() ? 'text-white' : 'text-mama-muted'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        <p class="text-center text-[10px] text-mama-muted mt-2">
          MamaVoice provides health education, not medical diagnosis. Always consult a doctor for emergencies.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useSeoMeta({
  title: 'MamaVoice AI Chat — Your Maternal Health Companion',
  description: 'Chat with MamaVoice AI for trusted pregnancy and newborn health guidance in Yoruba, Hausa, Igbo, or English.',
})

const { isDark, toggle } = useColorMode()

interface Message {
  role: 'user' | 'ai'
  text: string
  time: string
}

const messages = ref<Message[]>([])
const inputText = ref('')
const isTyping = ref(false)
const hasReplied = ref(false)
const isRecording = ref(false)
const isLangOpen = ref(false)
const selectedLang = ref('EN')
const langs = ['EN', 'YO', 'HA', 'IG']
const messagesContainer = ref<HTMLElement>()
const inputRef = ref<HTMLTextAreaElement>()

const suggestedPrompts = [
  { emoji: '🤰', text: "I'm 28 weeks pregnant and my legs are swollen. What should I do?" },
  { emoji: '🥦', text: 'What iron-rich Nigerian foods should I eat in my second trimester?' },
  { emoji: '💉', text: 'When is my Tetanus vaccine due during pregnancy?' },
  { emoji: '👶', text: 'My newborn won\'t stop crying at night. Is this normal?' },
]

const aiResponses: Record<string, string> = {
  swollen: 'Mild swelling (oedema) is very common in pregnancy, especially in the legs and feet after week 20. Elevate your feet when resting, drink at least 8 glasses of water daily, and avoid standing for long periods. Wear comfortable shoes and sleep on your left side. ⚠️ If you notice sudden severe swelling in your face or hands, or swelling with headaches or blurred vision, please visit a clinic immediately — this could be a sign of preeclampsia.',
  iron: 'Great question! Iron-rich Nigerian foods you can enjoy safely during pregnancy include:\n\n• Ugu (fluted pumpkin leaves) — one of the richest sources of iron in Nigerian cuisine\n• Moi Moi (steamed bean pudding) — packed with iron and protein\n• Liver — extremely high in iron (limit to once a week)\n• Ofada rice with vegetable stew\n• Ogbono soup with leafy greens\n\nPair these with Vitamin C foods (like oranges or tomatoes) to help your body absorb the iron better.',
  vaccine: 'The standard vaccination schedule for pregnant women in Nigeria includes:\n\n💉 Tetanus Toxoid 1 (TT1) — given at first antenatal visit\n💉 Tetanus Toxoid 2 (TT2) — given 4 weeks after TT1\n💉 TT Booster — if you had prior tetanus vaccinations\n\nYou may also receive the Influenza vaccine, especially during flu season. Always confirm your schedule with your healthcare provider at every antenatal visit.',
  cry: 'Newborn crying is completely normal and is their only way to communicate! Common reasons include:\n\n• Hunger (most common — try feeding)\n• Dirty diaper\n• Needs to be held/comforted\n• Overtired or overstimulated\n• Gas or tummy discomfort (try gentle tummy massages)\n\nMost babies cry 1–3 hours per day in the first few weeks. If your baby is inconsolable for over 3 hours, has a fever above 38°C, or isn\'t feeding well, please see a doctor right away.',
  pain: 'Back pain during pregnancy is very common, especially as your belly grows and your center of gravity shifts. Try these safe remedies:\n\n• Gentle prenatal yoga or stretching\n• Sleep on your left side with a pillow between your knees\n• Wear supportive, flat shoes\n• Apply a warm (not hot) compress to the painful area\n• Avoid lifting heavy objects\n\nIf the pain is severe, shooting down your leg, or accompanied by fever or urinary symptoms, please consult your doctor as it could indicate a more serious issue.',
  nausea: 'Morning sickness is very common in the first trimester, but some mothers experience it longer. Here\'s what can help:\n\n• Eat small, frequent meals throughout the day — don\'t let your stomach get empty\n• Try dry crackers, plain rice, or akamu (pap) first thing in the morning\n• Sip cold water or ginger tea slowly\n• Avoid spicy, fatty, or strongly-smelling foods\n• Get fresh air and rest when possible\n\nIf you\'re vomiting so much you can\'t keep food or water down (hyperemesis gravidarum), please see a doctor — you may need IV fluids.',
}

function getAiResponse(userText: string): string {
  const lower = userText.toLowerCase()
  if (lower.includes('swoll') || lower.includes('edema') || lower.includes('oedema') || lower.includes('leg')) return aiResponses.swollen
  if (lower.includes('iron') || lower.includes('food') || lower.includes('eat') || lower.includes('nutrition') || lower.includes('diet')) return aiResponses.iron
  if (lower.includes('vaccine') || lower.includes('vaccin') || lower.includes('tetanus') || lower.includes('injection')) return aiResponses.vaccine
  if (lower.includes('cry') || lower.includes('newborn') || lower.includes('baby') || lower.includes('infant')) return aiResponses.cry
  if (lower.includes('pain') || lower.includes('back') || lower.includes('ache')) return aiResponses.pain
  if (lower.includes('nausea') || lower.includes('vomit') || lower.includes('sick') || lower.includes('morning')) return aiResponses.nausea
  return "That's a great question. MamaVoice is here to support you every step of your pregnancy and newborn journey. For the most accurate guidance on your specific situation, I recommend:\n\n1. Speaking with one of our verified specialists in the app\n2. Attending your next antenatal clinic visit\n3. Calling your nearest health facility if you have urgent concerns\n\nIs there anything specific about pregnancy, nutrition, vaccinations, or newborn care I can help you with today?"
}

function getTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

async function sendMessage() {
  const text = inputText.value.trim()
  if (!text) return

  messages.value.push({ role: 'user', text, time: getTime() })
  inputText.value = ''
  resetTextarea()
  scrollToBottom()

  isTyping.value = true
  await new Promise(resolve => setTimeout(resolve, 1400))

  isTyping.value = false
  messages.value.push({ role: 'ai', text: getAiResponse(text), time: getTime() })
  hasReplied.value = true
  scrollToBottom()
}

async function sendSuggested(text: string) {
  inputText.value = text
  await nextTick()
  await sendMessage()
}

function toggleRecording() {
  isRecording.value = !isRecording.value
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
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`
  }
}

function resetTextarea() {
  const el = inputRef.value
  if (el) {
    el.style.height = 'auto'
  }
}
</script>
