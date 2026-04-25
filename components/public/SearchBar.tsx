'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

/* Client Component — needs useState + useRouter for interactive search */
export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSearch} role='search' className='mx-auto max-w-2xl'>
      <div className='relative'>
        {/* Accessible label — visually hidden but read by screen readers */}
        <label htmlFor='search-input' className='sr-only'>
          Search articles
        </label>

        <input
          id='search-input'
          type='search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search articles…'
          className='w-full rounded-xl border border-border bg-surface-tinted px-6 py-4
                     text-text placeholder:text-text-subtle
                     focus:border-primary-500 focus:outline-none
                     focus:ring-2 focus:ring-primary-500/20'
        />

        {/*
         * top-1 centers the button within the py-4 input (52px tall).
         * py-3 + line-height produces the 44px WCAG touch target.
         */}
        <button
          type='submit'
          className='absolute right-3 top-1 flex min-h-[44px] items-center
                     rounded-lg bg-primary-600 px-4 py-3 text-sm font-medium
                     text-text-inverse hover:bg-primary-700'
        >
          Search
        </button>
      </div>
    </form>
  )
}
