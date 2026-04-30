'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ThemeToggle } from '@/components/public/ThemeToggle'
import { Suspense } from 'react'

function HeaderContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  /**
   * Intercept Home clicks only when we're already on the clean home page
   * (no query string). If there's a ?q= param, let the Link navigate to '/'
   * which clears the query and shows all posts again.
   */
  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === '/' && !searchParams.has('q')) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav
      className='flex w-full max-w-5xl items-center justify-between gap-4
                   border-none  px-6 py-3 '
      aria-label='Main navigation'
    >
      {/* Brand wordmark */}
      <Link
        href='/'
        onClick={handleHomeClick}
        className='shrink-0 text-lg font-bold tracking-tight text-text
                     hover:text-primary-600 transition-colors'
      >
        Jimmy's Blog
      </Link>

      {/* Nav links + theme toggle */}
      <div className='flex items-center gap-1 text-sm font-medium sm:gap-2'>
        <Link
          href='/'
          onClick={handleHomeClick}
          className='flex min-h-[44px] items-center px-3 text-text-muted
                       hover:text-text transition-colors rounded-full
                       hover:bg-surface-tinted'
        >
          Home
        </Link>

        <Link
          href='/about'
          className='flex min-h-[44px] items-center px-3 text-text-muted
                       hover:text-text transition-colors rounded-full
                       hover:bg-surface-tinted'
        >
          About
        </Link>

        {/* Light / dark toggle */}
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default function Header() {
  return (
    <header className='fixed  left-0 right-0 z-50 flex justify-center px-4 bg-background'>
      <Suspense
        fallback={
          <nav
            className='flex w-full max-w-5xl items-center justify-between gap-4
                       border-none  px-6 py-3 '
            aria-label='Main navigation'
          >
            <div className='shrink-0 text-lg font-bold tracking-tight text-text'>
              Jimmy's Blog
            </div>
            <div className='flex items-center gap-1 text-sm font-medium sm:gap-2'>
              <div className='flex min-h-[44px] items-center px-3 text-text-muted'>
                Home
              </div>
              <div className='flex min-h-[44px] items-center px-3 text-text-muted'>
                About
              </div>
            </div>
          </nav>
        }
      >
        <HeaderContent />
      </Suspense>
    </header>
  )
}
