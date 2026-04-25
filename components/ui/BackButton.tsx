'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className='flex min-h-[44px] items-center gap-1.5 text-sm font-medium
                 text-primary-600 underline decoration-accent-400 decoration-2
                 underline-offset-4 hover:decoration-accent-600 cursor-pointer'
    >
      <span aria-hidden='true'>←</span>
      Back to all articles
    </button>
  )
}
