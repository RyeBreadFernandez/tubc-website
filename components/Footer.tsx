import Link from 'next/link'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Trips', href: '/trips' },
  { label: 'Trip Logs', href: '/trip-logs' },
  { label: 'Resources', href: '/resources' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-parchment-dark border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Col 1 — Logo + tagline + socials */}
          <div>
            <span className="font-display text-2xl font-bold text-bark">TUBC</span>
            <p className="mt-2 text-soil text-sm leading-relaxed max-w-xs">
              Experience the outdoors without restrictions. The Backpacking Club at UCLA.
            </p>
            <div className="flex gap-4 mt-5">
              <a
                href="https://www.instagram.com/uclabackpackingclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-soil hover:text-terra transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/uclabackpackingclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-soil hover:text-terra transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@uclabackpackingclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-soil hover:text-terra transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Quick links */}
          <div>
            <h3 className="font-display text-bark font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-soil hover:text-terra transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact + newsletter */}
          <div>
            <h3 className="font-display text-bark font-semibold mb-4">Stay Connected</h3>
            <p className="text-sm text-soil mb-1">
              <a
                href="mailto:uclabackpackingclub@gmail.com"
                className="hover:text-terra transition-colors"
              >
                uclabackpackingclub@gmail.com
              </a>
            </p>
            <a
              href="https://join.slack.com/t/uclabackpackingclub/shared_invite"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 mb-5 text-sm text-terra hover:text-terra-dark font-medium transition-colors"
            >
              Join our Slack →
            </a>

            <p className="text-sm text-soil font-medium mb-2">Newsletter signup</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-3 py-2 text-sm bg-parchment border border-border rounded-lg text-bark placeholder-soil/60 focus:outline-none focus:border-terra transition-colors"
              />
              <button className="px-4 py-2 bg-terra hover:bg-terra-dark text-parchment text-sm font-semibold rounded-lg transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-soil/60 mt-2">No spam. Quarterly issues only.</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-soil/70">
            © {new Date().getFullYear()} The Backpacking Club at UCLA. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-soil/70">
            <Link href="/login" className="hover:text-terra transition-colors">Member Login</Link>
            <Link href="/signup" className="hover:text-terra transition-colors">Join</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
