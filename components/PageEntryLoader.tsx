'use client'

import { useEffect, useState } from 'react'
import HikerLoadingScreen from '@/components/ui/HikerLoadingScreen'

// Shows the hiker animation once per browser session (first site entry only).
// sessionStorage persists across navigations but clears when the tab closes.
export default function PageEntryLoader() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Disabled — animation paused for redesign
    // if (!sessionStorage.getItem('tubc-entry-shown')) {
    //   sessionStorage.setItem('tubc-entry-shown', '1')
    //   setShow(true)
    //   const t = setTimeout(() => setShow(false), 2200)
    //   return () => clearTimeout(t)
    // }
  }, [])

  if (!show) return null
  return <HikerLoadingScreen immediate />
}
