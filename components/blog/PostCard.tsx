import Link from 'next/link'
import { format } from 'date-fns'

export default function PostCard({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.slug}`} className='group'>
      <div className='border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition'>
        {/* Card Image - Only shown if URL exists */}
        <div className='aspect-video w-full bg-gray-100 relative'>
          {post.card_image_url ? (
            <img
              src={post.card_image_url}
              alt={post.title}
              className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-300'
            />
          ) : (
            <div className='flex items-center justify-center h-full text-gray-400'>
              No Image
            </div>
          )}
        </div>

        <div className='p-4'>
          <p className='text-sm text-gray-500'>
            {format(new Date(post.created_at), 'MMM dd, yyyy')}
          </p>
          <h2 className='text-xl font-bold mt-1 group-hover:text-blue-600 transition'>
            {post.title}
          </h2>
        </div>
      </div>
    </Link>
  )
}
