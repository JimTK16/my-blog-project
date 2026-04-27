import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "About Jimmy — Jimmy's Dev Blog",
  description:
    'A little about Jimmy Vu — software engineer, builder, and writer.'
}

/* Server Component — no interactivity needed */
export default function AboutPage() {
  return (
    <article className='mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-20'>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className='mb-12'>
        <p className='mb-3 font-handwritten text-xl text-accent-500'>
          ~ the person behind the blog
        </p>
        <h1
          className='font-heading text-4xl font-bold tracking-tight text-text
                     leading-tight md:text-5xl'
        >
          About
        </h1>
      </header>

      {/* ── Bio ────────────────────────────────────────────────────────── */}
      <div
        className='prose prose-lg md:prose-xl max-w-none
                   prose-headings:font-heading prose-headings:tracking-tight
                   prose-a:text-primary-600 prose-a:font-semibold
                   prose-blockquote:border-accent-400
                   prose-blockquote:font-handwritten'
      >
        <p>
          Hey — I'm Jimmy. I spend my days building things for the web and
          thinking about how to make them feel just right. This blog is my
          corner of the internet: a place to share what I'm learning, what I'm
          building, and the occasional opinion I can't quite let go of.
        </p>

        <p>
          I write about web development, system design, and the craft of
          building products people love. Some posts are deep dives, some are
          quick observations, and a few are just notes to future-me. All of them
          are honest.
        </p>

        <p>
          I'm drawn to tools, workflows, and the small details that separate a
          good experience from a great one. If you've ever used a piece of
          software and thought{' '}
          <em>&ldquo;someone really cared about this&rdquo;</em> — that's the
          feeling I'm chasing.
        </p>

        <h3>What I'm into</h3>
        <ul>
          <li>
            Open source — contributing, reading source code, learning from it
          </li>
          <li>TypeScript, React, Next.js — the stack I live in</li>
          <li>System design and the art of boring, reliable software</li>
          <li>Hiking and being away from screens (occasionally)</li>
          <li>A good book and a slow morning</li>
        </ul>

        <h3>This blog</h3>
        <p>
          The design is intentional — warm linen tones, handwritten accents,
          serif headings. I wanted it to feel like flipping through a well-worn
          notebook rather than skimming a tech feed. I built it with Next.js,
          Tailwind v4, and Supabase, and I'm quietly proud of how it turned out.
        </p>

        <blockquote>
          Writing is thinking. If I can't explain it clearly, I probably don't
          understand it yet.
        </blockquote>
      </div>

      {/* ── Sign-off ───────────────────────────────────────────────────── */}
      <div className='mt-16 border-t border-border pt-10'>
        <p className='font-handwritten text-2xl text-text-muted'>
          Thanks for stopping by.
        </p>
        <p className='mt-1 font-handwritten text-xl text-accent-500'>— Jimmy</p>

        <div className='mt-8'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-sm font-semibold
                       text-primary-600 underline decoration-accent-400
                       decoration-2 underline-offset-4
                       hover:decoration-accent-600 transition-colors'
          >
            ← Read the blog
          </Link>
        </div>
      </div>
    </article>
  )
}
