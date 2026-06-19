<template>
  <section id="download" class="py-20 px-4 bg-mama-bg">
    <div class="max-w-6xl mx-auto">
      <div class="bg-mama-surface rounded-[2rem] shadow-soft overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <!-- Left: Text & buttons -->
          <div class="p-10 lg:p-14 flex flex-col justify-center">
            <div class="inline-flex items-center gap-2 bg-mama-sky text-mama-teal px-4 py-2 rounded-full text-sm font-semibold mb-6 w-fit">
              📱 Download the App
            </div>

            <h2 class="text-3xl lg:text-4xl font-black text-mama-text mb-4 leading-tight">
              Take MamaVoice<br />
              <span class="text-mama-teal">Everywhere You Go</span>
            </h2>

            <p class="text-mama-muted text-base mb-8 leading-relaxed max-w-md">
              Get the full experience with personalized health tracking, vaccination reminders, offline voice support, and more — available on Android and iPhone.
            </p>

            <!-- App store buttons -->
            <div class="flex flex-col sm:flex-row gap-4 mb-8">
              <!-- App Store -->
              <a
                href="#"
                class="flex items-center gap-3 bg-mama-dark text-white px-6 py-4 rounded-2xl hover:bg-mama-dark/90 transition-all hover:scale-105 shadow-md"
              >
                <svg class="w-7 h-7 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div class="text-[10px] text-white/60 leading-none mb-0.5">Download on the</div>
                  <div class="text-base font-bold leading-none">App Store</div>
                </div>
              </a>

              <!-- Google Play -->
              <a
                href="#"
                class="flex items-center gap-3 bg-mama-dark text-white px-6 py-4 rounded-2xl hover:bg-mama-dark/90 transition-all hover:scale-105 shadow-md"
              >
                <svg class="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M3.18 23.76c.39.22.83.24 1.24.07l12.1-6.99-2.56-2.56-10.78 9.48z" fill="#EA4335"/>
                  <path d="M20.82 10.07L17.48 8.1 14.65 10.7l2.83 2.83 3.35-1.96c.96-.56.96-1.95-.01-2.5z" fill="#FBBC04"/>
                  <path d="M4.42.24C4.01.07 3.57.09 3.18.31L14.65 11.7l2.83-2.83L4.42.24z" fill="#4285F4"/>
                  <path d="M3.18.31C2.45.74 2 1.5 2 2.41v19.18c0 .91.45 1.67 1.18 2.1L14.65 12 3.18.31z" fill="#34A853"/>
                </svg>
                <div>
                  <div class="text-[10px] text-white/60 leading-none mb-0.5">Get it on</div>
                  <div class="text-base font-bold leading-none">Google Play</div>
                </div>
              </a>
            </div>

            <!-- Continue on web -->
            <div class="flex items-center gap-3 pt-6 border-t border-mama-border-light">
              <svg class="w-5 h-5 text-mama-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
              </svg>
              <span class="text-mama-muted text-sm">Or</span>
              <NuxtLink to="/chat" class="text-mama-teal font-semibold text-sm hover:underline">
                Continue on Web →
              </NuxtLink>
            </div>
          </div>

          <!-- Right: QR + decorative -->
          <div class="bg-gradient-to-br from-mama-sky/40 to-mama-teal/10 p-10 lg:p-14 flex flex-col items-center justify-center gap-8">
            <!-- QR code placeholder -->
            <div class="bg-mama-surface rounded-2xl p-5 shadow-soft">
              <div class="w-40 h-40 relative">
                <!-- Decorative QR pattern -->
                <div class="grid grid-cols-7 grid-rows-7 gap-1 w-full h-full">
                  <div v-for="(cell, i) in qrPattern" :key="i"
                    class="rounded-sm"
                    :class="cell ? 'bg-mama-dark' : 'bg-transparent'"
                  />
                </div>
                <!-- Center logo overlay -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-10 h-10 bg-mama-surface rounded-lg flex items-center justify-center shadow-sm">
                    <span class="text-mama-teal font-black text-xs">MV</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center">
              <p class="text-mama-text font-bold text-lg mb-1">Scan to Download</p>
              <p class="text-mama-muted text-sm">Available for iOS & Android</p>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4 w-full max-w-xs">
              <div v-for="stat in appStats" :key="stat.label" class="text-center bg-mama-surface/70 dark:bg-slate-800/70 rounded-2xl p-3 shadow-soft-sm">
                <div class="text-xl font-black text-mama-teal">{{ stat.value }}</div>
                <div class="text-[10px] text-mama-muted">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const appStats = [
  { value: '4.9', label: 'App Store' },
  { value: '10K+', label: 'Downloads' },
  { value: '50+', label: 'Doctors' },
]

const qrPattern = [
  1,1,1,1,1,1,1,
  1,0,0,0,0,0,1,
  1,0,1,0,1,0,1,
  1,0,0,1,0,0,1,
  1,0,1,0,1,0,1,
  1,0,0,0,0,0,1,
  1,1,1,1,1,1,1,
]
</script>
