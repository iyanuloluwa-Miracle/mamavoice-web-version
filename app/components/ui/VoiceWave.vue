<template>
  <div class="flex items-center gap-1" :class="size === 'sm' ? 'h-6' : 'h-10'">
    <div
      v-for="(bar, i) in bars"
      :key="i"
      class="rounded-full origin-bottom transition-all duration-300"
      :class="[
        size === 'sm' ? 'w-1' : 'w-1.5',
        color === 'white' ? 'bg-white' : 'bg-mama-teal',
        isActive ? 'animate-wave-bar' : ''
      ]"
      :style="{
        height: isActive ? `${bar}%` : '20%',
        animationDelay: `${i * 120}ms`,
        maxHeight: size === 'sm' ? '24px' : '40px',
        minHeight: '4px'
      }"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isActive?: boolean
  size?: 'sm' | 'md'
  color?: 'teal' | 'white'
}>()

const bars = [60, 100, 75, 90, 50]
</script>
