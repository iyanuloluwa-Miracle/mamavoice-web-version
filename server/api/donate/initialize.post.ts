import { defineEventHandler, readBody, createError, getHeaders } from 'h3'
import { db } from '../../utils/db'
import { monnify } from '../../utils/monnify'

interface InitializePayload {
  amount: number;
  donorName?: string;
  donorEmail?: string;
  message?: string;
  isAnonymous?: boolean;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default defineEventHandler(async (event) => {
  const body = await readBody<InitializePayload>(event)

  if (!body.amount || typeof body.amount !== 'number' || body.amount < 100) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid amount. Minimum donation is ₦100.',
    })
  }

  if (body.donorEmail && !isValidEmail(body.donorEmail)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email address.',
    })
  }

  const paymentReference = `mv-donate-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`

  // Get dynamic redirect URL based on host header
  const headers = getHeaders(event)
  const host = headers.host || 'localhost:3000'
  const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https'
  const redirectUrl = `${protocol}://${host}/donate/callback`

  const name = body.isAnonymous ? 'Anonymous Supporter' : (body.donorName?.trim() || 'Anonymous Supporter')
  const email = body.donorEmail?.trim() || 'anonymous-supporter@mamavoice.africa'
  const desc = 'MamaVoice Companion Support Donation'

  try {
    const initRes = await monnify.initializePayment({
      amount: body.amount,
      customerName: name,
      customerEmail: email,
      paymentReference,
      paymentDescription: desc,
      redirectUrl,
      metadata: {
        message: body.message?.trim() || '',
        isAnonymous: !!body.isAnonymous,
      },
    })

    // Save pending donation to DB
    await db.saveDonation({
      id: paymentReference,
      transactionReference: initRes.transactionReference,
      amount: body.amount,
      currency: 'NGN',
      donorName: name,
      donorEmail: email,
      message: body.message?.trim() || '',
      isAnonymous: !!body.isAnonymous,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return {
      success: true,
      checkoutUrl: initRes.checkoutUrl,
      paymentReference,
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Payment initialization failed.',
    })
  }
})
