import { NextResponse } from 'next/server'

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

  if (
    typeof body !== 'object' ||
    body === null ||
    !('email' in body) ||
    typeof (body as Record<string, unknown>).email !== 'string'
  ) {
    return NextResponse.json({ error: 'Missing or invalid email.' }, { status: 400 })
  }

  const email = (body as Record<string, string>).email.trim().toLowerCase()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  const dc = apiKey.split('-').pop()
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email_address: email, status: 'subscribed' }),
  })

  // 400 with title "Member Exists" means already subscribed — treat as success
  if (!res.ok) {
    const data = await res.json() as { title?: string }
    if (data.title === 'Member Exists') {
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: data.title ?? 'Subscription failed.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
