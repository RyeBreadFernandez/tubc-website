import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | The Backpacking Club at UCLA',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardPage() {
  redirect('/dashboard/review')
}
