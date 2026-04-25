'use client'

import { deletePost } from '@/lib/actions/posts'
import { useState } from 'react'

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (
      confirm(
        'Are you absolutely sure you want to delete this post? This cannot be undone.'
      )
    ) {
      setIsDeleting(true)
      await deletePost(id)
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className='text-soil-400 hover:text-danger-600 font-bold text-sm transition-colors disabled:opacity-50'
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  )
}
