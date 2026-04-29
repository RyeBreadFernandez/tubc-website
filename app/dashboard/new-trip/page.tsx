import type { Metadata } from 'next'
import NewTripClient from './NewTripClient'

export const metadata: Metadata = {
  title: 'Write a Trip Report',
  description: 'Submit a trip report to The Backpacking Club at UCLA.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NewTripPage() {
  return <NewTripClient />
}
