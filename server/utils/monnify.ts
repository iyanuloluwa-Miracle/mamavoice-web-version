import crypto from 'crypto'

export interface MonnifyInitResponse {
  checkoutUrl: string;
  transactionReference: string;
  paymentReference: string;
}

export interface MonnifyVerifyResponse {
  paymentReference: string;
  transactionReference: string;
  amount: number;
  paymentStatus: 'PAID' | 'FAILED' | 'PENDING' | 'OVERDUE';
  customerName: string;
  customerEmail: string;
  raw: any;
}

// Token Cache
let cachedToken: string | null = null
let tokenExpiryTime = 0

function getBaseUrl(): string {
  const isProd = process.env.MONNIFY_IS_PROD === 'true'
  return isProd ? 'https://api.monnify.com' : 'https://sandbox.monnify.com'
}

function hasConfig(): boolean {
  return !!(
    process.env.MONNIFY_API_KEY &&
    process.env.MONNIFY_SECRET_KEY &&
    process.env.MONNIFY_CONTRACT_CODE
  )
}

async function getAuthToken(): Promise<string> {
  if (!hasConfig()) {
    throw new Error('Monnify credentials are not configured')
  }

  // Use cached token if valid (expiry is 1 hour, we buffer by 5 minutes)
  if (cachedToken && Date.now() < tokenExpiryTime - 300000) {
    return cachedToken
  }

  const apiKey = process.env.MONNIFY_API_KEY
  const secretKey = process.env.MONNIFY_SECRET_KEY
  const authString = Buffer.from(`${apiKey}:${secretKey}`).toString('base64')

  const baseUrl = getBaseUrl()

  try {
    const res = await $fetch<{
      requestSuccessful: boolean;
      responseMessage: string;
      responseBody: { accessToken: string; expiresIn: number };
    }>(`${baseUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
    })

    if (res.requestSuccessful && res.responseBody?.accessToken) {
      cachedToken = res.responseBody.accessToken
      // expiresIn is usually in seconds
      tokenExpiryTime = Date.now() + res.responseBody.expiresIn * 1000
      return cachedToken
    } else {
      throw new Error(res.responseMessage || 'Authentication failed')
    }
  } catch (error) {
    console.error('[Monnify Auth Error]', error)
    throw error
  }
}

export const monnify = {
  async initializePayment(params: {
    amount: number;
    customerName: string;
    customerEmail: string;
    paymentReference: string;
    paymentDescription: string;
    redirectUrl: string;
    metadata?: Record<string, any>;
  }): Promise<MonnifyInitResponse> {
    const token = await getAuthToken()
    const baseUrl = getBaseUrl()

    try {
      const res = await $fetch<{
        requestSuccessful: boolean;
        responseMessage: string;
        responseBody: {
          transactionReference: string;
          paymentReference: string;
          checkoutUrl: string;
        };
      }>(`${baseUrl}/api/v1/merchant/transactions/init-transaction`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: {
          amount: params.amount,
          customerName: params.customerName,
          customerEmail: params.customerEmail,
          paymentReference: params.paymentReference,
          paymentDescription: params.paymentDescription,
          currencyCode: 'NGN',
          contractCode: process.env.MONNIFY_CONTRACT_CODE,
          redirectUrl: params.redirectUrl,
          paymentMethods: ['CARD', 'ACCOUNT_TRANSFER'],
          metadata: params.metadata,
        },
      })

      if (res.requestSuccessful && res.responseBody) {
        return {
          checkoutUrl: res.responseBody.checkoutUrl,
          transactionReference: res.responseBody.transactionReference,
          paymentReference: res.responseBody.paymentReference,
        }
      } else {
        throw new Error(res.responseMessage || 'Failed to initialize transaction')
      }
    } catch (error) {
      console.error('[Monnify Init Error]', error)
      throw error
    }
  },

  async verifyPayment(paymentReference: string): Promise<MonnifyVerifyResponse> {
    const token = await getAuthToken()
    const baseUrl = getBaseUrl()

    try {
      const res = await $fetch<{
        requestSuccessful: boolean;
        responseMessage: string;
        responseBody: {
          paymentReference: string;
          transactionReference: string;
          amount: number;
          paymentStatus: string; // PAID, FAILED, PENDING
          customer: { name: string; email: string };
        };
      }>(`${baseUrl}/api/v2/merchant/transactions/query?paymentReference=${encodeURIComponent(paymentReference)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (res.requestSuccessful && res.responseBody) {
        const body = res.responseBody
        let status: 'PAID' | 'FAILED' | 'PENDING' | 'OVERDUE' = 'PENDING'
        if (body.paymentStatus === 'PAID' || body.paymentStatus === 'SUCCESS') {
          status = 'PAID'
        } else if (body.paymentStatus === 'FAILED') {
          status = 'FAILED'
        } else if (body.paymentStatus === 'OVERDUE') {
          status = 'OVERDUE'
        }

        return {
          paymentReference: body.paymentReference,
          transactionReference: body.transactionReference,
          amount: body.amount,
          paymentStatus: status,
          customerName: body.customer?.name || 'Supporter',
          customerEmail: body.customer?.email || '',
          raw: body,
        }
      } else {
        throw new Error(res.responseMessage || 'Failed to query transaction status')
      }
    } catch (error) {
      console.error('[Monnify Query Error]', error)
      throw error
    }
  },

  validateWebhookSignature(rawBody: string, signature: string): boolean {
    if (!process.env.MONNIFY_SECRET_KEY) {
      console.warn('[Monnify Webhook] Signature verification failed: MONNIFY_SECRET_KEY not set.')
      return false
    }

    try {
      const computedHash = crypto
        .createHmac('sha512', process.env.MONNIFY_SECRET_KEY)
        .update(rawBody)
        .digest('hex')

      const cleanSignature = signature.trim().toLowerCase()

      if (computedHash.length !== cleanSignature.length) {
        console.warn('[Monnify Webhook] Signature verification failed: Length mismatch.')
        return false
      }

      return crypto.timingSafeEqual(
        Buffer.from(computedHash, 'utf-8'),
        Buffer.from(cleanSignature, 'utf-8')
      )
    } catch (error) {
      console.error('[Monnify Webhook Signature Verification Error]', error)
      return false
    }
  },
}
