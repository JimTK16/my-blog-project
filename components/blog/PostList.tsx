import { getAllPosts, searchPosts } from '@/lib/actions/posts'
import PostCard from './PostCard'
import SearchBar from '../public/SearchBar' // Import your new SearchBar

interface PostListProps {
  query?: string
}

export async function PostList({ query }: PostListProps) {
  // Fetch logic: If there's a query, use search. Otherwise, get all.
  const posts = query ? await searchPosts(query) : await getAllPosts(true)

  return (
    <main className='max-w-4xl mx-auto px-6 pb-24'>
      {/* Sleek Hero Section */}
      <section className='pt-20 pb-12 md:pt-32 md:pb-16'>
        <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight text-soil-900 mb-6 font-heading'>
          Writing about code, <br className='hidden md:block' />
          <span className='text-aurora'>design, and building things.</span>
        </h1>
        <p className='text-lg md:text-xl text-soil-500 max-w-2xl leading-relaxed font-body'>
          Welcome to my digital garden. Here, I share my thoughts on software
          engineering, modern web development, and the journey of crafting
          digital products.
        </p>
      </section>

      {/* Place the SearchBar here */}
      <div className='mb-16'>
        <SearchBar />

        {/* Visual feedback for the search term */}
        {query && (
          <p className='mt-4 text-sm text-soil-500'>
            Showing results for{' '}
            <span className='text-soil-900 font-bold italic'>"{query}"</span>
          </p>
        )}
      </div>

      {posts.length === 0 ? (
        <div className='bg-soil-100 border border-soil-200 rounded-2xl p-12 text-center'>
          <p className='text-soil-500 text-lg'>
            {query
              ? `No articles match "${query}".`
              : 'No articles found. Start writing in the admin panel!'}
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10'>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}

export default PostList
