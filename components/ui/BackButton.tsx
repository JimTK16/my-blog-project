'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className='flex min-h-11 items-center gap-1.5 text-sm font-medium
                 text-primary-600  decoration-accent-400 decoration-2
                  hover:decoration-accent-600 cursor-pointer'
    >
      <span aria-hidden='true'>←</span>
      Back to all articles
    </button>
  )
}
