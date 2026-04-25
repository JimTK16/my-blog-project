'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AdminNavLinkProps {
  href: string
  icon?: string
  children: React.ReactNode
}

/**
 * AdminNavLink — Client Component so we can read pathname for active state.
 * Used in the admin layout sidebar (which is a Server Component).
 * aria-current="page" marks the active link for screen readers.
 */
export function AdminNavLink({ href, icon, children }: AdminNavLinkProps) {
  const pathname = usePathname()

  // /dashboard is only active on exact match; other routes match prefix
  const isActive =
    href === '/dashboard'
      ? pathname === '/dashboard'
      : pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`flex min-h-[44px] items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-medium transition-colors
        ${
          isActive
            ? 'bg-primary-50 text-primary-600 font-semibold'
            : 'text-text-muted hover:bg-surface-tinted hover:text-text'
        }`}
    >
      {icon && (
        <span aria-hidden='true' className='w-4 text-center'>
          {icon}
        </span>
      )}
      {children}
    </Link>
  )
}
