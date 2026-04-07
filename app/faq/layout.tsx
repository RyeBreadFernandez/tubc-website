import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about The Backpacking Club at UCLA — trips, membership, gear, and more.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
