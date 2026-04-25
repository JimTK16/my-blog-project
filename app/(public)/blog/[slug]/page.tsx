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
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className='max-w-3xl mx-auto px-6 py-16 md:py-24'>
      {/* Header Section */}
      <header className='mb-16 text-center md:text-left'>
        <time className='text-bloom-500 font-semibold tracking-wide uppercase text-sm mb-4 block'>
          {format(new Date(post.created_at), 'MMMM d, yyyy')}
        </time>
        <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight text-soil-900 leading-[1.1] mb-8'>
          {post.title}
        </h1>

        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-y border-soil-200'>
          <div className='flex items-center gap-4 justify-center md:justify-start'>
            <div className='w-12 h-12 rounded-full bg-linear-to-tr from-bloom-500 to-bloom-700 flex items-center justify-center text-white font-bold text-lg shadow-sm'>
              JV
            </div>
            <div className='text-left'>
              <p className='font-bold text-soil-900'>Jimmy Vu</p>
              <p className='text-sm text-soil-500'>Software Engineer</p>
            </div>
          </div>
          <div className='flex justify-center md:justify-end'>
            <LikeButton id={post.id} initialLikes={post.likes_count} />
          </div>
        </div>
      </header>

      {/* Featured Image - if present */}
      {post.card_image_url && (
        <div className='mb-16 w-full aspect-2/1 md:aspect-21/9 rounded-3xl overflow-hidden shadow-xl'>
          <img
            src={post.card_image_url}
            alt={post.title}
            className='w-full h-full object-cover'
          />
        </div>
      )}

      {/* Markdown Content Section */}
      <section className='min-h-100 prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-a:font-semibold prose-img:rounded-2xl'>
        <MarkdownRenderer content={post.content} />
      </section>

      {/* Footer / Back Link */}
      <footer className='mt-24 pt-8 border-t border-soil-200 flex justify-between items-center'>
        <BackButton />
        <div className='text-soil-400 text-sm font-medium'>
          Thanks for reading!
        </div>
      </footer>
    </article>
  )
}
