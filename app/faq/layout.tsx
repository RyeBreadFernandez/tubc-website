import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'New to backpacking? Get answers to common questions about joining TUBC, trip signups, gear, and what to expect on your first trip with UCLA\'s Backpacking Club.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/faq',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
