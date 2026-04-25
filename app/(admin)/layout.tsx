import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from '@/components/admin/SignOutButton'
import { AdminNavLink } from '@/components/admin/AdminNavLink'

/* Server Component — auth gate + sidebar shell */
export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className='min-h-screen flex bg-background font-body'>
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        className='w-64 shrink-0 bg-surface border-r border-border
                   flex flex-col sticky top-0 h-screen'
        aria-label='Admin navigation'
      >
        {/* Brand + user info */}
        <div className='p-5 border-b border-border'>
          <Link href='/dashboard' className='flex items-center gap-2.5 group'>
            <div
              className='flex h-8 w-8 items-center justify-center rounded-lg
                         bg-primary-600 text-sm font-bold text-text-inverse
                         group-hover:scale-105 transition-transform'
            >
              B
            </div>
            <span className='font-heading text-base font-bold tracking-tight text-text'>
              Blog Admin
            </span>
          </Link>

          {/* Authenticated user pill */}
          <div className='mt-4 rounded-lg border border-border bg-surface-tinted p-3'>
            <p className='text-[10px] font-bold uppercase tracking-wider text-text-subtle'>
              Signed in as
            </p>
            <p className='mt-0.5 truncate text-xs font-medium text-text-muted'>
              {user.email}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 space-y-1 p-3' aria-label='Admin menu'>
          <p className='mb-2 mt-2 px-4 text-[10px] font-bold uppercase tracking-wider text-text-subtle'>
            Main Menu
          </p>

          {/* AdminNavLink is a Client Component — handles aria-current + active style */}
          <AdminNavLink href='/dashboard' icon='◉'>
            Dashboard
          </AdminNavLink>
          <AdminNavLink href='/create' icon='✦'>
            Create New Post
          </AdminNavLink>

          <div className='mt-4 border-t border-border pt-4'>
            <p className='mb-2 px-4 text-[10px] font-bold uppercase tracking-wider text-text-subtle'>
              External
            </p>
            {/* "Back to site" — subtle, unobtrusive */}
            <Link
              href='/'
              className='flex items-center gap-2.5 rounded-lg px-4 py-2.5
                         text-sm font-medium text-text-subtle hover:bg-surface-tinted
                         hover:text-text transition-colors'
            >
              <span aria-hidden='true' className='w-4 text-center'>
                ←
              </span>
              Back to site
            </Link>
          </div>
        </nav>

        {/* Sign out */}
        <div className='border-t border-border p-3'>
          <SignOutButton />
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className='flex-1 min-w-0 h-screen overflow-y-auto bg-background'>
        <div className='mx-auto max-w-5xl px-6 py-10 lg:px-10'>{children}</div>
      </main>
    </div>
  )
}
