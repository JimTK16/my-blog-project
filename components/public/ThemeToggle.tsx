'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch (_) {
    /* localStorage blocked (private mode etc.) */
  }
}

/**
 * ThemeToggle
 *
 * Flips the `data-theme` attribute on `<html>` between "light" and "dark".
 * The active theme is persisted in localStorage and restored by the
 * anti-flash inline script in app/layout.tsx on every subsequent page load.
 *
 * Renders a placeholder `<div>` before hydration to avoid layout shift
 * (the button size is reserved in the nav bar).
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Read the theme that the anti-flash script already applied
    const applied = document.documentElement.getAttribute(
      'data-theme'
    ) as Theme | null
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    setTheme(applied ?? stored ?? getSystemTheme())
    setMounted(true)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    applyTheme(next)
    setTheme(next)
  }

  // Reserve space in the nav before client JS runs — avoids layout shift
  if (!mounted) {
    return <div className='h-11 w-11' aria-hidden='true' />
  }

  return (
    <button
      onClick={toggle}
      aria-label={
        theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
      }
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className='flex h-11 w-11 items-center justify-center rounded-full
                 text-text-muted hover:bg-surface-tinted hover:text-text
                 transition-colors'
    >
      {/* Moon = go dark, Sun = go light */}
      <span aria-hidden='true' className='text-base leading-none select-none'>
        {theme === 'light' ? '☾' : '☀'}
      </span>
    </button>
  )
}
