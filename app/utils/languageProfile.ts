export type ProfileLanguage = 'English' | 'Yoruba' | 'Igbo' | 'Hausa'

const LOCALE_TO_PROFILE_LANGUAGE: Record<string, ProfileLanguage> = {
  en: 'English',
  yo: 'Yoruba',
  ha: 'Hausa',
  ig: 'Igbo',
  // pcm intentionally omitted — no backend equivalent, UI-only locale
}

const PROFILE_LANGUAGE_TO_LOCALE: Record<ProfileLanguage, string> = {
  English: 'en',
  Yoruba: 'yo',
  Hausa: 'ha',
  Igbo: 'ig',
}

export function localeToProfileLanguage(code: string): ProfileLanguage | null {
  return LOCALE_TO_PROFILE_LANGUAGE[code] ?? null
}

export function profileLanguageToLocale(lang: ProfileLanguage | null | undefined): string | null {
  if (!lang) return null
  return PROFILE_LANGUAGE_TO_LOCALE[lang] ?? null
}
