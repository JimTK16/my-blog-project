import { getAllPosts } from '@/lib/actions/posts'
import PostCard from './PostCard'

export async function PostList() {
  const posts = await getAllPosts()

  return (
    <main className='max-w-6xl mx-auto p-8'>
      <h1 className='text-4xl font-extrabold mb-8'>Latest Articles</h1>

      {posts.length === 0 ? (
        <p className='text-gray-500 text-lg'>
          No articles found. Start writing in the admin panel!
        </p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
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
