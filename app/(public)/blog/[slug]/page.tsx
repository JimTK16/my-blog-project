import { getPostBySlug } from '@/lib/actions/posts'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer'
import LikeButton from '@/components/blog/LikeButton'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import BackButton from '@/components/ui/BackButton'

export default async function PostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  // 1. Await the dynamic params
  const { slug } = await params

  // 2. Fetch the post from our "Service" layer
  const post = await getPostBySlug(slug)

  // 3. If no post exists, show the built-in 404 page
  if (!post) {
    notFound()
  }

  return (
    <article className='max-w-3xl mx-auto px-6 py-12'>
      {/* Header Section */}
      <header className='mb-12 border-b border-gray-100 pb-8'>
        <p className='text-blue-600 font-medium mb-4'>
          {format(new Date(post.created_at), 'MMMM d, yyyy')}
        </p>
        <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight'>
          {post.title}
        </h1>

        <div className='mt-8 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-gray-200' />{' '}
            {/* Author Avatar Placeholder */}
            <span className='font-medium text-gray-700'>Jimmy Vu</span>
          </div>
          <LikeButton id={post.id} initialLikes={post.likes_count} />
        </div>
      </header>

      {/* Markdown Content Section */}
      <section className='min-h-100'>
        <MarkdownRenderer content={post.content} />
      </section>

      {/* Footer / Back Link */}
      <footer className='mt-16 pt-8 border-t border-gray-100'>
        <BackButton />
      </footer>
    </article>
  )
}
