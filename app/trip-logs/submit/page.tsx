import type { Metadata } from 'next'
import SubmitTripClient from './SubmitTripClient'

export const metadata: Metadata = {
  title: 'Submit a Trip Log',
  description: 'Share your trip report with The Backpacking Club at UCLA. Reports are reviewed before publishing.',
  robots: { index: false },
}

export default function SubmitTripPage() {
  return <SubmitTripClient />
}
