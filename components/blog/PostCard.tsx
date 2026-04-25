import Link from 'next/link'
import { format } from 'date-fns'
import { Post } from '@/types'

/** Strip basic Markdown syntax to produce a plain-text excerpt. */
function getExcerpt(content: string, maxLen = 110): string {
  const stripped = content
    .replace(/#{1,6}\s+/gm, '') // headings
    .replace(/\*\*(.+?)\*\*/gs, '$1') // bold
    .replace(/\*(.+?)\*/gs, '$1') // italic
    .replace(/`(.+?)`/gs, '$1') // inline code
    .replace(/\[(.+?)\]\(.+?\)/gs, '$1') // links
    .replace(/!\[.*?\]\(.+?\)/gs, '') // images
    .replace(/\n+/g, ' ')
    .trim()

  return stripped.length > maxLen
    ? stripped.slice(0, maxLen).trimEnd() + '…'
    : stripped
}

/* ──────────────────────────────────────────────────────────────────────────
   PostCard — used in the 2-column grid below the featured post.
   Server Component (no interactivity needed — Link handles navigation).
   ────────────────────────────────────────────────────────────────────────── */
export default function PostCard({ post }: { post: Post }) {
  const excerpt = getExcerpt(post.content)

  return (
    <Link href={`/blog/${post.slug}`} className='group block h-full'>
      <article
        className='flex h-full flex-col overflow-hidden rounded-lg border border-border
                   bg-surface p-4 shadow-card hover:-translate-y-1 hover:shadow-elevated
                   transition-all duration-200'
        aria-label={post.title}
      >
        {/* ── Featured image ── */}
        <div className='mb-4 aspect-video w-full overflow-hidden rounded-md bg-surface-tinted'>
          {post.card_image_url ? (
            <img
              src={post.card_image_url}
              alt={post.title}
              className='h-full w-full rounded-md object-cover
                         group-hover:scale-105 transition-transform duration-500'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center'>
              <span
                className='font-handwritten text-xl text-text-subtle
                           group-hover:scale-105 transition-transform duration-500'
              >
                Jimmy's Blog
              </span>
            </div>
          )}
        </div>

        {/* ── Content ── */}
        <div className='flex grow flex-col'>
          {/* Date — Caveat handwritten font, terracotta accent colour */}
          <time
            dateTime={post.created_at}
            className='mb-2 block font-handwritten text-lg text-accent-500'
          >
            {format(new Date(post.created_at), 'MMMM d, yyyy')}
          </time>

          {/* Title — Lora serif heading */}
          <h2
            className='mb-2 font-heading text-xl font-bold tracking-tight
                       text-text leading-snug group-hover:text-primary-600
                       transition-colors'
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          {excerpt && (
            <p className='mb-4 line-clamp-2 text-sm leading-relaxed text-text-muted'>
              {excerpt}
            </p>
          )}

          {/* Footer row — read-more link + like count */}
          <div className='mt-auto flex items-center justify-between text-sm'>
            {/*
             * Custom underline: decoration-accent-400 (terracotta) at 2px thick,
             * offset 4px, transitions to darker on group-hover.
             */}
            <span
              className='font-semibold text-primary-600 underline decoration-accent-400
                         decoration-2 underline-offset-4 group-hover:decoration-accent-600
                         transition-colors'
            >
              Read more →
            </span>

            <span className='flex items-center gap-1 text-text-subtle'>
              {/* Semantic heart — visible label via sr-only */}
              <span aria-hidden='true'>♥</span>
              <span className='sr-only'>Likes: </span>
              {post.likes_count}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
