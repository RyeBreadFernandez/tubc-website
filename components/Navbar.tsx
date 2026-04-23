'use client'

import { useState, useEffect, useRef, startTransition } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import type { User } from '@supabase/supabase-js'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

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
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    startTransition(() => {
      setSheetOpen(false)
      setResourcesOpen(false)
      setMobileResourcesOpen(false)
    })
  }, [pathname])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const transparent = isHome && !scrolled && !sheetOpen

  return (
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
          <span className={`font-display text-xl font-bold tracking-tight transition-colors ${transparent ? 'text-parchment' : 'text-bark'}`}>
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
                  ? transparent ? 'text-parchment underline underline-offset-4' : 'text-primary'
                  : transparent ? 'text-parchment/80 hover:text-parchment' : 'text-muted-foreground hover:text-bark'
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
                  ? transparent ? 'text-parchment underline underline-offset-4' : 'text-primary'
                  : transparent ? 'text-parchment/80 hover:text-parchment' : 'text-muted-foreground hover:text-bark'
              }`}
            >
              Resources
              <svg className={`size-3.5 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {resourcesOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-parchment border border-border rounded-md shadow-lg py-1 z-50">
                {resourceLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-bark hover:bg-parchment-dark transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop right side */}
        {user && (
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/dashboard/new-trip"
              className="px-4 py-1.5 bg-primary hover:bg-terra-dark text-primary-foreground text-sm font-semibold rounded-md transition-colors"
            >
              Post a Trip
            </Link>
            <Link
              href="/dashboard"
              className={`size-8 rounded-md flex items-center justify-center text-sm font-bold transition-colors ${
                transparent ? 'bg-parchment/20 text-parchment hover:bg-parchment/30' : 'bg-secondary text-bark hover:bg-border'
              }`}
              title="Dashboard"
            >
              {user.email?.[0].toUpperCase() ?? 'U'}
            </Link>
            <button
              onClick={handleSignOut}
              className={`text-sm transition-colors ${transparent ? 'text-parchment/70 hover:text-parchment' : 'text-muted-foreground hover:text-bark'}`}
            >
              Sign out
            </button>
          </div>
        )}

        {/* Mobile hamburger — Sheet trigger */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            className={`lg:hidden p-2 rounded-md transition-colors ${transparent ? 'text-parchment hover:bg-parchment/10' : 'text-bark hover:bg-parchment-dark'}`}
            aria-label="Toggle menu"
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </SheetTrigger>

          <SheetContent side="right" className="w-72 bg-parchment p-0 flex flex-col">
            <SheetHeader className="px-6 h-16 flex flex-row items-center border-b border-border shrink-0">
              <SheetTitle className="font-display text-lg font-bold text-bark">Menu</SheetTitle>
            </SheetHeader>

            <div className="overflow-y-auto flex-1 px-4 py-4">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-colors ${
                    pathname === href ? 'bg-rose text-primary' : 'text-muted-foreground hover:bg-parchment-dark hover:text-bark'
                  }`}
                >
                  {label}
                </Link>
              ))}

              <div className="mt-2 mb-0.5">
                <button
                  onClick={() => setMobileResourcesOpen((o) => !o)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-parchment-dark hover:text-bark transition-colors"
                >
                  Resources
                  <svg className={`size-3.5 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileResourcesOpen && (
                  <div className="ml-3 mt-1 border-l-2 border-secondary pl-3">
                    {resourceLinks.map(({ label, href }) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-center px-2 py-2 text-sm text-muted-foreground hover:text-bark transition-colors"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {user && (
              <>
                <Separator />
                <div className="px-4 py-4 shrink-0 flex flex-col gap-2">
                  <Link
                    href="/dashboard/new-trip"
                    className="w-full text-center px-4 py-2.5 bg-primary hover:bg-terra-dark text-primary-foreground text-sm font-semibold rounded-md transition-colors"
                  >
                    Post a Trip
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-center px-4 py-2.5 text-muted-foreground hover:text-bark text-sm transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
