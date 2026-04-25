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
  const [hasLiked, setHasLiked] = useState(false)
  const supabase = createClient()

  const handleLike = async () => {
    if (isLiking || hasLiked) return
    setIsLiking(true)

    const { data } = await supabase
      .from('posts')
      .select('likes_count')
      .eq('id', id)
      .single()

    const newCount = (data?.likes_count ?? 0) + 1

    const { error } = await supabase
      .from('posts')
      .update({ likes_count: newCount })
      .eq('id', id)

    if (!error) {
      setLikes(newCount)
      setHasLiked(true)
    }
    setIsLiking(false)
  }

  return (
    <button
      onClick={handleLike}
      disabled={isLiking || hasLiked}
      aria-label={
        hasLiked
          ? `You liked this post (${likes} likes)`
          : `Like this post (${likes} likes)`
      }
      aria-pressed={hasLiked}
      className={`flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-3
                  text-sm font-medium transition-all duration-200
                  ${
                    hasLiked
                      ? 'border-danger-200 bg-danger-50 text-danger-500 cursor-default'
                      : 'border-border text-text-muted hover:border-danger-200 hover:bg-danger-50 hover:text-danger-500 disabled:opacity-50'
                  }`}
    >
      <span aria-hidden='true' className={hasLiked ? 'scale-110' : ''}>
        {hasLiked ? '❤️' : '🤍'}
      </span>
      <span>{likes}</span>
    </button>
  )
}
