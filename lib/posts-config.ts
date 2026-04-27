/**
 * posts-config.ts
 *
 * Non-server constants and types for the posts data layer.
 * Kept in a plain module (no 'use server') so that they can be imported by
 * both Server Actions (lib/actions/posts.ts) and Client Components without
 * violating the Next.js rule that 'use server' files may only export async
 * functions.
 */

import { Post } from '@/types'

/** Number of posts fetched per page on the home feed. */
export const PAGE_SIZE = 6

export interface PostsPage {
  posts: Post[]
  /** True when at least one more page exists beyond this one. */
  hasMore: boolean
}
