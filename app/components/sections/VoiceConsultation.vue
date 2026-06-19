<template>
  <section class="bg-mama-dark py-20 px-4 overflow-hidden">
    <div class="max-w-6xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-14">
        <div class="inline-flex items-center gap-2 bg-mama-teal/20 text-mama-teal-light px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
          Live Voice Consultation
        </div>
        <h2 class="text-3xl md:text-4xl font-black text-white mb-4">
          Ask Anything, Anytime,<br class="hidden sm:block" />
          <span class="text-mama-teal-light">In Your Language</span>
        </h2>
        <p class="text-white/50 text-lg max-w-xl mx-auto">
          MamaVoice understands Yoruba, Hausa, Igbo, and English — responding with trusted medical guidance instantly.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left: Conversation -->
        <div class="space-y-4">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="flex animate-fade-in-up"
            :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
            :style="{ animationDelay: `${i * 200}ms` }"
          >
            <div v-if="msg.role === 'ai'" class="w-8 h-8 rounded-full bg-mama-coral flex items-center justify-center flex-shrink-0 mr-3 mt-1">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              </svg>
            </div>
            <div class="max-w-sm">
              <div class="text-xs mb-1.5" :class="msg.role === 'user' ? 'text-right text-white/40' : 'text-white/40'">
                {{ msg.role === 'user' ? 'You' : 'MamaVoice' }} · {{ msg.time }}
              </div>
              <div
                class="px-5 py-3.5 rounded-3xl text-sm leading-relaxed"
                :class="msg.role === 'user'
                  ? 'bg-mama-teal text-white rounded-br-sm'
                  : 'bg-mama-dark-card text-gray-200 rounded-bl-sm border border-white/5'"
              >
                {{ msg.text }}
              </div>
            </div>
          </div>

          <!-- Audio playback controls -->
          <div class="flex items-center gap-3 mt-6 p-4 bg-mama-dark-card rounded-2xl border border-white/5">
            <button class="w-10 h-10 rounded-full bg-mama-teal flex items-center justify-center hover:bg-mama-teal-dark transition-colors flex-shrink-0">
              <svg class="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <div class="flex-1">
              <div class="flex items-end gap-0.5 h-8 mb-1">
                <div
                  v-for="(h, i) in waveHeights"
                  :key="i"
                  class="flex-1 bg-mama-teal/40 rounded-sm"
                  :style="{ height: `${h}%` }"
                />
              </div>
              <div class="flex justify-between text-[10px] text-white/30">
                <span>0:04</span>
                <span>0:18</span>
              </div>
            </div>
            <span class="text-xs text-white/40 flex-shrink-0">EN</span>
          </div>
        </div>

        <!-- Right: Animated mic -->
        <div class="flex flex-col items-center gap-8">
          <UiAnimatedMic :is-active="isRecording" size="md" @toggle="toggleRecording" />
          <UiVoiceWave :is-active="isRecording" size="md" color="white" />

          <div class="text-center">
            <p class="text-white/60 text-sm mb-1">
              {{ isRecording ? 'Listening... speak now' : 'Tap the mic to speak' }}
            </p>
            <p class="text-white/30 text-xs">Supports Yoruba · Hausa · Igbo · English</p>
          </div>

          <!-- Language tags -->
          <div class="flex flex-wrap justify-center gap-2">
            <span v-for="lang in languages" :key="lang.code" class="px-3 py-1.5 bg-white/10 hover:bg-mama-teal/30 rounded-full text-xs text-white/70 font-medium cursor-pointer transition-colors">
              {{ lang.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const isRecording = ref(false)
const toggleRecording = () => { isRecording.value = !isRecording.value }

const messages = [
  {
    role: 'user',
    text: 'I am 28 weeks pregnant and my legs are swollen. What should I do?',
    time: '9:02 AM'
  },
  {
    role: 'ai',
    text: 'Mild swelling during pregnancy is common and usually harmless. Try to rest with your feet elevated, drink plenty of water, and avoid standing for long periods. However, if you experience sudden severe swelling, headaches, or blurred vision, please visit a clinic immediately as these can be signs of preeclampsia.',
    time: '9:02 AM'
  },
  {
    role: 'user',
    text: 'Thank you. What iron-rich foods can I eat?',
    time: '9:03 AM'
  },
]

const waveHeights = [30, 60, 45, 80, 55, 70, 40, 90, 65, 75, 50, 85, 35, 70, 45, 60, 80, 40, 65, 55]

const languages = [
  { code: 'en', label: '🇳🇬 English' },
  { code: 'yo', label: 'Yorùbá' },
  { code: 'ha', label: 'Hausa' },
  { code: 'ig', label: 'Igbo' },
]
</script>
