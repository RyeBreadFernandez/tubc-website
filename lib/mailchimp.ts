export interface MailchimpNewsletter {
  id: string
  title: string
  subject: string
  sentAt: string
  archiveUrl: string
}

interface MailchimpCampaign {
  id: string
  settings: {
    title: string
    subject_line: string
  }
  send_time: string
  archive_url: string
  long_archive_url: string
}

interface MailchimpResponse {
  campaigns: MailchimpCampaign[]
}

export interface MailchimpNewsletterArchive {
  status: 'ok' | 'unconfigured' | 'error'
  issues: MailchimpNewsletter[]
}

export async function fetchNewsletters(): Promise<MailchimpNewsletterArchive> {
  const apiKey = process.env.MAILCHIMP_API_KEY
  if (!apiKey) return { status: 'unconfigured', issues: [] }

  // API key format: <key>-<dc> e.g. abc123-us14
  const dc = apiKey.split('-').pop()
  if (!dc || dc === apiKey) return { status: 'error', issues: [] }

  const url = new URL(`https://${dc}.api.mailchimp.com/3.0/campaigns`)
  url.searchParams.set('status', 'sent')
  url.searchParams.set('type', 'regular')
  url.searchParams.set('count', '50')
  url.searchParams.set('sort_field', 'send_time')
  url.searchParams.set('sort_dir', 'DESC')
  url.searchParams.set('since_send_time', '2025-01-01T00:00:00Z')
  if (process.env.MAILCHIMP_AUDIENCE_ID) {
    url.searchParams.set('list_id', process.env.MAILCHIMP_AUDIENCE_ID)
  }

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) return { status: 'error', issues: [] }

    const data: MailchimpResponse = await res.json()

    return {
      status: 'ok',
      issues: data.campaigns.map((c) => ({
      id: c.id,
      title: c.settings.title || c.settings.subject_line,
      subject: c.settings.subject_line,
      sentAt: c.send_time,
      archiveUrl: c.long_archive_url || c.archive_url,
      })),
    }
  } catch {
    return { status: 'error', issues: [] }
  }
}
