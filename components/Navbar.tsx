'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import type { User } from '@supabase/supabase-js'

const resourceLinks = [
  { label: 'Where to Go', href: '/resources/where-to-go' },
  { label: 'Trail Guides', href: '/resources/trail-guides' },
  { label: 'Packing List', href: '/resources/packing-list' },
  { label: 'Gear Rental', href: '/resources/gear-rental' },
  { label: 'How to Pack', href: '/resources/how-to-pack' },
  { label: 'Vocab', href: '/resources/vocab' },
  { label: 'Backcountry Cooking', href: '/resources/backcountry-cooking' },
  { label: 'First Aid', href: '/resources/first-aid' },
  { label: 'LA Hiking', href: '/resources/la-hiking' },
  { label: 'Parks & Monuments', href: '/resources/parks-monuments' },
  { label: 'Entrance Fees', href: '/resources/entrance-fees' },
  { label: 'Seminars', href: '/resources/seminars' },
]

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Trips', href: '/trips' },
  { label: 'Trip Logs', href: '/trip-logs' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'FAQ', href: '/faq' },
]

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const dropdownRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setResourcesOpen(false)
  }, [pathname])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const transparent = isHome && !scrolled && !mobileOpen

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          transparent
            ? 'bg-transparent'
            : 'bg-parchment/95 backdrop-blur-sm shadow-sm border-b border-border'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span
              className={`font-display text-xl font-bold tracking-tight transition-colors ${
                transparent ? 'text-parchment' : 'text-bark'
              }`}
            >
              TUBC
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? transparent
                      ? 'text-parchment underline underline-offset-4'
                      : 'text-terra'
                    : transparent
                    ? 'text-parchment/80 hover:text-parchment'
                    : 'text-soil hover:text-bark'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Resources dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setResourcesOpen((o) => !o)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  pathname.startsWith('/resources')
                    ? transparent
                      ? 'text-parchment underline underline-offset-4'
                      : 'text-terra'
                    : transparent
                    ? 'text-parchment/80 hover:text-parchment'
                    : 'text-soil hover:text-bark'
                }`}
              >
                Resources
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-parchment border border-border rounded-xl shadow-lg py-1 z-50">
                  {resourceLinks.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block px-4 py-2 text-sm text-soil hover:text-bark hover:bg-parchment-dark transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard/new-trip"
                  className="px-4 py-1.5 bg-terra hover:bg-terra-dark text-parchment text-sm font-semibold rounded-full transition-colors"
                >
                  Post a Trip
                </Link>
                <Link
                  href="/dashboard"
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    transparent
                      ? 'bg-parchment/20 text-parchment hover:bg-parchment/30'
                      : 'bg-sand text-bark hover:bg-border'
                  }`}
                  title="Dashboard"
                >
                  {user.email?.[0].toUpperCase() ?? 'U'}
                </Link>
                <button
                  onClick={handleSignOut}
                  className={`text-sm transition-colors ${
                    transparent ? 'text-parchment/70 hover:text-parchment' : 'text-soil hover:text-bark'
                  }`}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    transparent ? 'text-parchment/80 hover:text-parchment' : 'text-soil hover:text-bark'
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-1.5 bg-terra hover:bg-terra-dark text-parchment text-sm font-semibold rounded-full transition-colors"
                >
                  Join
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded-md transition-colors ${
              transparent ? 'text-parchment' : 'text-bark'
            }`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile menu slide-in */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-bark/30 transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-parchment shadow-xl transition-transform duration-300 flex flex-col ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-border shrink-0">
            <span className="font-display text-lg font-bold text-bark">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-soil hover:text-bark p-1"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto flex-1 px-4 py-4">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-colors ${
                  pathname === href ? 'bg-rose text-terra' : 'text-soil hover:bg-parchment-dark hover:text-bark'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Resources section */}
            <div className="mt-2 mb-0.5">
              <button
                onClick={() => setResourcesOpen((o) => !o)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-soil hover:bg-parchment-dark hover:text-bark transition-colors"
              >
                Resources
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {resourcesOpen && (
                <div className="ml-3 mt-1 border-l-2 border-sand pl-3">
                  {resourceLinks.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center px-2 py-2 text-sm text-soil hover:text-bark transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Auth buttons */}
          <div className="px-4 py-4 border-t border-border shrink-0">
            {user ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/dashboard/new-trip"
                  className="w-full text-center px-4 py-2.5 bg-terra hover:bg-terra-dark text-parchment text-sm font-semibold rounded-full transition-colors"
                >
                  Post a Trip
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-center px-4 py-2.5 text-soil hover:text-bark text-sm transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <a
                  href="https://jqkmlifwwqdhuwn-1314.slack.com/signup#/domain-signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center px-4 py-2.5 bg-terra hover:bg-terra-dark text-parchment text-sm font-semibold rounded-full transition-colors"
                >
                  Join the Club
                </a>
                <Link
                  href="/login"
                  className="w-full text-center px-4 py-2.5 text-soil hover:text-bark text-sm transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
