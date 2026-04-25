import { getAllPosts, searchPosts } from '@/lib/actions/posts'
import { format } from 'date-fns'
import Link from 'next/link'
import { Post } from '@/types'
import PostCard from './PostCard'
import SearchBar from '../public/SearchBar'

interface PostListProps {
  query?: string
}

/** Strip basic Markdown syntax to produce a plain-text excerpt. */
function getExcerpt(content: string, maxLen = 160): string {
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

/** Staggered animation delays for grid cards (cycles for > 6 posts) */
const CARD_DELAYS = [
  'anim-delay-0',
  'anim-delay-100',
  'anim-delay-200',
  'anim-delay-300',
  'anim-delay-400',
  'anim-delay-500'
]

/* ──────────────────────────────────────────────────────────────────────────
   Server Component — data fetched at request time, no client JS needed.
   ────────────────────────────────────────────────────────────────────────── */
export async function PostList({ query }: PostListProps) {
  const posts = query ? await searchPosts(query) : await getAllPosts(true)
  const [featuredPost, ...restPosts] = posts

  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6 pb-24'>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        aria-label='Blog introduction'
        className='relative -mx-4 sm:-mx-6 mb-14 overflow-hidden rounded-b-3xl
                   bg-gradient-to-br from-primary-100/50 to-background
                   px-6 py-16 sm:px-12 sm:py-20'
      >
        {/* Monogram avatar — first element, no delay */}
        <div
          aria-hidden='true'
          className='mb-6 flex h-16 w-16 items-center justify-center rounded-2xl
                     bg-primary-600 text-2xl font-extrabold text-text-inverse shadow-card
                     animate-fade-in-up anim-delay-0 motion-reduce:animate-none'
        >
          JV
        </div>

        {/*
         * Heading — each word is wrapped in an inline-block <span> so it can
         * animate independently (fade + slide-up) with a 100 ms stagger.
         * motion-reduce:animate-none disables the animation for users who
         * prefer reduced motion (Tailwind v4 variant).
         */}
        <h1
          className='mb-4 max-w-2xl font-heading text-fluid-4xl font-extrabold
                     tracking-tight text-text'
        >
          {/* Line 1 words — staggered 100 ms apart */}
          {(
            [
              ['Writing', 'anim-delay-100'],
              ['about', 'anim-delay-200'],
              ['code,', 'anim-delay-300']
            ] as const
          ).map(([word, delay]) => (
            <span
              key={word}
              className={`inline-block animate-fade-in-up motion-reduce:animate-none ${delay}`}
            >
              {word}&nbsp;
            </span>
          ))}

          <br className='hidden md:block' />

          {/* Line 2 — botanical gradient, slightly longer delay */}
          <span
            className='text-botanical inline-block animate-fade-in-up
                       anim-delay-400 motion-reduce:animate-none'
          >
            design & building things.
          </span>
        </h1>

        {/* Handwritten tagline */}
        <p
          aria-label='Tagline'
          className='mb-5 font-handwritten text-fluid-xl text-accent-500
                     animate-fade-in-up anim-delay-500 motion-reduce:animate-none'
        >
          — a digital garden, tended with care
        </p>

        {/* Body paragraph */}
        <p
          className='max-w-xl text-fluid-base leading-relaxed text-text-muted
                     animate-fade-in-up anim-delay-600 motion-reduce:animate-none'
        >
          I'm Jimmy — a software engineer sharing thoughts on web dev, system
          design, and the craft of building products people love.
        </p>
      </section>

      {/* ── Search ────────────────────────────────────────────────────────── */}
      <div className='mb-12'>
        <SearchBar />

        {query && (
          <p className='mt-3 text-center text-sm text-text-muted'>
            Results for{' '}
            <span className='font-bold italic text-text'>
              &ldquo;{query}&rdquo;
            </span>
          </p>
        )}
      </div>

      {/* ── Empty state ───────────────────────────────────────────────────── */}
      {posts.length === 0 && (
        <div className='rounded-lg border border-border bg-surface p-16 text-center'>
          <p className='text-lg text-text-muted'>
            {query
              ? `No articles match "${query}".`
              : 'No articles yet — check back soon!'}
          </p>
        </div>
      )}

      {/* ── Posts ─────────────────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <div className='space-y-8'>
          {/*
           * Latest post — full-width featured card.
           * Animates after the hero (anim-delay-200 is relative to page load,
           * hero content finishes at ~600 ms so this overlaps nicely).
           */}
          <div
            className='animate-fade-in-up anim-delay-200
                       motion-reduce:animate-none'
          >
            <FeaturedCard post={featuredPost} />
          </div>

          {/* Remaining posts — responsive 2-column grid with staggered fade */}
          {restPosts.length > 0 && (
            <ul
              role='list'
              aria-label='More articles'
              className='grid grid-cols-1 gap-8 md:grid-cols-2'
            >
              {restPosts.map((post, index) => (
                <li
                  key={post.id}
                  role='listitem'
                  className={`animate-fade-in-up motion-reduce:animate-none
                              ${CARD_DELAYS[index % CARD_DELAYS.length]}`}
                >
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   FeaturedCard — latest post, full-width, horizontal on md+
   ────────────────────────────────────────────────────────────────────────── */
function FeaturedCard({ post }: { post: Post }) {
  const excerpt = getExcerpt(post.content)

  return (
    <article
      aria-label={`Featured post: ${post.title}`}
      className='group relative overflow-hidden rounded-xl border border-border
                 bg-surface shadow-card hover:-translate-y-1 hover:shadow-elevated
                 transition-all duration-200 motion-reduce:transition-none'
    >
      {/* "Latest" badge */}
      <div
        aria-label='Latest post'
        className='absolute left-4 top-4 z-10 rounded-full bg-primary-600
                   px-3 py-1 text-[11px] font-bold uppercase tracking-widest
                   text-text-inverse shadow-sm'
      >
        Latest
      </div>

      {/* The entire card is one link for clean keyboard / screen-reader nav */}
      <Link href={`/blog/${post.slug}`} className='flex flex-col md:flex-row'>
        {/* ── Image ── */}
        <div
          className='aspect-video w-full overflow-hidden bg-surface-tinted
                     md:aspect-auto md:w-1/2 md:shrink-0'
        >
          {post.card_image_url ? (
            <img
              src={post.card_image_url}
              alt={post.title}
              className='h-full w-full rounded-md object-cover
                         group-hover:scale-105 transition-transform duration-300
                         motion-reduce:transition-none'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center'>
              <span className='font-handwritten text-3xl text-text-subtle'>
                Jimmy's Blog
              </span>
            </div>
          )}
        </div>

        {/* ── Content ── */}
        <div className='flex flex-col justify-center p-8 md:p-10'>
          {/* Date — handwritten font in accent terracotta */}
          <time
            dateTime={post.created_at}
            className='mb-3 block font-handwritten text-xl text-accent-500'
          >
            {format(new Date(post.created_at), 'MMMM d, yyyy')}
          </time>

          <h2
            className='mb-3 font-heading text-fluid-2xl font-bold tracking-tight
                       text-text leading-tight group-hover:text-primary-600
                       transition-colors motion-reduce:transition-none'
          >
            {post.title}
          </h2>

          {excerpt && (
            <p className='mb-6 line-clamp-3 text-sm leading-relaxed text-text-muted'>
              {excerpt}
            </p>
          )}

          {/* "Read more" — custom underline in terracotta accent */}
          <span
            className='inline-flex w-fit items-center gap-1 text-sm font-semibold
                       text-primary-600 underline decoration-accent-400 decoration-2
                       underline-offset-4 group-hover:decoration-accent-600
                       transition-colors motion-reduce:transition-none'
          >
            Read more →
          </span>
        </div>
      </Link>
    </article>
  )
}

export default PostList
