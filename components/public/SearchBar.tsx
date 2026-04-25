'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query)}`)
    } else {
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSearch} className='max-w-2xl mx-auto mb-12 px-6'>
      <div className='relative'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search articles (e.g. Spring Boot, Pizza)...'
          className='w-full px-6 py-4 bg-soil-100 border border-soil-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bloom-500/20 focus:border-bloom-500 transition-all placeholder:text-soil-400'
        />
        <button
          type='submit'
          className='absolute right-3 top-2.5 bg-soil-900 text-white px-4 py-1.5 rounded-xl text-sm font-medium hover:bg-soil-800 transition-colors'
        >
          Search
        </button>
      </div>
    </form>
  )
}
