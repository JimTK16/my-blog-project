'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/public/ThemeToggle'

export default function Header() {
  const pathname = usePathname()

  const handleHomeClick = (e: React.MouseEvent) => {
    // If we are already on the home page, intercept the click
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    /*
     * Fixed floating pill nav — sits above content with z-50.
     * surface-glass  — custom @utility: backdrop-blur + semi-transparent bg.
     * border-border  — semantic border token (adapts light/dark).
     */
    <header className='fixed top-6 left-0 right-0 z-50 flex justify-center px-4'>
      <nav
        className='surface-glass flex w-full max-w-2xl items-center justify-between
                   gap-4 rounded-full border border-border/60 px-5 py-2
                   shadow-sm hover:shadow-md transition-shadow'
        aria-label='Main navigation'
      >
        {/* Brand wordmark */}
        <Link
          href='/'
          onClick={handleHomeClick}
          className='text-lg font-bold tracking-tight text-text hover:text-primary-500'
        >
          Jimmy's Blog
        </Link>

        {/* Nav links + theme toggle */}
        <div className='flex items-center gap-2 sm:gap-4 text-sm font-medium'>
          <Link
            href='/'
            onClick={handleHomeClick}
            className='min-h-[44px] flex items-center text-text-muted hover:text-text
                       transition-colors px-2'
          >
            Home
          </Link>

          {/*
           * CTA pill — linen-900 bg (deep warm charcoal in light,
           * cream in dark via @theme remapping) + text-text-inverse.
           */}
          <Link
            href='/dashboard'
            className='min-h-[44px] flex items-center rounded-full bg-linen-900
                       px-4 py-2 text-text-inverse shadow-sm
                       hover:bg-linen-700 transition-colors'
          >
            Dashboard
          </Link>

          {/* Light / dark toggle — Client Component */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
