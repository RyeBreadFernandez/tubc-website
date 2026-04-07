import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Post a Trip Log',
  description: 'Share your trip report with The Backpacking Club at UCLA.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
