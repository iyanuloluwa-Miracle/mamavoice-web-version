# YarnGPT TTS Integration Guide

Nigerian language text-to-speech using [yarngpt.ai](https://yarngpt.ai) for Yoruba, Igbo, and Hausa.

---

## Why YarnGPT

Most devices (phones, computers) ship with English voice packs but have **no voices for Yoruba, Igbo, or Hausa**. Using the device's built-in TTS for these languages produces silence or a wrong accent. YarnGPT is a Nigerian TTS platform with high-quality, native-sounding voices for all three languages.

**Rule:**
- English → device built-in TTS (fast, free, works everywhere)
- Yoruba / Igbo / Hausa → YarnGPT API (Nigerian-accented, accurate)

---

## API Reference

### Endpoint

```
POST https://yarngpt.ai/api/v1/tts
```

### Headers

```
Authorization: Bearer YOUR_YARNGPT_API_KEY
Content-Type: application/json
```

### Request Body

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `text` | string | Yes | — | Max 2000 characters |
| `voice` | string | No | `Idera` | See voice table below |
| `response_format` | string | No | `mp3` | `mp3`, `wav`, `opus`, `flac` |

### Response

Raw audio binary in the requested format (default mp3). HTTP 200 on success.

### Example Request (cURL)

```bash
curl -X POST https://yarngpt.ai/api/v1/tts \
  -H "Authorization: Bearer YOUR_YARNGPT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "Ẹ káàárọ̀, bawo ni o ṣe wa?", "voice": "Wura", "response_format": "mp3"}' \
  --output speech.mp3
```

---

## Voice Selection

YarnGPT has 16 voice characters. Language is **not a separate parameter** — it is inferred automatically from the text content. Pick a voice whose name matches the language for a natural result.

| Language | Locale Code | Recommended Voice | Voice Notes |
|----------|-------------|-------------------|-------------|
| Yoruba | `yo` | `Wura` | Yoruba name meaning "gold" |
| Igbo | `ig` | `Chinenye` | Igbo female name |
| Hausa | `ha` | `Zainab` | Common Hausa/Northern name |
| English | `en` | `Idera` | Use device TTS instead (see below) |

### All Available Voices

`Idera`, `Emma`, `Zainab`, `Osagie`, `Wura`, `Jude`, `Chinenye`, `Tayo`, `Regina`, `Femi`, `Adaora`, `Umar`, `Mary`, `Nonso`, `Remi`, `Adam`

---

## Implementation Rules

### 1. Keep the API Key Server-Side

**Never** put `YARNGPT_API_KEY` in client code, mobile app bundles, or frontend JavaScript. Always proxy through your own backend.

```
Mobile App  →  POST /your-api/tts { text, locale }
Your Server →  POST yarngpt.ai/api/v1/tts (with secret key)
Mobile App  ←  mp3 audio binary
```

### 2. Chunk Long Text

YarnGPT accepts a maximum of **2000 characters per request**. For longer responses, split at sentence boundaries and play chunks sequentially.

```
if text.length > 1900:
    split by sentence endings (. ! ?)
    call API for each chunk
    play chunks back-to-back
```

### 3. Only Call YarnGPT for Nigerian Languages

English TTS is handled fine by the device. Reserve YarnGPT for `yo`, `ig`, `ha`.

```
if locale == "yo" or "ig" or "ha":
    call YarnGPT
else:
    use device TTS
```

---

## Server Proxy Example (Node.js / Nuxt H3)

```typescript
// server/api/tts.post.ts
export default defineEventHandler(async (event) => {
  const { text, voice = 'Idera' } = await readBody(event)

  const apiKey = process.env.YARNGPT_API_KEY
  if (!apiKey) throw createError({ statusCode: 500, message: 'YARNGPT_API_KEY not set' })
  if (!text?.trim()) throw createError({ statusCode: 400, message: 'text is required' })

  const res = await fetch('https://yarngpt.ai/api/v1/tts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: text.slice(0, 2000), voice, response_format: 'mp3' }),
  })

  if (!res.ok) throw createError({ statusCode: 502, message: 'YarnGPT error' })

  const buffer = await res.arrayBuffer()
  setResponseHeader(event, 'Content-Type', 'audio/mpeg')
  return send(event, Buffer.from(buffer))
})
```

---

## Mobile Implementation Notes

### Flutter / Dart

```dart
Future<Uint8List> fetchTTSAudio(String text, String locale) async {
  final voice = {'yo': 'Wura', 'ig': 'Chinenye', 'ha': 'Zainab'}[locale] ?? 'Idera';

  // Call YOUR backend proxy, not YarnGPT directly
  final response = await http.post(
    Uri.parse('https://your-api.com/tts'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({'text': text, 'voice': voice}),
  );

  if (response.statusCode != 200) throw Exception('TTS failed');
  return response.bodyBytes; // raw mp3 bytes — pass to audio player
}
```

### React Native

```typescript
async function fetchTTSAudio(text: string, locale: string): Promise<string> {
  const voices: Record<string, string> = { yo: 'Wura', ig: 'Chinenye', ha: 'Zainab' };
  const voice = voices[locale] ?? 'Idera';

  // Call YOUR backend proxy
  const res = await fetch('https://your-api.com/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voice }),
  });

  const blob = await res.blob();
  // Convert blob to a file path and pass to expo-av or react-native-sound
  return URL.createObjectURL(blob);
}
```

---

## Environment Setup

Add to your `.env` file (server only):

```
YARNGPT_API_KEY=your_key_here
```

Get your API key by signing up at [yarngpt.ai](https://yarngpt.ai). The service is **free** as of June 2026.

---

## Error Handling

| HTTP Status | Meaning | Action |
|-------------|---------|--------|
| 200 | Success | Play audio |
| 400 | Bad request (empty text) | Validate input before calling |
| 401 | Invalid API key | Check `YARNGPT_API_KEY` |
| 429 | Rate limited | Add retry with backoff |
| 500 | YarnGPT server error | Show silent fallback, log error |

**Recommended fallback:** If YarnGPT fails, fail silently — the user can still read the text response. Never block the chat UI on a TTS error.

---

## Quick Checklist

- [ ] API key added to server environment (`YARNGPT_API_KEY`)
- [ ] API key is **not** in client/mobile code
- [ ] Backend proxy endpoint created
- [ ] Text chunked at 1900 chars before sending
- [ ] YarnGPT only called for `yo`, `ig`, `ha` — not `en`
- [ ] Audio plays sequentially if chunked
- [ ] TTS failure is silent (does not block the UI)
