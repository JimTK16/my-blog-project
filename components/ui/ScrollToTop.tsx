'use client'

import { useEffect, useState } from 'react'

/**
 * ScrollToTop
 *
 * A circular button fixed to the bottom-right of the viewport.
 * Appears (slides up, fades in) after the user has scrolled 500 px.
 * Disappears (slides down, fades out) when back near the top.
 *
 * Accessibility:
 *  - aria-label="Scroll to top" for screen readers.
 *  - pointer-events-none when hidden so it can't be accidentally focused.
 *  - motion-reduce:transition-none collapses the enter/exit transition to
 *    instant for users who prefer reduced motion.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label='Scroll to top'
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center
                  justify-center rounded-full bg-accent-500 text-white
                  shadow-elevated hover:bg-accent-600 transition-all duration-300
                  motion-reduce:transition-none
                  ${
                    visible
                      ? 'opacity-100 translate-y-0'
                      : 'pointer-events-none opacity-0 translate-y-4'
                  }`}
    >
      <span aria-hidden='true' className='text-lg leading-none'>
        ↑
      </span>
    </button>
  )
}
