import { getAllPosts } from '@/lib/actions/posts'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'
import { format } from 'date-fns'

export default async function DashboardPage() {
  const posts = await getAllPosts()

  return (
    <div className='space-y-10'>
      <div className='flex justify-between items-end'>
        <div>
          <h1 className='text-4xl font-extrabold tracking-tight text-soil-900'>
            Manage Posts
          </h1>
          <p className='text-soil-500 mt-2 font-medium'>
            You have {posts.length} articles in your library.
          </p>
        </div>
        <Link
          href='/create'
          className='bg-bloom-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-bloom-700 transition shadow-lg shadow-bloom-200 active:scale-95'
        >
          + New Post
        </Link>
      </div>

      <div className='bg-white border border-soil-200 rounded-3xl overflow-hidden shadow-sm'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-soil-100 border-b border-soil-200 text-soil-400 text-[11px] font-bold uppercase tracking-widest'>
                <th className='px-8 py-5'>Article Title</th>
                <th className='px-8 py-5'>Date Created</th>
                <th className='px-8 py-5 text-center'>Stats</th>
                <th className='px-8 py-5'>Status</th>
                <th className='px-8 py-5 text-right'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-soil-200'>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className='hover:bg-soil-50/50 transition-colors group'
                >
                  <td className='px-8 py-6'>
                    <p className='font-bold text-soil-900 group-hover:text-bloom-600 transition-colors'>
                      {post.title}
                    </p>
                    <p className='text-xs text-soil-400 mt-1 font-medium'>
                      /{post.slug}
                    </p>
                  </td>
                  <td className='px-8 py-6 text-soil-500 text-sm font-medium'>
                    {format(new Date(post.created_at), 'MMM dd, yyyy')}
                  </td>
                  <td className='px-8 py-6 text-center'>
                    <div className='inline-flex items-center gap-2 px-3 py-1 bg-soil-100 rounded-full border border-soil-200'>
                      <span className='text-xs font-bold text-soil-600'>
                        {post.likes_count}
                      </span>
                      <span className='text-xs'>❤️</span>
                    </div>
                  </td>
                  <td className='px-8 py-6'>
                    {post.is_published ? (
                      <span className='inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-success-600 bg-success-50 px-2.5 py-1 rounded-full border border-success-200'>
                        <span className='w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse' />
                        Live
                      </span>
                    ) : (
                      <span className='inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-warning-600 bg-warning-50 px-2.5 py-1 rounded-full border border-warning-200'>
                        <span className='w-1.5 h-1.5 rounded-full bg-warning-500' />
                        Draft
                      </span>
                    )}
                  </td>
                  <td className='px-8 py-6'>
                    <div className='flex justify-end items-center gap-4'>
                      <Link
                        href={`/edit/${post.id}`}
                        className='text-soil-400 hover:text-bloom-600 font-bold text-sm transition-colors'
                      >
                        Edit
                      </Link>
                      <DeleteButton id={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {posts.length === 0 && (
          <div className='p-20 text-center'>
            <div className='w-16 h-16 bg-soil-100 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-soil-200'>
              <span className='text-2xl'>✍️</span>
            </div>
            <p className='text-soil-400 font-medium'>
              Your library is currently empty.
            </p>
            <Link
              href='/create'
              className='text-bloom-600 font-bold text-sm mt-2 inline-block hover:underline'
            >
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
