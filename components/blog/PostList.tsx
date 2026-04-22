import { getAllPosts } from '@/lib/actions/posts'
import PostCard from './PostCard'

export async function PostList() {
  const posts = await getAllPosts()

  return (
    <main className='max-w-4xl mx-auto px-6 pb-24'>
      {/* Sleek Hero Section */}
      <section className='py-20 md:py-32'>
        <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6'>
          Writing about code, <br className='hidden md:block' />
          <span className='text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600'>
            design, and building things.
          </span>
        </h1>
        <p className='text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed'>
          Welcome to my digital garden. Here, I share my thoughts on software
          engineering, modern web development, and the journey of crafting
          digital products.
        </p>
      </section>

      {posts.length === 0 ? (
        <div className='bg-gray-50 border border-gray-100 rounded-2xl p-12 text-center'>
          <p className='text-gray-500 text-lg'>
            No articles found. Start writing in the admin panel!
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10'>
          {posts.map(
            (post) =>
              post.is_published && <PostCard key={post.id} post={post} />
          )}
        </div>
      )}
    </main>
  )
}

export default PostList
