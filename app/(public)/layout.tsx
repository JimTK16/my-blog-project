import Link from 'next/link'

export default function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen flex flex-col bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900 font-sans'>
      {/* Floating Navigation Pill */}
      <header className='fixed top-6 left-0 right-0 z-50 flex justify-center px-4'>
        <nav className='flex items-center gap-6 px-6 py-3 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-2xl justify-between'>
          <Link
            href='/'
            className='text-lg font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-colors'
          >
            Jimmy's Blog
          </Link>

          <div className='flex items-center gap-4 sm:gap-6 text-sm font-medium'>
            <Link href='/' className='text-gray-600 hover:text-gray-900 transition-colors'>
              Home
            </Link>
            {/* Convenience link */}
            <Link
              href='/dashboard'
              className='px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors shadow-sm'
            >
              Dashboard
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content Area with padding for the fixed header */}
      <main className='grow pt-32'>{children}</main>

      {/* Modern Footer */}
      <footer className='border-t border-gray-100 py-16 bg-gradient-to-b from-white to-gray-50'>
        <div className='max-w-4xl mx-auto px-6 flex flex-col items-center gap-6'>
          <div className='flex gap-8 text-sm font-medium text-gray-500'>
            <a
              href='https://github.com'
              target='_blank'
              className='hover:text-gray-900 transition-colors'
            >
              GitHub
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              className='hover:text-gray-900 transition-colors'
            >
              Twitter
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              className='hover:text-gray-900 transition-colors'
            >
              LinkedIn
            </a>
          </div>
          <p className='text-sm text-gray-400'>
            © {new Date().getFullYear()} Jimmy Vu. Crafted with care using Next.js & Supabase.
          </p>
        </div>
      </footer>
    </div>
  )
}
