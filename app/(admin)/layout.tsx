import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from '@/components/admin/SignOutButton'

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className='min-h-screen flex bg-soil-100 font-sans'>
      {/* Sleek Sidebar */}
      <aside className='w-72 bg-white border-r border-soil-200 flex flex-col sticky top-0 h-screen'>
        <div className='p-8'>
          <Link href='/dashboard' className='flex items-center gap-2 group'>
            <div className='w-8 h-8 rounded-lg bg-bloom-600 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform'>
              B
            </div>
            <h2 className='text-xl font-bold tracking-tight text-soil-900'>
              Blog Admin
            </h2>
          </Link>
          <div className='mt-4 p-3 bg-soil-100 rounded-xl border border-soil-200'>
            <p className='text-[10px] font-bold uppercase tracking-wider text-soil-400'>
              Authenticated as
            </p>
            <p className='text-xs font-medium text-soil-600 truncate mt-0.5'>
              {user.email}
            </p>
          </div>
        </div>

        <nav className='flex-1 px-4 space-y-1 mt-2'>
          <p className='px-4 text-[10px] font-bold uppercase tracking-wider text-soil-400 mb-2'>
            Main Menu
          </p>
          <Link
            href='/dashboard'
            className='flex items-center gap-3 px-4 py-3 text-sm font-semibold text-soil-600 rounded-xl hover:bg-soil-100 hover:text-bloom-600 transition-all group'
          >
            <span className='w-1.5 h-1.5 rounded-full bg-soil-300 group-hover:bg-bloom-600 transition-colors' />
            Dashboard
          </Link>
          <Link
            href='/create'
            className='flex items-center gap-3 px-4 py-3 text-sm font-semibold text-soil-600 rounded-xl hover:bg-soil-100 hover:text-bloom-600 transition-all group'
          >
            <span className='w-1.5 h-1.5 rounded-full bg-soil-300 group-hover:bg-bloom-600 transition-colors' />
            Create New Post
          </Link>

          <div className='pt-6'>
            <p className='px-4 text-[10px] font-bold uppercase tracking-wider text-soil-400 mb-2'>
              External
            </p>
            <Link
              href='/'
              className='flex items-center gap-3 px-4 py-3 text-sm font-semibold text-soil-500 rounded-xl hover:bg-soil-100 hover:text-soil-900 transition-all group'
            >
              <span className='opacity-50'>←</span>
              View Live Site
            </Link>
          </div>
        </nav>

        <div className='p-6 mt-auto border-t border-soil-200'>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className='flex-1 min-w-0 h-screen overflow-y-auto'>
        <div className='max-w-6xl mx-auto py-12 px-8'>{children}</div>
      </main>
    </div>
  )
}
