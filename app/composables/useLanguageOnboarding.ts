import { ref } from 'vue'

const STORAGE_KEY = 'mama-lang-onboarded'

const showOnboarding = ref(false)

export const useLanguageOnboarding = () => {
  const init = () => {
    if (typeof window === 'undefined') return
    const hasOnboarded = localStorage.getItem(STORAGE_KEY)
    showOnboarding.value = !hasOnboarded
  }

  const completeOnboarding = () => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, 'true')
    showOnboarding.value = false
  }

  return {
    showOnboarding,
    init,
    completeOnboarding,
  }
}

