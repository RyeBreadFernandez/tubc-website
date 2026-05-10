import type { Metadata } from 'next'
import AuthForm from '@/components/AuthForm'
import { login } from '@/app/auth/actions'
import { safeNextPath } from '@/lib/navigation'

export const metadata: Metadata = {
  title: 'Login | The Backpacking Club at UCLA',
  description: 'Officer login for The Backpacking Club at UCLA.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>
}) {
  const params = await searchParams
  const nextPath = safeNextPath(params.next)

  return (
    <AuthForm
      action={login}
      alternateHref={`/signup?next=${encodeURIComponent(nextPath)}`}
      alternateLabel="Need officer access?"
      buttonLabel="Sign in"
      intro="Sign in to review submitted trip reports and publish approved stories."
      mode="login"
      nextPath={nextPath}
      title="Sign in"
    />
  )
}
