import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/i18n'],
  vite: {
    plugins: [tailwindcss()]
  },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#00897B' },
        { property: 'og:image', content: '/mamavoiceLogo.png' },
        { name: 'twitter:image', content: '/mamavoiceLogo.png' },
      ],
      link: [
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/mamavoiceLogo.png' },
        { rel: 'apple-touch-icon', type: 'image/png', href: '/mamavoiceLogo.png' },
      ],
    }
  },
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'yo', name: 'Yorùbá', file: 'yo.json' },
      { code: 'ha', name: 'Hausa', file: 'ha.json' },
      { code: 'ig', name: 'Igbo', file: 'ig.json' },
      { code: 'pcm', name: 'Naija', file: 'pcm.json' },
    ],
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: false,
      storageKey: 'mama-locale',
      redirectOn: 'root',
    },
  }
})
