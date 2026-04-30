'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'

function SearchBarContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')

  /**
   * Keep the input in sync with the URL.
   * When the user navigates to '/' (e.g. by clicking Home), the ?q= param
   * disappears and this effect resets the input to empty.
   */
  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

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

        <button
          type='submit'
          className='absolute right-3 top-1/2 -translate-y-1/2 flex min-h-[44px]
                     items-center rounded-lg bg-primary-600 px-4 py-3 text-sm
                     font-medium text-text-inverse hover:bg-primary-700'
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default function SearchBar() {
  return (
    <Suspense
      fallback={
        <div className='mx-auto max-w-2xl'>
          <div className='relative'>
            <div
              className='w-full rounded-xl border border-border bg-surface-tinted px-6 py-4
                         text-text-subtle'
            >
              Search articles…
            </div>
            <div
              className='absolute right-3 top-1/2 -translate-y-1/2 flex min-h-[44px]
                         items-center rounded-lg bg-primary-600/50 px-4 py-3 text-sm
                         font-medium text-text-inverse'
            >
              Search
            </div>
          </div>
        </div>
      }
    >
      <SearchBarContent />
    </Suspense>
  )
}
