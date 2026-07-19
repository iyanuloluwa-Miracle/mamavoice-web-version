import { defineEventHandler, getHeader, readRawBody, createError } from 'h3'
import { db } from '../../utils/db'
import { monnify } from '../../utils/monnify'

export default defineEventHandler(async (event) => {
  const signature = getHeader(event, 'monnify-signature')
  const rawBody = await readRawBody(event, 'utf-8')

  if (!rawBody) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Request body is empty.',
    })
  }

  // Verify signature
  if (!signature) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing signature header.',
    })
  }

  const isValid = monnify.validateWebhookSignature(rawBody, signature)
  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid webhook signature.',
    })
  }

  try {
    const payload = JSON.parse(rawBody)
    const { eventType, eventData } = payload as {
      eventType: string;
      eventData?: {
        paymentReference?: string;
        transactionReference?: string;
        paymentStatus?: string;
        amountPaid?: string | number;
      };
    }

    if (!eventData || !eventData.paymentReference) {
      return { received: true, message: 'No eventData or paymentReference found.' }
    }

    const paymentReference = eventData.paymentReference

    // Load from DB to check if it exists
    const donation = await db.getDonation(paymentReference)
    if (!donation) {
      console.warn(`[Monnify Webhook] Donation ref not found: ${paymentReference}`)
      return { received: true, message: 'Transaction not found locally.' }
    }

    // Process event
    if (eventType === 'SUCCESSFUL_TRANSACTION' && eventData.paymentStatus === 'PAID') {
      await db.updateDonationStatus(
        paymentReference,
        'SUCCESS',
        eventData.transactionReference,
        payload
      )
      console.log(`[Monnify Webhook] Transaction marked SUCCESS via webhook: ${paymentReference}`)
    } else if (eventData.paymentStatus === 'FAILED') {
      await db.updateDonationStatus(
        paymentReference,
        'FAILED',
        eventData.transactionReference,
        payload
      )
      console.log(`[Monnify Webhook] Transaction marked FAILED via webhook: ${paymentReference}`)
    }

    return { success: true }
  } catch (error: any) {
    console.error('[Monnify Webhook Error]', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error processing webhook.',
    })
  }
})
