'use client'

import { useState, useActionState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import ImageUploader from './ImageUploader'
import { createPost, updatePost } from '@/lib/actions/posts'
import { Post, ActionResponse } from '@/types'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface PostEditorProps {
  post?: Post
}

export default function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const [content, setContent] = useState(post?.content || '')
  const [imageUrl, setImageUrl] = useState(post?.card_image_url || '')
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false)

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(
    async (prevState: ActionResponse, formData: FormData) => {
      const publishStatus = formData.get('publishStatus')
      const finalIsPublished = publishStatus === 'true'

      formData.set('content', content)
      formData.set('card_image_url', imageUrl)
      formData.set('is_published', String(finalIsPublished))

      if (post?.id) {
        return await updatePost(post.id, formData)
      } else {
        return await createPost(formData)
      }
    },
    { success: true }
  )

  return (
    <form action={formAction} className='max-w-5xl mx-auto space-y-12 pb-20'>
      {/* Editor Header */}
      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div
              className={`w-2.5 h-2.5 rounded-full ${isPublished ? 'bg-success-500 animate-pulse' : 'bg-warning-500'}`}
            />
            <span className='text-[10px] font-bold uppercase tracking-widest text-soil-400'>
              Currently editing {isPublished ? 'Published Post' : 'Draft'}
            </span>
          </div>

          <button
            type='button'
            onClick={() => router.push('/dashboard')}
            className='text-xs font-bold text-soil-400 hover:text-soil-900 transition-colors uppercase tracking-widest'
          >
            Cancel & Exit
          </button>
        </div>

        {state.error && (
          <div className='bg-danger-50 border border-danger-200 text-danger-600 px-6 py-4 rounded-2xl text-sm font-medium'>
            {state.error}
          </div>
        )}

        <div className='space-y-2'>
          <input
            name='title'
            defaultValue={post?.title}
            placeholder='Enter a captivating title...'
            className='text-5xl md:text-6xl font-extrabold border-none focus:ring-0 w-full bg-transparent p-0 placeholder:text-soil-300 tracking-tight leading-tight'
            required
          />
          <div className='flex items-center gap-2 text-soil-400 font-medium text-sm'>
            <span>Slug:</span>
            <code className='bg-soil-100 px-2 py-0.5 rounded border border-soil-200 text-xs'>
              {post?.slug || 'will-be-generated-from-title'}
            </code>
          </div>
        </div>
        <input type='hidden' name='slug' value={post?.slug} />
      </div>

      {/* Media & Metadata Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10 items-start'>
        <div className='md:col-span-2 space-y-8'>
          <div className='space-y-4'>
            <h3 className='text-sm font-bold uppercase tracking-widest text-soil-400'>
              Cover Image
            </h3>
            <ImageUploader
              initialValue={imageUrl}
              onUploadComplete={(url) => setImageUrl(url)}
            />
          </div>
        </div>

        <div className='bg-soil-100 border border-soil-200 rounded-3xl p-8 space-y-6 sticky top-8'>
          <h3 className='text-sm font-bold uppercase tracking-widest text-soil-400 mb-2'>
            Publish Settings
          </h3>

          <div className='space-y-4'>
            <p className='text-xs text-soil-500 leading-relaxed font-medium'>
              Choose whether to publish your post immediately or save it as a
              draft for later.
            </p>

            <div className='flex flex-col gap-3 pt-4 border-t border-soil-200'>
              <button
                type='submit'
                name='publishStatus'
                value='true'
                disabled={isPending}
                onClick={() => setIsPublished(true)}
                className='w-full bg-bloom-600 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-bloom-700 shadow-lg shadow-bloom-100 transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2'
              >
                {isPending
                  ? 'Processing...'
                  : post?.id
                    ? 'Update & Publish'
                    : 'Publish Post'}
              </button>

              <button
                type='submit'
                name='publishStatus'
                value='false'
                disabled={isPending}
                onClick={() => setIsPublished(false)}
                className='w-full bg-white border border-soil-200 text-soil-700 px-6 py-3.5 rounded-2xl font-bold hover:bg-soil-100 transition active:scale-95 disabled:opacity-50'
              >
                {isPending ? 'Saving...' : 'Save as Draft'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className='space-y-4'>
        <h3 className='text-sm font-bold uppercase tracking-widest text-soil-400'>
          Article Content
        </h3>
        <div
          className='border border-soil-200 rounded-3xl overflow-hidden shadow-sm bg-white'
          data-color-mode='light'
        >
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || '')}
            height={600}
            preview='live'
            className='border-none!'
          />
        </div>
      </div>
    </form>
  )
}
