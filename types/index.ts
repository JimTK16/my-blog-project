export interface Post {
  id: string
  title: string
  slug: string
  content: string
  card_image_url: string | null
  likes_count: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export type ActionResponse<T = any> = {
  success: boolean
  message?: string
  data?: T
  error?: string
}
