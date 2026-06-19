<template>
  <div class="relative flex items-center justify-center" :class="size === 'sm' ? 'w-20 h-20' : 'w-40 h-40'">
    <!-- Pulsing rings -->
    <div
      v-if="isActive"
      class="absolute rounded-full border-2 border-mama-teal/30 animate-pulse-ring"
      :class="size === 'sm' ? 'w-16 h-16' : 'w-32 h-32'"
    />
    <div
      v-if="isActive"
      class="absolute rounded-full border-2 border-mama-teal/40 animate-pulse-ring anim-delay-300"
      :class="size === 'sm' ? 'w-12 h-12' : 'w-24 h-24'"
    />
    <div
      v-if="isActive"
      class="absolute rounded-full border-2 border-mama-teal/50 animate-pulse-ring anim-delay-500"
      :class="size === 'sm' ? 'w-8 h-8' : 'w-16 h-16'"
    />
    <!-- Center button -->
    <button
      @click="$emit('toggle')"
      class="relative z-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
      :class="[
        size === 'sm' ? 'w-10 h-10' : 'w-14 h-14',
        isActive
          ? 'bg-mama-coral shadow-lg scale-110'
          : 'bg-mama-teal hover:bg-mama-teal-dark shadow-md hover:scale-105'
      ]"
    >
      <!-- Mic icon -->
      <svg v-if="!isActive" class="text-white" :class="size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
      </svg>
      <!-- Stop icon when active -->
      <svg v-else class="text-white" :class="size === 'sm' ? 'w-3 h-3' : 'w-5 h-5'" fill="currentColor" viewBox="0 0 24 24">
        <rect x="6" y="6" width="12" height="12" rx="2"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isActive?: boolean
  size?: 'sm' | 'md'
}>()

defineEmits<{
  toggle: []
}>()
</script>
