import { getAllPosts } from '@/lib/actions/posts'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'
import { format } from 'date-fns'

export default async function DashboardPage() {
  const posts = await getAllPosts()

  return (
    <div className='p-8 max-w-6xl mx-auto'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>Manage Posts</h1>
        <Link
          href='/create'
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition'
        >
          New Post
        </Link>
      </div>

      <div className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm'>
        <table className='w-full text-left'>
          <thead className='bg-gray-50 border-b border-gray-200 text-gray-600 text-sm'>
            <tr>
              <th className='px-6 py-4 font-semibold'>Title</th>
              <th className='px-6 py-4 font-semibold'>Date</th>
              <th className='px-6 py-4 font-semibold'>Likes</th>
              <th className='px-6 py-4 font-semibold text-right'>Actions</th>
              <th className='px-6 py-4 font-semibold text-right'>Status</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {posts.map((post) => (
              <tr key={post.id} className='hover:bg-gray-50 transition'>
                <td className='px-6 py-4 font-medium text-gray-900'>
                  {post.title}
                </td>
                <td className='px-6 py-4 text-gray-500 text-sm'>
                  {format(new Date(post.created_at), 'MMM dd, yyyy')}
                </td>
                <td className='px-6 py-4'>
                  <span className='text-gray-400'>❤️</span> {post.likes_count}
                </td>
                <td className='px-6 py-4 text-right flex justify-end gap-3'>
                  <Link
                    href={`/edit/${post.id}`}
                    className='text-blue-600 hover:text-blue-800 font-medium text-sm'
                  >
                    Edit
                  </Link>
                  <DeleteButton id={post.id} />
                </td>

                <td className='px-6 py-4'>
                  {post.is_published ? (
                    <span className='text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded'>
                      LIVE
                    </span>
                  ) : (
                    <span className='text-yellow-600 text-xs font-bold bg-yellow-50 px-2 py-1 rounded'>
                      DRAFT
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {posts.length === 0 && (
          <div className='p-12 text-center text-gray-500'>
            No posts found. Time to write your first masterpiece!
          </div>
        )}
      </div>
    </div>
  )
}
