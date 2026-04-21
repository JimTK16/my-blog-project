import { getPostById } from '@/lib/actions/posts'
import PostEditor from '@/components/editor/PostEditor'
import { notFound } from 'next/navigation'

export default async function EditPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPostById(id)

  if (!post) notFound()

  return <PostEditor post={post} />
}
