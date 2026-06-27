import { defineEventHandler, readBody, createError } from 'h3'

interface ContactPayload {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactPayload>(event)

  const errors: Record<string, string> = {}

  if (!body.name || body.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  }
  if (!body.email || !isValidEmail(body.email)) {
    errors.email = 'A valid email address is required.'
  }
  if (!body.subject || body.subject.trim().length === 0) {
    errors.subject = 'Subject is required.'
  }
  if (!body.message || body.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  if (Object.keys(errors).length > 0) {
    throw createError({ statusCode: 400, data: { errors } })
  }

  // TODO: Wire up email delivery via CONTACT_EMAIL_TO env var using Resend/SendGrid
  console.log('[MamaVoice Contact Form]', {
    name: body.name.trim(),
    email: body.email.trim(),
    phone: body.phone?.trim() || 'N/A',
    subject: body.subject.trim(),
    message: body.message.trim(),
    timestamp: new Date().toISOString(),
  })

  return { success: true }
})
