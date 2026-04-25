'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className='text-bloom-600 hover:underline font-medium cursor-pointer'
    >
      ← Back to all articles
    </button>
  )
}
