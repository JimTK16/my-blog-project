import PostList from '@/components/blog/PostList'

// Next.js 16 uses Promises for searchParams
export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams

  return (
    <>
      {/* Pass the search query down to the component */}
      <PostList query={q} />
    </>
  )
}
