import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a TUBC member account to join trips and connect with the club.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
