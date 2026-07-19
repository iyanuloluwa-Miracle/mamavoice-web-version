import fs from 'fs'
import path from 'path'

export interface Donation {
  id: string; // paymentReference
  transactionReference?: string; // from Monnify
  amount: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  message: string;
  isAnonymous: boolean;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'OVERDUE';
  createdAt: string;
  updatedAt: string;
  rawResponse?: any;
}

const dbPath = path.resolve(process.cwd(), 'server/data/donations.json')

// Helper to ensure data directory exists and returns existing/empty donations
function readDb(): Record<string, Donation> {
  try {
    const dir = path.dirname(dbPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify({}), 'utf-8')
      return {}
    }
    const data = fs.readFileSync(dbPath, 'utf-8')
    return JSON.parse(data || '{}')
  } catch (error) {
    console.error('[DB Read Error]', error)
    return {}
  }
}

function writeDb(data: Record<string, Donation>): boolean {
  try {
    const dir = path.dirname(dbPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error('[DB Write Error]', error)
    return false
  }
}

export const db = {
  getDonation(id: string): Donation | null {
    const data = readDb()
    return data[id] || null
  },

  saveDonation(donation: Donation): Donation {
    const data = readDb()
    data[donation.id] = donation
    writeDb(data)
    return donation
  },

  updateDonationStatus(
    id: string,
    status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'OVERDUE',
    transactionReference?: string,
    rawResponse?: any
  ): Donation | null {
    const data = readDb()
    const donation = data[id]
    if (!donation) return null

    // Prevent duplicate updates or changing a successful status back to pending/failed
    if (donation.status === 'SUCCESS' && status !== 'SUCCESS') {
      return donation
    }

    donation.status = status
    donation.updatedAt = new Date().toISOString()
    if (transactionReference) {
      donation.transactionReference = transactionReference
    }
    if (rawResponse) {
      donation.rawResponse = rawResponse
    }

    data[id] = donation
    writeDb(data)
    return donation
  },

  listSuccessfulDonations(): Donation[] {
    const data = readDb()
    return Object.values(data)
      .filter((d) => d.status === 'SUCCESS')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
}
