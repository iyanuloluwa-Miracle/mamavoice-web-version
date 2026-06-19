<template>
  <section id="health" class="py-16 sm:py-20 px-4 sm:px-6 bg-mama-bg">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10 sm:mb-14">
        <div class="inline-flex items-center gap-2 bg-mama-sky text-mama-teal px-4 py-2 rounded-full text-sm font-semibold mb-4">
          📊 Health Dashboard
        </div>
        <h2 class="text-fluid-4xl font-black text-mama-text mb-4">
          Your Complete<br class="hidden sm:block" />
          <span class="text-mama-teal">Pregnancy Health Hub</span>
        </h2>
        <p class="text-fluid-lg text-mama-muted max-w-xl mx-auto">
          Track every metric that matters — all beautifully organised in your personal dashboard.
        </p>
      </div>

      <!-- Row 1: Pregnancy progress card (full width on mobile, 2-col on lg) + 2 stat cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">

        <!-- Pregnancy week — spans 2 cols always -->
        <div class="col-span-2 bg-gradient-to-br from-mama-teal to-mama-teal-dark rounded-3xl p-5 sm:p-6 text-white">
          <div class="flex items-start justify-between mb-4">
            <div>
              <div class="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Pregnancy Week</div>
              <div class="text-4xl sm:text-5xl font-black">28</div>
              <div class="text-white/80 text-sm mt-1">2nd Trimester · Week 3</div>
            </div>
            <div class="text-3xl sm:text-4xl">🤰</div>
          </div>
          <div class="h-2 bg-white/20 rounded-full overflow-hidden mb-2">
            <div class="h-full bg-white rounded-full" style="width: 70%" />
          </div>
          <div class="flex justify-between text-xs text-white/60">
            <span>Week 1</span>
            <span class="text-white font-semibold">70% complete</span>
            <span>Week 40</span>
          </div>
        </div>

        <!-- Blood pressure -->
        <div class="col-span-1 bg-mama-surface rounded-3xl p-4 sm:p-5 shadow-soft">
          <div class="flex items-center justify-between mb-2 sm:mb-3">
            <span class="text-xl sm:text-2xl">❤️</span>
            <span class="text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:py-1 bg-green-50 dark:bg-green-900/30 text-mama-green dark:text-green-400 rounded-full">Normal</span>
          </div>
          <div class="text-[10px] sm:text-xs text-mama-muted font-medium mb-1">Blood Pressure</div>
          <div class="text-lg sm:text-2xl font-black text-mama-text">118<span class="text-mama-muted font-normal text-sm sm:text-lg">/76</span></div>
          <div class="text-[9px] sm:text-xs text-mama-muted mt-1 hidden sm:block">mmHg · Last: 2h ago</div>
        </div>

        <!-- Weight -->
        <div class="col-span-1 bg-mama-surface rounded-3xl p-4 sm:p-5 shadow-soft">
          <div class="flex items-center justify-between mb-2 sm:mb-3">
            <span class="text-xl sm:text-2xl">⚖️</span>
            <span class="text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:py-1 bg-orange-50 dark:bg-orange-900/30 text-mama-coral dark:text-orange-400 rounded-full">+1.2kg</span>
          </div>
          <div class="text-[10px] sm:text-xs text-mama-muted font-medium mb-1">Weight</div>
          <div class="text-lg sm:text-2xl font-black text-mama-text">68<span class="text-mama-muted font-normal text-sm"> kg</span></div>
          <div class="text-[9px] sm:text-xs text-mama-muted mt-1 hidden sm:block">This month's gain</div>
        </div>
      </div>

      <!-- Row 2: Nutrition + Baby kicks + Medications -->
      <div class="grid grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div class="bg-mama-surface rounded-3xl p-4 sm:p-5 shadow-soft">
          <div class="flex items-center justify-between mb-2 sm:mb-3">
            <span class="text-xl sm:text-2xl">🍽️</span>
            <span class="text-[10px] text-mama-muted hidden sm:inline">Today</span>
          </div>
          <div class="text-[10px] sm:text-xs text-mama-muted font-medium mb-1">Nutrition</div>
          <div class="text-lg sm:text-2xl font-black text-mama-text">82<span class="text-mama-muted font-normal text-xs sm:text-base">/100</span></div>
          <div class="h-1.5 sm:h-2 bg-mama-input rounded-full mt-2">
            <div class="h-full bg-mama-green rounded-full" style="width: 82%" />
          </div>
        </div>

        <div class="bg-mama-surface rounded-3xl p-4 sm:p-5 shadow-soft">
          <div class="flex items-center justify-between mb-2 sm:mb-3">
            <span class="text-xl sm:text-2xl">👶</span>
            <span class="text-[10px] text-mama-muted hidden sm:inline">Today</span>
          </div>
          <div class="text-[10px] sm:text-xs text-mama-muted font-medium mb-1">Baby Kicks</div>
          <div class="text-lg sm:text-2xl font-black text-mama-text">12 <span class="text-mama-muted font-normal text-[9px] sm:text-xs">kicks</span></div>
          <div class="h-1.5 sm:h-2 bg-mama-input rounded-full mt-2">
            <div class="h-full bg-purple-400 rounded-full" style="width: 80%" />
          </div>
        </div>

        <div class="bg-mama-surface rounded-3xl p-4 sm:p-5 shadow-soft">
          <div class="flex items-center justify-between mb-2 sm:mb-3">
            <span class="text-xl sm:text-2xl">💊</span>
            <span class="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 bg-orange-50 dark:bg-orange-900/30 text-mama-coral dark:text-orange-400 rounded-full hidden sm:inline">Pending</span>
          </div>
          <div class="text-[10px] sm:text-xs text-mama-muted font-medium mb-1">Meds</div>
          <div class="text-lg sm:text-2xl font-black text-mama-text">2<span class="text-mama-muted font-normal text-[9px] sm:text-base">/3</span></div>
          <div class="h-1.5 sm:h-2 bg-mama-input rounded-full mt-2">
            <div class="h-full bg-mama-coral rounded-full" style="width: 67%" />
          </div>
        </div>
      </div>

      <!-- Row 3: Vaccination card + Daily tip (full width) -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
        <div class="sm:col-span-1 bg-gradient-to-br from-mama-sky to-mama-bg rounded-3xl p-4 sm:p-5 shadow-soft-sm border border-mama-border-light">
          <div class="flex items-center gap-2 mb-2 sm:mb-3">
            <span class="text-xl sm:text-2xl">💉</span>
            <span class="text-xs font-semibold px-2 py-0.5 bg-mama-teal/10 text-mama-teal rounded-full">Due Soon</span>
          </div>
          <div class="text-[10px] sm:text-xs text-mama-muted font-medium mb-1">Next Vaccination</div>
          <div class="text-sm sm:text-base font-bold text-mama-text">Td Booster</div>
          <div class="text-[10px] sm:text-xs text-mama-muted mt-1">Due in 3 weeks · Week 31</div>
        </div>

        <!-- Daily tip: spans remaining 3 cols on sm+, full on mobile -->
        <div class="sm:col-span-3 bg-gradient-to-br from-mama-teal/5 to-mama-sky/30 rounded-3xl p-4 sm:p-5 shadow-soft-sm border border-mama-border-light flex items-start gap-3 sm:gap-4">
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-mama-teal flex items-center justify-center flex-shrink-0">
            <span class="text-lg sm:text-xl">💡</span>
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-xs font-semibold text-mama-teal">Daily Tip</span>
              <span class="text-[10px] text-mama-muted">Week 28</span>
            </div>
            <p class="text-sm font-semibold text-mama-text leading-snug">
              Stay hydrated — drink 8–10 glasses of water daily for optimal fetal development and to ease leg swelling.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
