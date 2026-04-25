'use client'

import { deletePost } from '@/lib/actions/posts'
import { useState } from 'react'

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (
      !confirm(
        'Are you absolutely sure you want to delete this post? This cannot be undone.'
      )
    )
      return

    setIsDeleting(true)
    await deletePost(id)
    setIsDeleting(false)
  }

  return (
    /*
     * Icon button: h-8 w-8 touch target.
     * hover:bg-danger-50 hover:text-danger-600 — matches the feedback spec
     * for action buttons with "hover:bg-primary/10 rounded p-1".
     */
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      title='Delete post'
      aria-label={isDeleting ? 'Deleting…' : 'Delete post'}
      className='inline-flex h-11 w-11 items-center justify-center rounded
                 text-text-subtle hover:bg-danger-50 hover:text-danger-600
                 transition-colors disabled:cursor-not-allowed disabled:opacity-50'
    >
      <span aria-hidden='true'>{isDeleting ? '⌛' : '🗑'}</span>
    </button>
  )
}
