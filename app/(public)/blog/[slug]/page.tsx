import { getPostBySlug } from '@/lib/actions/posts'
import { createClient } from '@/lib/supabase/server'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer'
import LikeButton from '@/components/blog/LikeButton'
import BackButton from '@/components/ui/BackButton'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'

/** Estimate reading time at ~200 words per minute. */
function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min read`
}

/* ──────────────────────────────────────────────────────────────────────────
   Server Component — fetches post + auth state server-side.
   ────────────────────────────────────────────────────────────────────────── */
export default async function PostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Parallel fetch: post data + auth check
  const [post, supabase] = await Promise.all([
    getPostBySlug(slug),
    createClient()
  ])

  if (!post) notFound()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  const readingTime = getReadingTime(post.content)

  return (
    <>
      {/* ── Reading progress bar — fixed top-0 z-50, Client Component ── */}
      <ReadingProgress />

      {/* ── Sticky reading bar ──────────────────────────────────────────── */}
      {/*
       * sticky top-20  — sticks just below the floating pill nav (≈72px tall).
       * backdrop-blur-md bg-background/80 — frosted glass effect.
       * z-10 (below z-50 floating nav, above page content).
       */}
      <div
        className='sticky top-20 z-10 border-b border-border/60
                   bg-background/80 backdrop-blur-md'
      >
        <div
          className='mx-auto flex max-w-3xl items-center justify-between
                        gap-4 px-4 py-3 sm:px-6'
        >
          {/* Back link */}
          <Link
            href='/'
            className='flex shrink-0 items-center gap-1.5 text-sm font-medium
                       text-text-muted hover:text-text'
          >
            <span aria-hidden='true'>←</span>
            <span>Blog</span>
          </Link>

          {/* Truncated post title — appears only on sm+ */}
          <p className='hidden truncate text-sm font-medium text-text sm:block'>
            {post.title}
          </p>

          {/* Right side: reading time + optional edit button */}
          <div className='flex shrink-0 items-center gap-3'>
            <span className='hidden font-handwritten text-sm text-text-subtle sm:block'>
              {readingTime}
            </span>

            {/* Edit button — shown only to authenticated admin */}
            {user && (
              <Link
                href={`/edit/${post.id}`}
                aria-label='Edit this post'
                title='Edit post'
                className='flex h-11 w-11 items-center justify-center rounded-md
                           border border-border text-text-subtle text-xs
                           hover:border-primary-300 hover:bg-primary-50
                           hover:text-primary-600'
              >
                ✏
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Main article ────────────────────────────────────────────────── */}
      <article className='mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-20'>
        {/* ── Post header ─────────────────────────────────────────────── */}
        <header className='mb-12'>
          {/* Handwritten category / style badge above title */}
          <p
            aria-label='Post category'
            className='mb-3 font-handwritten text-xl text-accent-500'
          >
            ~ Software Engineering
          </p>

          {/* Title */}
          <h1
            className='font-heading text-4xl font-bold tracking-tight text-text
                       leading-tight md:text-5xl'
          >
            {post.title}
          </h1>

          {/* Decorative coloured rule */}
          <div
            aria-hidden='true'
            className='mt-4 mb-8 h-1 w-16 rounded-full bg-accent-400'
          />

          {/* Meta — date + reading time in Caveat handwritten font */}
          <div
            className='mb-8 flex flex-wrap items-center gap-x-6 gap-y-1
                          font-handwritten text-lg text-text-muted'
          >
            <time dateTime={post.created_at}>
              {format(new Date(post.created_at), 'MMMM d, yyyy')}
            </time>
            <span aria-label={`Reading time: ${readingTime}`}>
              {readingTime}
            </span>
          </div>

          {/* Author card + LikeButton */}
          <div
            className='flex flex-col gap-4 border-y border-border py-5
                       sm:flex-row sm:items-center sm:justify-between'
          >
            {/* Author */}
            <div className='flex items-center gap-3'>
              <div
                aria-hidden='true'
                className='flex h-10 w-10 shrink-0 items-center justify-center
                           rounded-full bg-primary-600 text-sm font-bold
                           text-text-inverse shadow-card'
              >
                JV
              </div>
              <div>
                <p className='text-sm font-bold text-text'>Jimmy Vu</p>
                <p className='text-xs text-text-muted'>Software Engineer</p>
              </div>
            </div>

            <LikeButton id={post.id} initialLikes={post.likes_count} />
          </div>
        </header>

        {/* ── Featured image ───────────────────────────────────────────── */}
        {post.card_image_url && (
          <figure className='mb-12'>
            <img
              src={post.card_image_url}
              alt={post.title}
              className='aspect-video w-full rounded-lg border border-border/50
                         object-cover shadow-md'
            />
          </figure>
        )}

        {/* ── Markdown content ─────────────────────────────────────────── */}
        {/*
         * prose prose-lg md:prose-xl — @tailwindcss/typography sizing.
         * The colour tokens (prose-body, prose-headings, etc.) are already
         * mapped to Soft Botanical design tokens in globals.css .prose vars.
         * The additional prose-* modifier classes below refine specifics.
         */}
        <section
          aria-label='Article content'
          className='prose prose-lg md:prose-xl max-w-none
                     prose-headings:font-heading prose-headings:tracking-tight
                     prose-a:text-primary-600 prose-a:font-semibold
                     prose-blockquote:border-accent-400
                     prose-blockquote:font-handwritten prose-blockquote:text-lg
                     prose-img:rounded-lg prose-img:shadow-md
                     prose-pre:rounded-lg prose-pre:bg-linen-900
                     prose-code:rounded prose-code:bg-primary-50
                     prose-code:text-primary-700'
        >
          <MarkdownRenderer content={post.content} />
        </section>

        {/* ── Personal sign-off ────────────────────────────────────────── */}
        <div
          aria-label="Author's sign-off"
          className='mt-20 border-y border-border py-12 text-center'
        >
          <p className='font-handwritten text-3xl text-text-muted'>
            Thanks for reading!
          </p>
          <p className='mt-2 font-handwritten text-2xl text-accent-500'>
            — Jimmy Vu
          </p>
          {/* Logo monogram */}
          <div
            aria-hidden='true'
            className='mx-auto mt-5 flex h-12 w-12 items-center justify-center
                       rounded-xl bg-primary-600 text-base font-extrabold
                       text-text-inverse shadow-card'
          >
            JV
          </div>
        </div>

        {/* ── Footer nav ───────────────────────────────────────────────── */}
        <footer className='mt-8 flex items-center justify-between gap-4'>
          <BackButton />
          <span className='font-handwritten text-lg text-text-subtle'>
            ♥ see you next time
          </span>
        </footer>
      </article>
    </>
  )
}
