'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import type { AuthFormState } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type AuthAction = (state: AuthFormState, formData: FormData) => Promise<AuthFormState>

interface AuthFormProps {
  action: AuthAction
  alternateHref: string
  alternateLabel: string
  buttonLabel: string
  intro: string
  mode: 'login' | 'signup'
  nextPath: string
  title: string
}

export default function AuthForm({
  action,
  alternateHref,
  alternateLabel,
  buttonLabel,
  intro,
  mode,
  nextPath,
  title,
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, {})

  return (
    <main id="main-content" className="flex-1 pt-16 bg-parchment min-h-screen">
      <section className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
            Officer access
          </p>
          <h1 className="font-display text-4xl text-bark font-bold">{title}</h1>
          <p className="text-muted-foreground mt-3">{intro}</p>

          <form action={formAction} className="mt-8 space-y-5">
            <input type="hidden" name="next" value={nextPath} />
            <div className="space-y-2">
              <Label htmlFor={`${mode}-email`}>Email</Label>
              <Input
                id={`${mode}-email`}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@ucla.edu"
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${mode}-password`}>Password</Label>
              <Input
                id={`${mode}-password`}
                name="password"
                type="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                minLength={8}
                required
                className="h-11"
              />
            </div>

            {state.message && (
              <p
                role={state.success ? 'status' : 'alert'}
                className={`rounded-md border px-3 py-2 text-sm ${
                  state.success
                    ? 'border-moss bg-moss/40 text-forest'
                    : 'border-destructive/30 bg-destructive/10 text-destructive'
                }`}
              >
                {state.message}
              </p>
            )}

            <Button type="submit" disabled={pending} className="w-full h-11">
              {pending ? 'Working...' : buttonLabel}
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            {alternateLabel}{' '}
            <Link href={alternateHref} className="font-semibold text-primary hover:text-terra-dark">
              {mode === 'login' ? 'Create an account' : 'Sign in'}
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
