'use client'

import { useEffect, useRef, useState } from 'react'

interface StaffBioProps {
  bio: string
}

export default function StaffBio({ bio }: StaffBioProps) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [clamped, setClamped] = useState(false)

  useEffect(() => {
    if (expanded) return
    const el = textRef.current
    if (!el) return
    const check = () => setClamped(el.scrollHeight > el.clientHeight + 1)
    check()
    const observer = new ResizeObserver(check)
    observer.observe(el)
    return () => observer.disconnect()
  }, [expanded])

  return (
    <div>
      <p
        ref={textRef}
        className={`text-muted-foreground text-sm leading-relaxed ${expanded ? '' : 'line-clamp-4'}`}
      >
        {bio}
      </p>
      {(clamped || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-1 text-primary text-sm font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  )
}
