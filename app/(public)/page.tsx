import PostList from '@/components/blog/PostList'

export default function HomePage() {
  return (
    <>
      {/* Since PostList already contains the <main> tag and the <h1>, 
          we just render it here.
      */}
      <PostList />
    </>
  )
}
