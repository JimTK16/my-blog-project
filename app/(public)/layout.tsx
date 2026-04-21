import Link from 'next/link'

export default function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen flex flex-col bg-white text-gray-900'>
      {/* Navigation Bar */}
      <header className='border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50'>
        <nav className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between'>
          <Link
            href='/'
            className='text-xl font-bold tracking-tight hover:text-blue-600 transition'
          >
            Jimmy's Dev Blog
          </Link>

          <div className='flex items-center gap-6 text-sm font-medium'>
            <Link href='/' className='hover:text-blue-600'>
              Home
            </Link>
            {/* Convenince link for you while developing */}
            <Link
              href='/dashboard'
              className='px-4 py-1.5 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition'
            >
              Dashboard
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className='grow'>{children}</main>

      {/* Footer */}
      <footer className='border-t border-gray-100 py-12 bg-gray-50'>
        <div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-gray-500'>
            © {new Date().getFullYear()} Jimmy Vu. Built with Next.js &
            Supabase.
          </p>
          <div className='flex gap-6 text-sm text-gray-400'>
            <a
              href='https://github.com'
              target='_blank'
              className='hover:text-gray-900'
            >
              GitHub
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              className='hover:text-gray-900'
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
