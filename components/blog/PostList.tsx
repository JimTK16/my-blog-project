import { searchPosts, getPostsPage } from '@/lib/actions/posts'
import Link from 'next/link'
import { Post } from '@/types'
import PostCard from './PostCard'
import SearchBar from '../public/SearchBar'
import { LoadMoreButton } from './LoadMoreButton'

interface PostListProps {
  query?: string
}

/* ──────────────────────────────────────────────────────────────────────────
   PostList — Server Component
   
   Home feed: SSR renders the first page (page 0) as a flat grid of PostCards.
              A client-side <LoadMoreButton> appends subsequent pages.
   
   Search results: All matching posts are fetched and shown in a flat grid.
   ────────────────────────────────────────────────────────────────────────── */
export async function PostList({ query }: PostListProps) {
  let posts: Post[] = []
  let hasMore = false

  if (query) {
    posts = await searchPosts(query)
  } else {
    const result = await getPostsPage(0)
    posts = result.posts
    hasMore = result.hasMore
  }

  return (
    <div className='mx-auto max-w-5xl px-4 pb-24 sm:px-6'>
      {/* ── Search ─────────────────────────────────────────────────────── */}
      <div className='mb-6'>
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

      {/* ── Tagline — home feed only ─────────────────────────────────── */}
      {!query && (
        <p
          aria-label='Blog tagline'
          className='mb-10 text-center font-handwritten text-lg text-accent-500
                     sm:text-xl animate-fade-in motion-reduce:animate-none'
        >
          — a digital garden, tended with care
        </p>
      )}

      {/* ── Empty state ─────────────────────────────────────────────────── */}
      {posts.length === 0 && (
        <div className='rounded-lg border border-border bg-surface p-16 text-center'>
          <p className='text-lg text-text-muted'>
            {query
              ? `No articles match "${query}".`
              : 'No articles yet — check back soon!'}
          </p>
        </div>
      )}

      {/* ── Unified Post Grid ───────────────────────────────────────────── */}
      {posts.length > 0 && (
        <div className='space-y-6'>
          <ul
            role='list'
            aria-label={query ? 'Search results' : 'Recent articles'}
            className='grid grid-cols-1 gap-8 md:grid-cols-2'
          >
            {posts.map((post) => (
              <li
                key={post.id}
                role='listitem'
                className='animate-fade-in motion-reduce:animate-none'
              >
                <PostCard post={post} />
              </li>
            ))}
          </ul>

          {/* LoadMore appends more pages to the grid on the home feed */}
          {!query && hasMore && (
            <LoadMoreButton initialNextPage={1} initialHasMore={hasMore} />
          )}
        </div>
      )}
    </div>
  )
}

export default PostList
