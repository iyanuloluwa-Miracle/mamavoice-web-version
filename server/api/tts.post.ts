export default defineEventHandler(async (event) => {
  const { text, voice = 'Idera' } = await readBody(event)

  if (!text?.trim()) {
    throw createError({ statusCode: 400, message: 'text is required' })
  }

  const apiKey = process.env.YARNGPT_API_KEY
  if (!apiKey || apiKey === 'your_yarngpt_api_key_here') {
    throw createError({ statusCode: 500, message: 'YARNGPT_API_KEY is not configured' })
  }

  const res = await fetch('https://yarngpt.ai/api/v1/tts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text.slice(0, 2000),
      voice,
      response_format: 'mp3',
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => res.statusText)
    throw createError({ statusCode: 502, message: `YarnGPT error: ${detail}` })
  }

  const buffer = await res.arrayBuffer()
  setResponseHeader(event, 'Content-Type', 'audio/mpeg')
  return send(event, Buffer.from(buffer))
})
