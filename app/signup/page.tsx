import type { Metadata } from 'next'
import AuthForm from '@/components/AuthForm'
import { signup } from '@/app/auth/actions'
import { safeNextPath } from '@/lib/navigation'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create an officer account for The Backpacking Club at UCLA.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>
}) {
  const params = await searchParams
  const nextPath = safeNextPath(params.next)

  return (
    <AuthForm
      action={signup}
      alternateHref={`/login?next=${encodeURIComponent(nextPath)}`}
      alternateLabel="Already have an account?"
      buttonLabel="Create account"
      intro="Create an account first, then ask a site admin to add your email to the officer allowlist."
      mode="signup"
      nextPath={nextPath}
      title="Create account"
    />
  )
}
