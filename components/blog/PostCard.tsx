import Link from 'next/link'
import { format } from 'date-fns'
import { Post } from '@/types'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className='group block h-full'>
      <article className='h-full flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out'>
        {/* Card Image */}
        <div className='aspect-16/10 w-full bg-gray-50 relative overflow-hidden'>
          {post.card_image_url ? (
            <img
              src={post.card_image_url}
              alt={post.title}
              className='object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out'
            />
          ) : (
            <div className='flex items-center justify-center h-full text-gray-400 font-medium tracking-wide'>
              <span className='group-hover:scale-105 transition-transform duration-500'>
                Jimmy's Blog
              </span>
            </div>
          )}

          {/* Subtle gradient overlay on image */}
          <div className='absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        </div>

        {/* Content */}
        <div className='p-6 md:p-8 flex flex-col grow'>
          <time className='text-sm font-medium text-blue-600 mb-3 block'>
            {format(new Date(post.created_at), 'MMMM d, yyyy')}
          </time>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-2'>
            {post.title}
          </h2>
          {/* We can extract a short excerpt if we want, but for now we just push down the bottom area */}
          <div className='mt-auto pt-6 flex items-center justify-between text-sm text-gray-500 font-medium'>
            <span className='flex items-center gap-2'>
              Read Article{' '}
              <span className='group-hover:translate-x-1 transition-transform duration-300'>
                →
              </span>
            </span>
            <span className='flex items-center gap-1.5'>
              <span className='text-red-500'>❤️</span> {post.likes_count}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
