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

export async function fetchNewsletters(): Promise<MailchimpNewsletter[]> {
  const apiKey = process.env.MAILCHIMP_API_KEY
  if (!apiKey) return []

  // API key format: <key>-<dc> e.g. abc123-us14
  const dc = apiKey.split('-').pop()
  if (!dc) return []

  const url = `https://${dc}.api.mailchimp.com/3.0/campaigns?status=sent&type=regular&count=50&sort_field=send_time&sort_dir=DESC`

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      },
      cache: 'no-store',
    })

    if (!res.ok) return []

    const data: MailchimpResponse = await res.json()

    return data.campaigns.map((c) => ({
      id: c.id,
      title: c.settings.title || c.settings.subject_line,
      subject: c.settings.subject_line,
      sentAt: c.send_time,
      archiveUrl: c.long_archive_url || c.archive_url,
    }))
  } catch {
    return []
  }
}
