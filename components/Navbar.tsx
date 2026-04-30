'use client'

import { useState, useEffect, useRef, startTransition } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

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
  const [scrolled, setScrolled] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  const transparent = isHome && !scrolled && !sheetOpen

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent'
          : 'bg-parchment/95 backdrop-blur-sm shadow-sm border-b border-border'
      }`}
    >
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link
          href="/"
          scroll={false}
          onClick={() => {
            const start = window.scrollY
            const duration = 1600
            const startTime = performance.now()
            const easeInOutQuint = (t: number) =>
              t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
            const step = (now: number) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              window.scrollTo(0, start * (1 - easeInOutQuint(progress)))
              if (progress < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
          }}
          className="flex items-center gap-2 shrink-0"
        >
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
              aria-current={pathname === href ? 'page' : undefined}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                transparent ? '[text-shadow:0_1px_6px_rgba(0,0,0,0.5)]' : ''
              } ${
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
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
              aria-controls="resources-dropdown"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                transparent ? '[text-shadow:0_1px_6px_rgba(0,0,0,0.5)]' : ''
              } ${
                pathname.startsWith('/resources')
                  ? transparent ? 'text-parchment underline underline-offset-4' : 'text-primary'
                  : transparent ? 'text-parchment/80 hover:text-parchment' : 'text-muted-foreground hover:text-bark'
              }`}
            >
              Resources
              <svg className={`size-3.5 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {resourcesOpen && (
              <div
                id="resources-dropdown"
                role="menu"
                className="absolute top-full left-0 mt-1 w-52 bg-parchment border border-border rounded-md shadow-md py-1 z-50"
              >
                {resourceLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    role="menuitem"
                    className={`block px-4 py-2 text-sm transition-colors ${
                      pathname === href ? 'text-primary font-medium' : 'text-muted-foreground hover:text-bark hover:bg-parchment-dark'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop right — always-visible Post a Trip */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/trip-logs/submit"
            className="px-4 py-1.5 bg-primary hover:bg-terra-dark text-primary-foreground text-sm font-semibold rounded-md transition-colors"
          >
            Post a Trip
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            className={`lg:hidden p-3 rounded-md transition-colors ${transparent ? 'text-parchment hover:bg-parchment/10' : 'text-bark hover:bg-parchment-dark'}`}
            aria-label="Open navigation menu"
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
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
                  aria-current={pathname === href ? 'page' : undefined}
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
                  aria-expanded={mobileResourcesOpen}
                  aria-controls="mobile-resources-menu"
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-parchment-dark hover:text-bark transition-colors"
                >
                  Resources
                  <svg className={`size-3.5 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileResourcesOpen && (
                  <div id="mobile-resources-menu" className="ml-3 mt-1 border-l-2 border-secondary pl-3">
                    {resourceLinks.map(({ label, href }) => (
                      <Link
                        key={href}
                        href={href}
                        aria-current={pathname === href ? 'page' : undefined}
                        className="flex items-center px-2 py-2 text-sm text-muted-foreground hover:text-bark transition-colors"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Always-visible Post a Trip in mobile sheet */}
            <div className="px-4 py-4 border-t border-border shrink-0">
              <Link
                href="/trip-logs/submit"
                className="w-full text-center block px-4 py-2.5 bg-primary hover:bg-terra-dark text-primary-foreground text-sm font-semibold rounded-md transition-colors"
              >
                Post a Trip
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
