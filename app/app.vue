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
import { useAuthStore } from '~/stores/auth'

const { init: initColorMode } = useColorMode()
const { showOnboarding, init: initOnboarding, completeOnboarding } = useLanguageOnboarding()
const auth = useAuthStore()

onMounted(async () => {
  initColorMode()
  initOnboarding()
  await auth.restoreSession()
})
</script>
