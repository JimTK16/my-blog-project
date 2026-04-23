export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='border-t border-gray-100 bg-white py-12'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* Social Links - Centered on one row */}
        <div className='flex justify-center items-center'>
          <div className='flex gap-8 text-sm font-medium text-gray-500'>
            <a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-900 transition-colors'
            >
              GitHub
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-900 transition-colors'
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom Bar - Centered and stacked on separate lines */}
        <div className='mt-8 pt-8 border-t border-gray-50 flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest font-semibold text-gray-400 text-center'>
          <p>© {currentYear} Jimmy Vu. All Rights Reserved.</p>
          <p>Build with Next.js, Supabase, and Tailwind</p>
        </div>
      </div>
    </footer>
  )
}
