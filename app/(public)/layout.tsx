import Footer from '@/components/public/Footer'
import Header from '@/components/public/Header'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { CustomCursor } from '@/components/ui/CustomCursor'

export default function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    /*
     * bg-background  — uses the semantic token from @theme (warm linen in light,
     *                   dark ink in dark mode). Replaces the hardcoded bg-soil-50.
     * text-text       — same semantic approach, adapts to dark mode automatically.
     * min-h-screen    — ensures the footer is pushed to the bottom on short pages.
     */
    <div className='min-h-screen flex flex-col bg-background text-text'>
      <Header />

      {/*
       * grow          — fills remaining vertical space between Header and Footer.
       * pt-28         — clears the fixed floating nav bar (≈ top-6 + nav height).
       * The individual page components (PostList, PostPage) own their own
       * max-w-* and mx-auto centering so we keep <main> padding-agnostic here.
       */}
      <main className='grow pt-28'>{children}</main>

      <Footer />

      {/* Floating "back to top" button — Client Component, appears after 500 px scroll */}
      <ScrollToTop />

      {/* Custom sage-green dot cursor — desktop/mouse only, touch devices skipped */}
      <CustomCursor />
    </div>
  )
}
