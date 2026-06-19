<template>
  <section id="features" class="py-16 sm:py-20 px-4 sm:px-6 bg-mama-bg">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10 sm:mb-14">
        <div class="inline-flex items-center gap-2 bg-mama-sky text-mama-teal px-4 py-2 rounded-full text-sm font-semibold mb-4">
          ✨ Core Features
        </div>
        <h2 class="text-fluid-4xl font-black text-mama-text mb-4">
          Everything a Mother Needs,<br class="hidden sm:block" />
          <span class="text-mama-teal">All in One Place</span>
        </h2>
        <p class="text-fluid-lg text-mama-muted max-w-xl mx-auto">
          From pregnancy tracking to newborn care — MamaVoice guides you every step of the way.
        </p>
      </div>

      <!-- Feature grid: 1 col → 2 col (sm) → 3 col (lg) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="(feature, i) in features"
          :key="feature.title"
          class="bg-mama-surface rounded-3xl p-5 sm:p-6 shadow-soft hover:shadow-soft-hover transition-all duration-300 group cursor-default"
          :style="{ animationDelay: `${i * 80}ms` }"
        >
          <!-- Icon -->
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 text-xl sm:text-2xl transition-all duration-300 group-hover:scale-110"
            :style="{ backgroundColor: isDark ? feature.iconBgDark : feature.iconBg }"
          >
            {{ feature.emoji }}
          </div>
          <h3 class="text-base sm:text-lg font-bold text-mama-text mb-2">{{ feature.title }}</h3>
          <p class="text-mama-muted text-sm leading-relaxed">{{ feature.desc }}</p>
          <!-- Tag -->
          <div class="mt-4">
            <span
              class="text-xs font-semibold px-3 py-1 rounded-full"
              :style="{ backgroundColor: isDark ? feature.tagBgDark : feature.tagBg, color: feature.tagColor }"
            >
              {{ feature.tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { isDark } = useColorMode()

const features = [
  {
    emoji: '🎙️',
    title: 'Voice-First Consultations',
    desc: 'Speak naturally in Yoruba, Hausa, Igbo, or English — our AI understands and responds in your language with trusted medical guidance.',
    tag: 'Multilingual AI',
    iconBg: '#E3F2FD', iconBgDark: '#0F2922',
    tagColor: '#14B8A6', tagBg: '#E3F2FD', tagBgDark: '#0F2922',
  },
  {
    emoji: '🏥',
    title: 'Specialist Connect',
    desc: 'Instant access to verified OBGYNs, midwives, and pediatricians across Nigeria for virtual or in-person consultations.',
    tag: '50+ Doctors',
    iconBg: '#F0FDF4', iconBgDark: '#0A2318',
    tagColor: '#81C784', tagBg: '#F0FDF4', tagBgDark: '#0A2318',
  },
  {
    emoji: '📊',
    title: 'Health Tracking',
    desc: 'Monitor blood pressure, weight, baby movements, and key milestones automatically throughout your pregnancy journey.',
    tag: 'Real-Time',
    iconBg: '#F5F3FF', iconBgDark: '#1A1040',
    tagColor: '#7C3AED', tagBg: '#F5F3FF', tagBgDark: '#1A1040',
  },
  {
    emoji: '🌿',
    title: 'Nutrition Guidance',
    desc: 'Personalized meal plans featuring local Nigerian foods rich in folate, iron, and protein — foods you actually know and love.',
    tag: 'Local Foods',
    iconBg: '#E3F2FD', iconBgDark: '#0F2922',
    tagColor: '#14B8A6', tagBg: '#E3F2FD', tagBgDark: '#0F2922',
  },
  {
    emoji: '💉',
    title: 'Vaccination Monitor',
    desc: 'Never miss a prenatal or newborn vaccine. Get smart reminders with a full timeline for mother and baby.',
    tag: 'WHO Schedule',
    iconBg: '#FFF7ED', iconBgDark: '#1A0F0A',
    tagColor: '#FF8A65', tagBg: '#FFF7ED', tagBgDark: '#1A0F0A',
  },
  {
    emoji: '🤱',
    title: 'Newborn Care',
    desc: 'Evidence-based guidance for breastfeeding, cord care, diaper rash, fever response, and early childhood milestones.',
    tag: 'Pediatric Care',
    iconBg: '#FDF2F8', iconBgDark: '#1A0A15',
    tagColor: '#EC4899', tagBg: '#FDF2F8', tagBgDark: '#1A0A15',
  },
]
</script>
