import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

import { Lora, Geist, Caveat } from 'next/font/google'

/**
 * ─── HEADING FONT — Lora ────────────────────────────────────────────────────
 * A distinctive, elegant serif that pairs warmth with editorial credibility.
 * Variable font: weights 400–700 work automatically.
 * Injected as --font-lora, consumed by @theme as --font-heading.
 */
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap'
})

/**
 * ─── BODY FONT — Geist ──────────────────────────────────────────────────────
 * Vercel's clean geometric sans-serif. Highly legible at body sizes.
 * Injected as --font-geist-sans, consumed by @theme as --font-body.
 */
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap'
})

/**
 * ─── HANDWRITTEN FONT — Caveat ──────────────────────────────────────────────
 * Informal, friendly handwritten style for dates, pull quotes, captions.
 * Injected as --font-caveat, consumed by @theme as --font-handwritten.
 */
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Jimmy's Dev Blog",
  description: 'Join me on my journey to become a software developer',
  icons: {
    icon: '/favicon-photo-3.svg',
    shortcut: '/favicon-photo-3.svg'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    /*
     * suppressHydrationWarning — the anti-flash script below sets
     * data-theme before React hydrates, so the attribute will differ
     * between the SSR output (no attribute) and the client. This prop
     * silences the harmless mismatch warning.
     */
    <html
      lang='en'
      suppressHydrationWarning
      className={`${lora.variable} ${geistSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        {/*
         * Anti-flash theme script — runs synchronously before first paint.
         * Reads localStorage → falls back to prefers-color-scheme.
         * Sets data-theme on <html> so the correct CSS tokens are applied
         * before any CSS renders (eliminates the white flash on dark mode).
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',s||p);}catch(e){}})();`
          }}
        />
      </head>

      {/*
       * transition-colors duration-300 — smooth palette swap when data-theme
       * is toggled by ThemeToggle (background, text, borders all cross-fade).
       * bg-pattern — low-opacity SVG linen grain texture from globals.css.
       * font-body — Geist Sans via @theme token.
       */}
      <body className='min-h-full flex flex-col font-body bg-pattern transition-colors duration-300'>
        {children}
      </body>
    </html>
  )
}
