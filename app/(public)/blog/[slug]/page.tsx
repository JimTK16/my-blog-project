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

      {/* ── Main article ────────────────────────────────────────────────── */}
      <article className='mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-20'>
        {/* ── Post header ─────────────────────────────────────────────── */}
        <header className='mb-12'>
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

        {/* ── Like button — placed at the natural end of the article ────── */}
        <div className='mt-16 flex justify-center'>
          <LikeButton id={post.id} initialLikes={post.likes_count} />
        </div>

        {/* ── Personal sign-off ────────────────────────────────────────── */}
        <div
          aria-label="Author's sign-off"
          className='mt-20 border-y border-border py-12 text-center'
        >
          <p className='font-handwritten text-3xl text-text-muted'>
            Thanks for reading!
          </p>
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
