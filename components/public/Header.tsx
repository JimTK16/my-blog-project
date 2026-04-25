'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const handleHomeClick = (e: React.MouseEvent) => {
    // If we are already on the home page, intercept the click
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // This gives it that professional, fluid feel
      })
    }
  }

  return (
    <header className='fixed top-6 left-0 right-0 z-50 flex justify-center px-4'>
      <nav className='flex items-center gap-6 px-6 py-3 bg-surface-glass backdrop-blur-xl border border-soil-200/50 rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-2xl justify-between'>
        <Link
          href='/'
          onClick={handleHomeClick}
          className='text-lg font-bold tracking-tight text-soil-900 hover:text-bloom-500 transition-colors'
        >
          Jimmy's Blog
        </Link>

        <div className='flex items-center gap-4 sm:gap-6 text-sm font-medium'>
          <Link
            href='/'
            onClick={handleHomeClick}
            className='text-soil-600 hover:text-soil-900 transition-colors'
          >
            Home
          </Link>

          <Link
            href='/dashboard'
            className='px-4 py-2 bg-soil-900 text-white rounded-full hover:bg-soil-800 transition-colors shadow-sm'
          >
            Dashboard
          </Link>
        </div>
      </nav>
    </header>
  )
}
