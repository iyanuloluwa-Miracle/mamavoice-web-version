<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- First-time language selection overlay -->
    <UiLanguageOnboarding
      :visible="showOnboarding"
      @close="completeOnboarding"
    />
  </div>
</template>

<script setup lang="ts">
const { init: initColorMode } = useColorMode()
const { showOnboarding, init: initOnboarding, completeOnboarding } = useLanguageOnboarding()

onMounted(() => {
  initColorMode()
  initOnboarding()
})
</script>
