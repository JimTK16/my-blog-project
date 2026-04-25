export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    /*
     * border-border   — semantic token, adapts light/dark.
     * bg-surface-tinted — slightly tinted well, warmer than raw bg.
     */
    <footer className='border-t border-border bg-surface-tinted py-12'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* Social links */}
        <div className='flex justify-center items-center'>
          <div className='flex gap-8 text-sm font-medium text-text-muted'>
            <a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-text'
            >
              GitHub
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-text'
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='mt-8 pt-8 border-t border-border flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest font-semibold text-text-subtle text-center'>
          <p>© {currentYear} Jimmy Vu. All Rights Reserved.</p>
          <p>Built with Next.js, Supabase, and Tailwind</p>
        </div>
      </div>
    </footer>
  )
}
