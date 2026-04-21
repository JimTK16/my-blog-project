'use server'

import { createClient } from '../supabase/server'
import slugify from 'slugify'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getPostById(id: string) {
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
  return data
}

export async function createPost(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const card_image_url = formData.get('card_image_url') as string
  // Checkbox values in HTML forms are sent as 'on' or 'true' strings
  const is_published = formData.get('is_published') === 'true'

  const slug = slugify(title, { lower: true, strict: true })

  const { error } = await supabase
    .from('posts')
    .insert([{ title, slug, content, card_image_url, is_published }])

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
  revalidatePath('/')
  redirect('/dashboard')
}

export async function getAllPosts() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts: ', error)
    return []
  }

  return data
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null

  return data
}

export async function deletePost(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) {
    console.error('Error deleting post:', error.message)
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/')
  return { success: true }
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const card_image_url = formData.get('card_image_url') as string
  const is_published = formData.get('is_published') === 'true'

  const { error } = await supabase
    .from('posts')
    .update({
      title,
      content,
      card_image_url,
      is_published,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
  revalidatePath('/') // Revalidate home feed
  // Revalidate the specific blog post page
  const slug = formData.get('slug') as string
  if (slug) revalidatePath(`/blog/${slug}`)

  redirect('/dashboard')
}
