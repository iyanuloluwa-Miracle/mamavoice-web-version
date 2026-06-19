<template>
  <section id="health" class="py-20 px-4 bg-mama-bg">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-14">
        <div class="inline-flex items-center gap-2 bg-mama-sky text-mama-teal px-4 py-2 rounded-full text-sm font-semibold mb-4">
          📊 Health Dashboard
        </div>
        <h2 class="text-3xl md:text-4xl font-black text-mama-text mb-4">
          Your Complete<br class="hidden sm:block" />
          <span class="text-mama-teal">Pregnancy Health Hub</span>
        </h2>
        <p class="text-mama-muted text-lg max-w-xl mx-auto">
          Track every metric that matters — all beautifully organized in your personal dashboard.
        </p>
      </div>

      <!-- Dashboard grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Pregnancy week - spans 2 cols on large -->
        <div class="bg-gradient-to-br from-mama-teal to-mama-teal-dark rounded-3xl p-6 text-white col-span-2 lg:col-span-2">
          <div class="flex items-start justify-between mb-4">
            <div>
              <div class="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Pregnancy Week</div>
              <div class="text-5xl font-black">28</div>
              <div class="text-white/80 text-sm mt-1">2nd Trimester · Week 3</div>
            </div>
            <div class="text-4xl">🤰</div>
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
        <div class="bg-mama-surface rounded-3xl p-5 shadow-soft">
          <div class="flex items-center justify-between mb-3">
            <span class="text-2xl">❤️</span>
            <span class="text-xs font-semibold px-2 py-1 bg-green-50 dark:bg-green-900/30 text-mama-green dark:text-green-400 rounded-full">Normal</span>
          </div>
          <div class="text-xs text-mama-muted font-medium mb-1">Blood Pressure</div>
          <div class="text-2xl font-black text-mama-text">118<span class="text-mama-muted font-normal text-lg">/76</span></div>
          <div class="text-xs text-mama-muted mt-1">mmHg · Last: 2h ago</div>
        </div>

        <!-- Weight -->
        <div class="bg-mama-surface rounded-3xl p-5 shadow-soft">
          <div class="flex items-center justify-between mb-3">
            <span class="text-2xl">⚖️</span>
            <span class="text-xs font-semibold px-2 py-1 bg-orange-50 dark:bg-orange-900/30 text-mama-coral dark:text-orange-400 rounded-full">↑ +1.2kg</span>
          </div>
          <div class="text-xs text-mama-muted font-medium mb-1">Weight</div>
          <div class="text-2xl font-black text-mama-text">68<span class="text-mama-muted font-normal text-base"> kg</span></div>
          <div class="text-xs text-mama-muted mt-1">This month's gain</div>
        </div>

        <!-- Nutrition score -->
        <div class="bg-mama-surface rounded-3xl p-5 shadow-soft">
          <div class="flex items-center justify-between mb-3">
            <span class="text-2xl">🍽️</span>
            <span class="text-xs text-mama-muted">Today</span>
          </div>
          <div class="text-xs text-mama-muted font-medium mb-1">Nutrition Score</div>
          <div class="text-2xl font-black text-mama-text">82<span class="text-mama-muted font-normal text-base">/100</span></div>
          <div class="h-2 bg-mama-input rounded-full mt-2">
            <div class="h-full bg-mama-green rounded-full transition-all" style="width: 82%" />
          </div>
        </div>

        <!-- Baby movement -->
        <div class="bg-mama-surface rounded-3xl p-5 shadow-soft">
          <div class="flex items-center justify-between mb-3">
            <span class="text-2xl">👶</span>
            <span class="text-xs text-mama-muted">Today</span>
          </div>
          <div class="text-xs text-mama-muted font-medium mb-1">Baby Kicks</div>
          <div class="text-2xl font-black text-mama-text">12 <span class="text-mama-muted font-normal text-xs">kicks</span></div>
          <div class="h-2 bg-mama-input rounded-full mt-2">
            <div class="h-full bg-purple-400 rounded-full" style="width: 80%" />
          </div>
        </div>

        <!-- Medications -->
        <div class="bg-mama-surface rounded-3xl p-5 shadow-soft">
          <div class="flex items-center justify-between mb-3">
            <span class="text-2xl">💊</span>
            <span class="text-xs font-semibold px-2 py-1 bg-orange-50 dark:bg-orange-900/30 text-mama-coral dark:text-orange-400 rounded-full">1 Pending</span>
          </div>
          <div class="text-xs text-mama-muted font-medium mb-1">Medications</div>
          <div class="text-2xl font-black text-mama-text">2<span class="text-mama-muted font-normal text-base">/3 today</span></div>
          <div class="h-2 bg-mama-input rounded-full mt-2">
            <div class="h-full bg-mama-coral rounded-full" style="width: 67%" />
          </div>
        </div>

        <!-- Next vaccination -->
        <div class="bg-gradient-to-br from-mama-sky to-mama-bg rounded-3xl p-5 shadow-soft-sm border border-mama-border-light">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-2xl">💉</span>
            <span class="text-xs font-semibold px-2 py-1 bg-mama-teal/10 text-mama-teal rounded-full">Due Soon</span>
          </div>
          <div class="text-xs text-mama-muted font-medium mb-1">Next Vaccination</div>
          <div class="text-base font-bold text-mama-text">Td Booster</div>
          <div class="text-xs text-mama-muted mt-1">Due in 3 weeks · Week 31</div>
        </div>

        <!-- Daily tip - full width -->
        <div class="bg-gradient-to-br from-mama-teal/5 to-mama-sky/30 rounded-3xl p-5 shadow-soft-sm border border-mama-border-light col-span-2 lg:col-span-4">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-2xl">💡</span>
            <span class="text-xs font-semibold text-mama-teal">Daily Tip</span>
          </div>
          <p class="text-sm font-semibold text-mama-text leading-snug">
            Stay hydrated — drink 8–10 glasses of water daily for optimal fetal development.
          </p>
          <div class="text-xs text-mama-muted mt-2">Tip refreshes daily</div>
        </div>
      </div>
    </div>
  </section>
</template>
