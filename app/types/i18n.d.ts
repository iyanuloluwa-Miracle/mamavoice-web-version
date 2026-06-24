import type { ComputedRef } from 'vue'

// Augments vue-i18n's Composer with @nuxtjs/i18n's extra properties
// (mirrors .nuxt/types/i18n-plugin.d.ts which nuxt.d.ts doesn't reference)
declare module 'vue-i18n' {
  interface ComposerCustom {
    locales: ComputedRef<Array<{ code: string; name: string; file?: string }>>
    localeCodes: ComputedRef<string[]>
    setLocale: (locale: string) => Promise<void>
  }
}

// Nuxt compiler macros — removed at build time, only need a type declaration here
declare function definePageMeta(meta: { layout?: string | false; [key: string]: unknown }): void

export {}
