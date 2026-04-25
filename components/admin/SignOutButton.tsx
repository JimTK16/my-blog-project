'use client'

import { logout } from '@/lib/actions/auth'

export default function SignOutButton() {
  return (
    <button
      onClick={() => logout()}
      className='w-full text-left px-4 py-3 text-sm font-bold text-danger-500 hover:bg-danger-50 rounded-xl transition-colors flex items-center gap-3 group'
    >
      <span className='opacity-50 group-hover:opacity-100 transition-opacity'>
        ⏻
      </span>
      Sign Out
    </button>
  )
}
