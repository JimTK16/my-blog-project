'use client'

import { useState, useTransition } from 'react'
import { getPostsPage } from '@/lib/actions/posts'
import { PAGE_SIZE } from '@/lib/posts-config'
import { Post } from '@/types'
import PostCard from '@/components/blog/PostCard'

interface LoadMoreButtonProps {
  /** The next page index to load (0-based). After SSR loads page 0,
   *  pass `initialNextPage={1}` here. */
  initialNextPage: number
  /** Whether the server indicated more posts exist after the SSR batch. */
  initialHasMore: boolean
}

/**
 * LoadMoreButton
 *
 * Client Component that appends additional post pages to the home feed.
 * - Calls the `getPostsPage` Server Action on each click.
 * - Tracks all appended posts in local state and renders them with PostCard.
 * - Shows a CSS spinner (no extra dep) while loading.
 * - Hides the button and shows a friendly end message when hasMore → false.
 */
export function LoadMoreButton({
  initialNextPage,
  initialHasMore
}: LoadMoreButtonProps) {
  const [additionalPosts, setAdditionalPosts] = useState<Post[]>([])
  const [nextPage, setNextPage] = useState(initialNextPage)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isPending, startTransition] = useTransition()

  const loadMore = () => {
    startTransition(async () => {
      const result = await getPostsPage(nextPage, PAGE_SIZE)
      setAdditionalPosts((prev) => [...prev, ...result.posts])
      setNextPage((prev) => prev + 1)
      setHasMore(result.hasMore)
    })
  }

  return (
    <>
      {/* ── Appended posts — same grid as the SSR batch ─────────────── */}
      {additionalPosts.length > 0 && (
        <ul
          role='list'
          aria-label='More articles'
          className='grid grid-cols-1 gap-8 md:grid-cols-2'
        >
          {additionalPosts.map((post) => (
            <li
              key={post.id}
              role='listitem'
              className='animate-fade-in motion-reduce:animate-none'
            >
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}

      {/* ── Load More button / end message ──────────────────────────── */}
      <div className='mt-4 flex justify-center py-4'>
        {hasMore ? (
          <button
            onClick={loadMore}
            disabled={isPending}
            aria-label='Load more articles'
            className='flex min-h-[44px] items-center gap-2.5 rounded-full border
                       border-border px-8 py-3 text-sm font-medium text-text-muted
                       hover:border-primary-500 hover:text-primary-600
                       transition-colors disabled:opacity-60'
          >
            {isPending ? (
              <>
                {/* CSS-only spinner — no extra dependency */}
                <span
                  aria-hidden='true'
                  className='h-4 w-4 animate-spin rounded-full border-2
                             border-current border-t-transparent'
                />
                <span>Loading…</span>
              </>
            ) : (
              'Load more'
            )}
          </button>
        ) : (
          // Shown once all posts have been loaded
          <p
            aria-live='polite'
            className='animate-fade-in font-handwritten text-lg text-text-subtle
                       motion-reduce:animate-none'
          >
            You've reached the end 🎉
          </p>
        )}
      </div>
    </>
  )
}
