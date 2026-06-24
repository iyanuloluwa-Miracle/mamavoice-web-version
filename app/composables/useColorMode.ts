import { readonly } from 'vue'
import { useState } from '#imports'

export const useColorMode = () => {
  const isDark = useState('colorMode', () => false)

  const apply = (dark: boolean) => {
    if (typeof window === 'undefined') return
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('mama-color-mode', dark ? 'dark' : 'light')
  }

  const toggle = () => {
    isDark.value = !isDark.value
    apply(isDark.value)
  }

  const init = () => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('mama-color-mode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = stored ? stored === 'dark' : prefersDark
    apply(isDark.value)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('mama-color-mode')) {
        isDark.value = e.matches
        apply(isDark.value)
      }
    })
  }

  return { isDark: readonly(isDark), toggle, init }
}
