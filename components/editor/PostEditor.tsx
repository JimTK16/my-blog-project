'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import ImageUploader from './ImageUploader'
import { createPost, updatePost } from '@/lib/actions/posts'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function PostEditor({ post }: { post?: any }) {
  const [content, setContent] = useState(post?.content || '')
  const [imageUrl, setImageUrl] = useState(post?.card_image_url || '')
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false)

  const clientAction = async (formData: FormData) => {
    formData.set('content', content)
    formData.set('card_image_url', imageUrl)
    formData.set('is_published', String(isPublished))

    if (post?.id) {
      await updatePost(post.id, formData)
    } else {
      await createPost(formData)
    }
  }

  return (
    <form action={clientAction} className='space-y-8 max-w-5xl mx-auto p-6'>
      <div className='flex flex-col gap-4'>
        {/* Status Badge */}
        <div className='flex items-center gap-2'>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
          >
            {isPublished ? 'Published' : 'Draft'}
          </span>
        </div>

        <input
          name='title'
          defaultValue={post?.title}
          placeholder='Article Title...'
          className='text-4xl font-extrabold border-none focus:ring-0 w-full bg-transparent p-0 placeholder:text-gray-300'
          required
        />
        {/* Hidden field to pass slug back to server for revalidation */}
        <input type='hidden' name='slug' value={post?.slug} />
      </div>

      <ImageUploader
        initialValue={imageUrl}
        onUploadComplete={(url) => setImageUrl(url)}
      />

      <div
        className='border rounded-xl overflow-hidden shadow-sm'
        data-color-mode='light'
      >
        <MDEditor
          value={content}
          onChange={(val) => setContent(val || '')}
          height={500}
          preview='live'
        />
      </div>

      <div className='flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100'>
        <div className='flex items-center gap-3'>
          <input
            type='checkbox'
            id='published-toggle'
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
          />
          <label
            htmlFor='published-toggle'
            className='font-medium text-gray-700'
          >
            Ready to publish?
          </label>
        </div>

        <button
          type='submit'
          className='bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 shadow-lg transition-all active:scale-95'
        >
          {post?.id ? 'Update Changes' : 'Create Article'}
        </button>
      </div>
    </form>
  )
}
