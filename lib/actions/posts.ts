'use server'

import { createClient } from '../supabase/server'
import slugify from 'slugify'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const card_image_url = formData.get('card_image_url') as string

  //generate a url-friendly slug
  const slug = slugify(title, { lower: true, strict: true })

  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, slug, content, card_image_url, is_published: true }])
    .select()

  if (error) {
    console.log('Error creating post: ', error)
    return { error: error.message }
  }

  revalidatePath('/')
  redirect('/')
  return { success: true, data }
}

export async function getAllPosts() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
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
