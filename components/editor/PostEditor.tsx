'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation' // Added for Cancel button
import ImageUploader from './ImageUploader'
import { createPost, updatePost } from '@/lib/actions/posts'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function PostEditor({ post }: { post?: any }) {
  const router = useRouter()
  const [content, setContent] = useState(post?.content || '')
  const [imageUrl, setImageUrl] = useState(post?.card_image_url || '')
  // We keep this state to update the "Badge" at the top visually
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false)

  const clientAction = async (formData: FormData) => {
    // 1. Get the value from the specific button that was clicked
    const publishStatus = formData.get('publishStatus')
    const finalIsPublished = publishStatus === 'true'

    // 2. Append our custom state to the formData
    formData.set('content', content)
    formData.set('card_image_url', imageUrl)
    formData.set('is_published', String(finalIsPublished))

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
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              isPublished
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
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

      {/* FOOTER ACTIONS */}
      <div className='flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm'>
        {/* Cancel Button - Type "button" prevents form submission */}
        <button
          type='button'
          onClick={() => router.push('/dashboard')}
          className='text-gray-600 font-medium hover:text-gray-900 transition px-4 py-2'
        >
          Cancel
        </button>

        <div className='flex gap-3'>
          {/* Save as Draft Button */}
          <button
            type='submit'
            name='publishStatus'
            value='false'
            className='border border-gray-300 text-gray-700 px-6 py-2.5 rounded-full font-bold hover:bg-gray-50 transition active:scale-95'
          >
            Save as Draft
          </button>

          {/* Publish / Update Button */}
          <button
            type='submit'
            name='publishStatus'
            value='true'
            className='bg-blue-600 text-white px-8 py-2.5 rounded-full font-bold hover:bg-blue-700 shadow-md transition active:scale-95'
          >
            {post?.id ? 'Update & Publish' : 'Publish Post'}
          </button>
        </div>
      </div>
    </form>
  )
}
