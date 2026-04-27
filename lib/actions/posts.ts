'use server'

import { createClient } from '../supabase/server'
import slugify from 'slugify'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ActionResponse, Post } from '@/types'
import { PAGE_SIZE, PostsPage } from '../posts-config'

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching post by ID:', error.message)
    return null
  }
  return data as Post
}

export async function createPost(formData: FormData): Promise<ActionResponse> {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const card_image_url = formData.get('card_image_url') as string
  const is_published = formData.get('is_published') === 'true'

  if (!title || !content) {
    return { success: false, error: 'Title and content are required' }
  }

  const slug = slugify(title, { lower: true, strict: true })

  const { error } = await supabase
    .from('posts')
    .insert([{ title, slug, content, card_image_url, is_published }])

  if (error) {
    console.error('Error creating post:', error.message)
    return { success: false, error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/')
  redirect('/dashboard')
}

export async function getAllPosts(onlyPublished = false): Promise<Post[]> {
  const supabase = await createClient()

  let query = supabase.from('posts').select('*')

  if (onlyPublished) {
    query = query.eq('is_published', true)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts: ', error)
    return []
  }

  return data as Post[]
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null

  return data as Post
}

export async function deletePost(id: string): Promise<ActionResponse> {
  const supabase = await createClient()

  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) {
    console.error('Error deleting post:', error.message)
    return { success: false, error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/')
  return { success: true }
}

export async function updatePost(
  id: string,
  formData: FormData
): Promise<ActionResponse> {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const card_image_url = formData.get('card_image_url') as string
  const is_published = formData.get('is_published') === 'true'

  if (!title || !content) {
    return { success: false, error: 'Title and content are required' }
  }

  const { error } = await supabase
    .from('posts')
    .update({
      title,
      content,
      card_image_url,
      is_published
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating post:', error.message)
    return { success: false, error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/')
  const slug = formData.get('slug') as string
  if (slug) revalidatePath(`/blog/${slug}`)

  redirect('/dashboard')
}

/**
 * getPostsPage
 *
 * Fetches a single page of published posts ordered newest-first.
 * Fetches `pageSize + 1` rows so we can cheaply detect whether a
 * next page exists without a separate COUNT query.
 *
 * page     — 0-based page index
 * pageSize — defaults to PAGE_SIZE constant
 */
export async function getPostsPage(
  page: number,
  pageSize: number = PAGE_SIZE
): Promise<PostsPage> {
  const supabase = await createClient()
  const from = page * pageSize
  // Supabase .range(from, to) is inclusive; fetching one extra row
  // lets us detect hasMore without an extra COUNT query.
  const to = from + pageSize // pageSize + 1 rows total

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error || !data) {
    console.error('Error fetching posts page:', error?.message)
    return { posts: [], hasMore: false }
  }

  return {
    posts: data.slice(0, pageSize) as Post[],
    hasMore: data.length > pageSize
  }
}

export async function searchPosts(query: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true) // Only search public posts
    .textSearch('fts', query, {
      type: 'websearch', // Allows users to use "quotes" or -minus signs
      config: 'english'
    })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Search error:', error.message)
    return []
  }
  return data
}
