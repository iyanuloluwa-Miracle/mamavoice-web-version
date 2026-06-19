<template>
  <section id="specialists" class="py-16 sm:py-20 px-4 sm:px-6 bg-mama-surface-section">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8 sm:mb-12">
        <div class="inline-flex items-center gap-2 bg-mama-sky text-mama-teal px-4 py-2 rounded-full text-sm font-semibold mb-4">
          🏥 Specialist Directory
        </div>
        <h2 class="text-fluid-4xl font-black text-mama-text mb-4">
          Connect with Verified<br class="hidden sm:block" />
          <span class="text-mama-teal">Maternal Health Experts</span>
        </h2>
        <p class="text-fluid-lg text-mama-muted max-w-xl mx-auto">
          Browse trusted nurses, midwives, and doctors. Book virtual consultations right from the app.
        </p>
      </div>

      <!-- Specialty filter chips — horizontal scroll on mobile -->
      <div class="scroll-x flex gap-2 pb-2 mb-6 sm:mb-8 sm:flex-wrap sm:justify-center sm:overflow-visible">
        <button
          v-for="specialty in specialties"
          :key="specialty"
          @click="activeSpecialty = specialty"
          class="scroll-snap-start flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap"
          :class="activeSpecialty === specialty
            ? 'bg-mama-teal text-white shadow-sm'
            : 'bg-mama-surface text-mama-muted border border-mama-border hover:border-mama-teal hover:text-mama-teal'"
        >
          {{ specialty }}
        </button>
      </div>

      <!-- Specialist cards: 1 col → 2 col (sm) → 4 col (lg) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          v-for="specialist in filteredSpecialists"
          :key="specialist.name"
          class="bg-mama-bg rounded-3xl p-5 sm:p-6 shadow-soft hover:shadow-soft-hover transition-all duration-300 flex flex-col"
        >
          <!-- Avatar row -->
          <div class="flex items-start justify-between mb-4">
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0"
              :class="specialist.avatarBg"
            >
              {{ specialist.initials }}
            </div>
            <span
              class="text-xs px-2.5 py-1 rounded-full font-semibold"
              :class="specialist.available
                ? 'bg-green-100 dark:bg-green-900/30 text-mama-green dark:text-green-400'
                : 'bg-mama-input text-mama-muted'"
            >
              {{ specialist.available ? '● Online' : '○ Busy' }}
            </span>
          </div>

          <h3 class="font-bold text-mama-text text-sm sm:text-base leading-tight mb-1">{{ specialist.name }}</h3>
          <p class="text-mama-muted text-xs mb-3">{{ specialist.specialty }}</p>

          <!-- Star rating -->
          <div class="flex items-center gap-1.5 mb-3">
            <span class="text-yellow-400 text-sm">★★★★★</span>
            <span class="text-xs font-bold text-mama-text">{{ specialist.rating }}</span>
            <span class="text-xs text-mama-muted">({{ specialist.reviews }})</span>
          </div>

          <!-- Tags — horizontal scroll on very small cards -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span
              v-for="tag in specialist.tags"
              :key="tag"
              class="text-[10px] px-2 py-0.5 bg-mama-sky text-mama-teal rounded-full font-medium whitespace-nowrap"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Next slot -->
          <div class="text-xs text-mama-muted mb-4 flex items-center gap-1.5 mt-auto">
            <svg class="w-3.5 h-3.5 text-mama-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            {{ specialist.nextSlot }}
          </div>

          <!-- Book CTA -->
          <button class="w-full py-3 bg-mama-teal text-white rounded-2xl font-semibold text-sm hover:bg-mama-teal-dark transition-colors active:scale-[0.98]">
            Book Consultation
          </button>
        </div>
      </div>

      <!-- View all CTA -->
      <div class="text-center mt-8 sm:mt-10">
        <button class="inline-flex items-center gap-2 border-2 border-mama-teal text-mama-teal px-6 sm:px-8 py-3.5 rounded-full font-bold hover:bg-mama-sky transition-all text-sm sm:text-base">
          View All 50+ Specialists
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const specialties = ['All', 'OBGYN', 'Midwife', 'Pediatrician', 'Nutritionist', 'Mental Health']
const activeSpecialty = ref('All')

const specialists = [
  {
    initials: 'AO', avatarBg: 'bg-mama-teal',
    name: 'Dr. Aisha Okafor', specialty: 'Obstetrician & Gynecologist',
    rating: 4.9, reviews: 342, available: true, nextSlot: 'Today 2:00 PM',
    tags: ['High-Risk Pregnancy', 'IVF'], category: 'OBGYN',
  },
  {
    initials: 'EM', avatarBg: 'bg-mama-coral',
    name: 'Midwife Emeka Musa', specialty: 'Certified Nurse-Midwife',
    rating: 4.8, reviews: 218, available: true, nextSlot: 'Today 4:30 PM',
    tags: ['Natural Birth', 'Postpartum'], category: 'Midwife',
  },
  {
    initials: 'FN', avatarBg: 'bg-mama-green',
    name: 'Dr. Fatima Nwosu', specialty: 'Pediatrician',
    rating: 4.9, reviews: 401, available: false, nextSlot: 'Tomorrow 10:00 AM',
    tags: ['Newborn Care', 'Vaccinations'], category: 'Pediatrician',
  },
  {
    initials: 'BI', avatarBg: 'bg-purple-400',
    name: 'Dr. Bisi Ibrahim', specialty: 'Prenatal Nutritionist',
    rating: 4.7, reviews: 156, available: true, nextSlot: 'Today 6:00 PM',
    tags: ['Prenatal Nutrition', 'Anaemia'], category: 'Nutritionist',
  },
]

const filteredSpecialists = computed(() =>
  activeSpecialty.value === 'All'
    ? specialists
    : specialists.filter(s => s.category === activeSpecialty.value)
)
</script>
