# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run preview      # Preview production build locally
npm run generate     # Static site generation
```

No lint or test scripts are configured yet.

## Environment Variables

```
ANTHROPIC_API_KEY=   # Claude API key — used server-side in server/api/chat.post.ts
YARNGPT_API_KEY=     # YarnGPT TTS key — used server-side in server/api/tts.post.ts
```

Both keys must be server-side only (never exposed to the browser).

## Architecture

**Nuxt 4 + Vue 3 + TypeScript.** Tailwind CSS 4 (via `@tailwindcss/vite`). i18n via `@nuxtjs/i18n`.

The app directory follows Nuxt 4's `app/` convention:

```
app/
  pages/         # File-based routes: index.vue (landing), chat.vue, contact.vue, legal pages
  components/
    layout/      # TheNavbar, TheFooter
    sections/    # Landing page sections (Hero, Features, Nutrition, FAQ, etc.)
    ui/          # Shared primitives (VoiceWave, AnimatedMic, LanguageOnboarding)
  composables/   # All stateful logic lives here — see below
  layouts/       # default.vue (landing), chat.vue layout (no navbar/footer)
  assets/css/    # main.css — Tailwind base + brand tokens + custom animations

server/
  api/
    chat.post.ts      # Claude Haiku AI endpoint — strict maternal-health system prompt
    tts.post.ts       # Proxies text to YarnGPT API, returns audio/mpeg blob
    contact.post.ts   # Contact form validation (email delivery not yet wired)

i18n/locales/    # JSON translation files for en, yo, ha, ig, pcm
```

## Key Composables

| File | Responsibility |
|------|---------------|
| `useTextToSpeech.ts` | Dual-backend TTS: browser `SpeechSynthesis` for en/pcm, YarnGPT API for yo/ha/ig. Strips markdown + emoji before speaking. Chunks long text at sentence boundaries (≤1900 chars per YarnGPT call). Persists on/off state in `localStorage('mama-tts')`. |
| `useSpeechToText.ts` | Browser Web Speech API with interim transcript callbacks. |
| `useChatHistory.ts` | Reads/writes `localStorage('mama-chat-messages')`. Fails silently when storage is full. |
| `useColorMode.ts` | System-preference dark mode with `localStorage('mama-color-mode')` override. |

## TTS Routing Logic

```
locale = en / pcm  →  window.speechSynthesis  (browser, free, instant)
locale = yo        →  YarnGPT voice "Wura"
locale = ig        →  YarnGPT voice "Chinenye"
locale = ha        →  YarnGPT voice "Zainab"
```

YarnGPT requests go through `/api/tts` (server-side key, returns Blob). Chunks play sequentially; any chunk can be cancelled via `stop()`.

## i18n

Strategy is `no_prefix` — language is stored in `localStorage('mama-locale')`, not in the URL. Five locales: `en`, `yo`, `ha`, `ig`, `pcm`. Translation files live in `i18n/locales/`.

## Design System

Brand palette is defined as CSS custom properties in `app/assets/css/main.css` and used via Tailwind utility classes (`bg-mama-teal`, `text-mama-coral`, etc.). Dark mode overrides the same variables. The font is DM Sans (Google Fonts). Avoid inline hex colours — use the existing palette tokens.

## AI System Prompt

The system prompt in `server/api/chat.post.ts` strictly scopes the AI to maternal/newborn health topics. It instructs the model to respond in the user's own language (Yoruba, Hausa, Igbo, Pidgin, or English) and to reference Nigerian foods and practices. Do not loosen the scope rules without deliberate review.
