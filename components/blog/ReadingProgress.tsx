'use client'

import { useEffect, useState } from 'react'

/**
 * ReadingProgress
 *
 * A 1px tall bar fixed to the very top of the viewport (z-50, above the
 * floating nav) that tracks how far the user has scrolled through the page.
 *
 * Accessibility:
 *  - role="progressbar" + aria-valuenow/min/max for screen readers.
 *  - motion-reduce:hidden removes the bar entirely when the OS preference
 *    "Reduce motion" is enabled (no visible animation at all).
 *
 * Width is driven by inline style (dynamic value) + transition-width utility
 * for a smooth, low-jank transition at 150 ms.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const scrollTop = el.scrollTop
      const scrollHeight = el.scrollHeight - el.clientHeight
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      setProgress(Math.min(100, pct))
    }

    // passive: true → browser can scroll without waiting for the handler
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      role='progressbar'
      aria-label='Reading progress'
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className='fixed left-0 top-0 z-50 h-1 bg-accent-400
                 transition-width duration-150 ease-linear
                 motion-reduce:hidden'
      style={{ width: `${progress}%` }}
    />
  )
}
