'use client'

import { useEffect, useRef } from 'react'

/**
 * CustomCursor
 *
 * A 12 px sage-green dot that follows the pointer on desktop/mouse devices.
 * - Skipped entirely on touch devices (`ontouchstart` / maxTouchPoints > 0).
 * - Skipped when the user prefers reduced motion.
 * - Hides the native cursor by adding `.cursor-none` to `<body>` (see globals.css).
 * - Uses `translate3d` + `will-change: transform` for GPU-composited movement
 *   (no layout repaints, no jank).
 * - `aria-hidden` — purely decorative.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Guard: skip on touch / stylus-only devices
    if (typeof window === 'undefined') return
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return
    // Guard: skip for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot = dotRef.current
    if (!dot) return

    // Hide the native OS cursor on this page
    document.body.classList.add('cursor-none')

    const onMouseMove = (e: MouseEvent) => {
      // Offset by half the dot's size (6 px) to centre it on the hot-spot
      dot.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`
      dot.style.opacity = '0.65'
    }
    const onMouseLeave = () => {
      dot.style.opacity = '0'
    }
    const onMouseEnter = () => {
      dot.style.opacity = '0.65'
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      document.body.classList.remove('cursor-none')
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden='true'
      className='pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3
                 rounded-full bg-primary-600 opacity-0 motion-reduce:hidden'
      style={{
        willChange: 'transform',
        transition: 'opacity 0.15s ease'
      }}
    />
  )
}
