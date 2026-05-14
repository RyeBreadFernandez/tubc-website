import type { Metadata } from 'next'
import { faqs } from '@/data/faq'
import FAQClient from './FAQClient'
import JsonLd from '@/components/JsonLd'
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about The Backpacking Club at UCLA — how to join, gear rental, trip sign-ups, and what to expect on your first outing.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/faq',
  },
  openGraph: {
    title: 'FAQ | The Backpacking Club at UCLA',
    description: 'Answers to common questions about The Backpacking Club at UCLA — how to join, gear rental, trip sign-ups, and what to expect on your first outing.',
    url: 'https://www.uclabackpackingclub.com/faq',
    images: [{ url: '/staff-group.jpg', width: 1200, height: 630, alt: 'UCLA Backpacking Club' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | The Backpacking Club at UCLA',
    description: 'Answers to common questions about The Backpacking Club at UCLA — how to join, gear rental, trip sign-ups, and what to expect on your first outing.',
    images: ['/staff-group.jpg'],
  },
}

export default function FAQPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }])} />
      <JsonLd
        data={webPageJsonLd({
          path: '/faq',
          name: 'FAQ',
          description: 'Answers to common questions about joining TUBC, gear rental, trip sign-ups, and first backpacking trips.',
        })}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': 'https://www.uclabackpackingclub.com/faq#faq',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }}
      />
      <FAQClient />
    </>
  )
}
