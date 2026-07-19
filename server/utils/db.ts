import { neon } from '@neondatabase/serverless'

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

// Connect to Neon database using HTTP connection client.
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null

// Flag to ensure DB initialization is started once
let dbInitialized = false

async function ensureTableExists() {
  if (!sql) {
    console.error('[Neon DB] DATABASE_URL is not configured.')
    return
  }
  if (dbInitialized) return

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS donations (
        id VARCHAR(255) PRIMARY KEY,
        transaction_reference VARCHAR(255),
        amount NUMERIC(15, 2) NOT NULL,
        currency VARCHAR(10) NOT NULL,
        donor_name VARCHAR(255) NOT NULL,
        donor_email VARCHAR(255) NOT NULL,
        message TEXT,
        is_anonymous BOOLEAN DEFAULT FALSE,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        raw_response JSONB
      );
    `
    dbInitialized = true
  } catch (error) {
    console.error('[Neon DB] Table initialization failed:', error)
  }
}

// Auto-trigger on file load
ensureTableExists().catch((err) => {
  console.error('[Neon DB] Auto-initialization failed:', err)
})

function mapRowToDonation(row: any): Donation {
  return {
    id: row.id,
    transactionReference: row.transaction_reference || undefined,
    amount: Number(row.amount),
    currency: row.currency,
    donorName: row.donor_name,
    donorEmail: row.donor_email,
    message: row.message || '',
    isAnonymous: !!row.is_anonymous,
    status: row.status as Donation['status'],
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
    rawResponse: row.raw_response || undefined,
  }
}

export const db = {
  async getDonation(id: string): Promise<Donation | null> {
    if (!sql) return null
    await ensureTableExists()
    try {
      const rows = await sql`SELECT * FROM donations WHERE id = ${id}`
      if (rows && rows.length > 0) {
        return mapRowToDonation(rows[0])
      }
      return null
    } catch (error) {
      console.error('[Neon DB] Error in getDonation:', error)
      return null
    }
  },

  async saveDonation(donation: Donation): Promise<Donation> {
    if (!sql) {
      console.warn('[Neon DB] DATABASE_URL not set. Donation not persisted.')
      return donation
    }
    await ensureTableExists()
    try {
      await sql`
        INSERT INTO donations (
          id, transaction_reference, amount, currency, donor_name, donor_email, message, is_anonymous, status, created_at, updated_at, raw_response
        ) VALUES (
          ${donation.id},
          ${donation.transactionReference || null},
          ${donation.amount},
          ${donation.currency},
          ${donation.donorName},
          ${donation.donorEmail},
          ${donation.message},
          ${donation.isAnonymous},
          ${donation.status},
          ${new Date(donation.createdAt)},
          ${new Date(donation.updatedAt)},
          ${donation.rawResponse ? JSON.stringify(donation.rawResponse) : null}
        )
        ON CONFLICT (id) DO UPDATE SET
          transaction_reference = EXCLUDED.transaction_reference,
          amount = EXCLUDED.amount,
          currency = EXCLUDED.currency,
          donor_name = EXCLUDED.donor_name,
          donor_email = EXCLUDED.donor_email,
          message = EXCLUDED.message,
          is_anonymous = EXCLUDED.is_anonymous,
          status = EXCLUDED.status,
          updated_at = EXCLUDED.updated_at,
          raw_response = EXCLUDED.raw_response
      `
      return donation
    } catch (error) {
      console.error('[Neon DB] Error in saveDonation:', error)
      throw error
    }
  },

  async updateDonationStatus(
    id: string,
    status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'OVERDUE',
    transactionReference?: string,
    rawResponse?: any
  ): Promise<Donation | null> {
    if (!sql) return null
    await ensureTableExists()
    try {
      const existing = await this.getDonation(id)
      if (!existing) return null

      // Prevent duplicate updates or changing a successful status back
      if (existing.status === 'SUCCESS' && status !== 'SUCCESS') {
        return existing
      }

      const txRef = transactionReference || existing.transactionReference || null
      const raw = rawResponse ? JSON.stringify(rawResponse) : (existing.rawResponse ? JSON.stringify(existing.rawResponse) : null)
      const now = new Date()

      await sql`
        UPDATE donations
        SET
          status = ${status},
          transaction_reference = ${txRef},
          raw_response = ${raw},
          updated_at = ${now}
        WHERE id = ${id}
      `

      return await this.getDonation(id)
    } catch (error) {
      console.error('[Neon DB] Error in updateDonationStatus:', error)
      return null
    }
  },

  async listSuccessfulDonations(): Promise<Donation[]> {
    if (!sql) return []
    await ensureTableExists()
    try {
      const rows = await sql`
        SELECT * FROM donations 
        WHERE status = 'SUCCESS' 
        ORDER BY created_at DESC
      `
      return rows.map(mapRowToDonation)
    } catch (error) {
      console.error('[Neon DB] Error in listSuccessfulDonations:', error)
      return []
    }
  }
}
