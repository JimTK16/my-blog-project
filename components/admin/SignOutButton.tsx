'use client'

import { logout } from '@/lib/actions/auth'

export default function SignOutButton() {
  return (
    <button
      onClick={() => logout()}
      className='flex min-h-11 w-full items-center gap-2.5 rounded-lg px-4 py-3
                 text-sm font-medium text-danger-600 hover:bg-danger-50 transition-colors'
    >
      <span aria-hidden='true'>⏻</span>
      Sign Out
    </button>
  )
}
