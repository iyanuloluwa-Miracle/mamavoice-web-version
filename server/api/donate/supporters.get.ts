import { defineEventHandler } from 'h3'
import { db } from '../../utils/db'

export default defineEventHandler(async () => {
  const donations = await db.listSuccessfulDonations()

  // Project public fields and filter out anonymous donations
  const publicSupporters = donations
    .filter((d) => !d.isAnonymous)
    .map((d) => ({
      name: d.donorName || 'Anonymous Supporter',
      amount: d.amount,
      message: d.message,
      date: d.createdAt,
    }))
    .slice(0, 20) // Limit to top 20 latest supporters

  return {
    success: true,
    supporters: publicSupporters,
  }
})
