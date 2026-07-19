<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8 bg-mama-surface relative overflow-hidden">
    <!-- Subtle glow background blobs -->
    <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div class="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-mama-teal/10 to-transparent rounded-full blur-3xl opacity-60" />
      <div class="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-gradient-to-bl from-mama-coral/5 to-transparent rounded-full blur-2xl opacity-55" />
    </div>

    <div class="max-w-5xl mx-auto">
      <div class="bg-gradient-to-br from-mama-teal/5 via-mama-sky/10 to-mama-coral/5 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/50 rounded-3xl p-8 sm:p-12 border border-mama-teal/10 dark:border-slate-700/50 shadow-soft-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-8 lg:gap-12 animate-fade-in-up">
        
        <!-- Background Accent Graphic -->
        <div class="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none select-none">
          <svg class="w-64 h-64 text-mama-teal" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        <!-- Left: Text content -->
        <div class="flex-1 text-center md:text-left relative z-10">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mama-teal/10 dark:bg-mama-teal/20 text-mama-teal font-semibold text-xs mb-4">
            <span>💝</span> Support Our Mission
          </span>
          <h2 class="text-3xl sm:text-4xl font-black text-mama-text leading-tight mb-4">
            Help Us Keep MamaVoice Free for Every Mother
          </h2>
          <p class="text-base text-mama-muted leading-relaxed mb-6 max-w-xl">
            MamaVoice provides life-saving maternal and newborn health guidance to thousands of mothers in their local languages (Yoruba, Hausa, Igbo, Pidgin). Your donations help us support offline access, retain verified midwives, and keep the platform ads-free.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
            <NuxtLink
              to="/donate"
              class="inline-flex items-center justify-center gap-2 bg-mama-teal text-white px-8 py-3.5 rounded-full font-bold text-base shadow-md hover:bg-mama-teal-dark hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <span>💝</span> Donate to MamaVoice
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="inline-flex items-center justify-center gap-2 border-2 border-mama-border text-mama-text px-8 py-3 rounded-full font-bold text-base hover:bg-mama-sky/50 dark:hover:bg-slate-800 transition-all duration-300 w-full sm:w-auto"
            >
              Partner with Us
            </NuxtLink>
          </div>
        </div>

        <!-- Right: Small visual representation -->
        <div class="w-full md:w-auto flex-shrink-0 flex justify-center relative z-10">
          <div class="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl bg-white dark:bg-slate-800 border border-mama-border-light shadow-soft flex items-center justify-center p-6 animate-float">
            <!-- Interlocking maternal & donation representation -->
            <div class="flex flex-col items-center justify-center text-center gap-2">
              <div class="w-16 h-16 rounded-full bg-mama-sky/60 dark:bg-slate-700/50 flex items-center justify-center text-mama-teal">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <p class="text-xs font-bold text-mama-text leading-tight mt-1">MamaVoice Supporter</p>
              <p class="text-[10px] text-mama-muted">Keeping mothers and newborns safe</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No extra logic required for this static CTA section
</script>
