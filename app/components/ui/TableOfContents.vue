<template>
  <!-- Mobile: horizontal scrollable pills -->
  <div class="lg:hidden mb-8">
    <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        v-for="section in sections"
        :key="section.id"
        @click="scrollTo(section.id)"
        class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
        :class="activeId === section.id
          ? 'bg-mama-teal text-white border-mama-teal'
          : 'bg-mama-surface text-mama-muted border-mama-border hover:border-mama-teal hover:text-mama-teal dark:bg-mama-dark-card dark:border-white/10'"
      >
        {{ section.title }}
      </button>
    </div>
  </div>

  <!-- Desktop: sticky sidebar -->
  <nav class="hidden lg:block w-64 flex-shrink-0" aria-label="Page sections">
    <div class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 scrollbar-thin">
      <p class="text-xs font-bold uppercase tracking-widest text-mama-muted mb-4 px-3">
        {{ title }}
      </p>
      <ul class="space-y-1">
        <li v-for="section in sections" :key="section.id">
          <button
            @click="scrollTo(section.id)"
            class="w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-200 border-l-2"
            :class="activeId === section.id
              ? 'border-mama-teal text-mama-teal font-semibold bg-mama-teal/5 dark:bg-mama-teal/10'
              : 'border-transparent text-mama-muted hover:text-mama-text hover:border-mama-border dark:hover:text-white'"
          >
            {{ section.title }}
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface TocSection {
  id: string
  title: string
}

const props = defineProps<{
  sections: TocSection[]
  title?: string
}>()

const activeId = ref(props.sections[0]?.id ?? '')
let observer: IntersectionObserver | null = null

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = 88
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
  activeId.value = id
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
  )
  props.sections.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) observer!.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
