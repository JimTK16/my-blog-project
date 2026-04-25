'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LikeButton({
  id,
  initialLikes
}: {
  id: string
  initialLikes: number
}) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiking, setIsLiking] = useState(false)
  const supabase = createClient()

  const handleLike = async () => {
    if (isLiking) return
    setIsLiking(true)

    // Using a Supabase RPC or direct increment
    // For simplicity here, we'll fetch and update
    const { data } = await supabase
      .from('posts')
      .select('likes_count')
      .eq('id', id)
      .single()

    const newCount = (data?.likes_count || 0) + 1

    const { error } = await supabase
      .from('posts')
      .update({ likes_count: newCount })
      .eq('id', id)

    if (!error) {
      setLikes(newCount)
    }
    setIsLiking(false)
  }

  return (
    <button
      onClick={handleLike}
      className='flex items-center gap-2 px-4 py-2 border border-soil-200 rounded-full hover:bg-danger-50 hover:border-danger-200 transition text-soil-600 hover:text-danger-500'
    >
      <span>❤️</span>
      <span>{likes}</span>
    </button>
  )
}
