import { defineEventHandler, getQuery, createError } from 'h3'
import { db } from '../../utils/db'
import { monnify } from '../../utils/monnify'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const paymentReference = query.paymentReference as string | undefined

  if (!paymentReference) {
    throw createError({
      statusCode: 400,
      statusMessage: 'paymentReference is required.',
    })
  }

  // Get transaction from local DB
  const donation = db.getDonation(paymentReference)
  if (!donation) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Donation transaction not found.',
    })
  }

  // If already marked SUCCESS, no need to call Monnify again, just return it.
  if (donation.status === 'SUCCESS') {
    return {
      success: true,
      donation,
    }
  }

  try {
    // Call Monnify to verify payment
    const verifyRes = await monnify.verifyPayment(paymentReference)

    let status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'OVERDUE' = 'PENDING'
    if (verifyRes.paymentStatus === 'PAID') {
      status = 'SUCCESS'
    } else if (verifyRes.paymentStatus === 'FAILED') {
      status = 'FAILED'
    } else if (verifyRes.paymentStatus === 'OVERDUE') {
      status = 'OVERDUE'
    }

    // Update DB
    const updatedDonation = db.updateDonationStatus(
      paymentReference,
      status,
      verifyRes.transactionReference,
      verifyRes.raw
    )

    return {
      success: status === 'SUCCESS',
      donation: updatedDonation,
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Payment verification failed.',
    })
  }
})
