import type { Metadata } from 'next'
import { faqs } from '@/data/faq'
import FAQClient from './FAQClient'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about The Backpacking Club at UCLA — how to join, gear rental, trip sign-ups, and what to expect on your first outing.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/faq',
  },
  openGraph: {
    title: 'FAQ | UCLA Backpacking Club',
    description: 'Answers to common questions about The Backpacking Club at UCLA — how to join, gear rental, trip sign-ups, and what to expect on your first outing.',
    url: 'https://www.uclabackpackingclub.com/faq',
    images: [{ url: '/staff-group.jpg', width: 1200, height: 630, alt: 'UCLA Backpacking Club' }],
    type: 'website',
  },
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <FAQClient />
    </>
  )
}
