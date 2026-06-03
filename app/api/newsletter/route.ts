import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_ATTEMPTS = 5
const RATE_LIMIT_MAX_KEYS = 1000
const attempts = new Map<string, { count: number; resetAt: number }>()
let lastPrunedAt = 0

function clientKey(request: Request) {
  const vercelForwardedFor = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const realIp = request.headers.get('x-real-ip')?.trim()
  return vercelForwardedFor || forwardedFor || realIp || 'unknown'
}

function pruneAttempts(now = Date.now()) {
  if (attempts.size <= RATE_LIMIT_MAX_KEYS && now - lastPrunedAt < RATE_LIMIT_WINDOW_MS) {
    return
  }

  for (const [key, value] of attempts) {
    if (value.resetAt <= now) {
      attempts.delete(key)
    }
  }

  while (attempts.size > RATE_LIMIT_MAX_KEYS) {
    const oldestKey = attempts.keys().next().value
    if (!oldestKey) break
    attempts.delete(oldestKey)
  }

  lastPrunedAt = now
}

function isRateLimited(key: string) {
  const now = Date.now()
  pruneAttempts(now)

  const current = attempts.get(key)

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  current.count += 1
  return current.count > RATE_LIMIT_MAX_ATTEMPTS
}

async function mailchimpErrorTitle(res: Response) {
  try {
    const data = await res.json() as { title?: string; detail?: string }
    return data.title ?? data.detail
  } catch {
    return undefined
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.MAILCHIMP_API_KEY
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID

  if (!apiKey || !audienceId) {
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Missing or invalid email.' }, { status: 400 })
  }

  const record = body as Record<string, unknown>
  const honeypot = typeof record.company === 'string' ? record.company.trim() : ''
  if (honeypot) {
    return NextResponse.json({ success: true })
  }

  if (typeof record.email !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid email.' }, { status: 400 })
  }

  const email = record.email.trim().toLowerCase()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || email.length > 254 || !emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  if (isRateLimited(clientKey(request))) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 })
  }

  const dc = apiKey.split('-').pop()
  if (!dc || dc === apiKey) {
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 })
  }

  const subscriberHash = createHash('md5').update(email).digest('hex')
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`

  let res: Response
  try {
    res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email, status_if_new: 'pending' }),
      signal: AbortSignal.timeout(8000),
    })
  } catch {
    return NextResponse.json({ error: 'Subscription service is temporarily unavailable.' }, { status: 502 })
  }

  if (!res.ok) {
    const title = await mailchimpErrorTitle(res)
    if (title === 'Member Exists') {
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: title ?? 'Subscription failed.' }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
