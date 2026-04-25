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
    <form action={formAction} className='mx-auto max-w-5xl space-y-10 pb-20'>
      {/* ── Editor header ─────────────────────────────────────────────── */}
      <div className='flex flex-col gap-5'>
        {/* Status row */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span
              aria-hidden='true'
              className={`h-2 w-2 rounded-full ${
                isPublished ? 'animate-pulse bg-success-500' : 'bg-warning-500'
              }`}
            />
            <span className='text-[11px] font-bold uppercase tracking-widest text-text-subtle'>
              {isPublished ? 'Published Post' : 'Draft'}
            </span>
          </div>

          <button
            type='button'
            onClick={() => router.push('/dashboard')}
            className='text-xs font-semibold uppercase tracking-widest
                       text-text-subtle hover:text-text transition-colors'
          >
            Cancel & Exit
          </button>
        </div>

        {/* Error banner */}
        {state.error && (
          <div
            role='alert'
            className='rounded-lg border border-danger-200 bg-danger-50
                       px-5 py-4 text-sm font-medium text-danger-600'
          >
            {state.error}
          </div>
        )}

        {/* Title + slug */}
        <div className='space-y-2'>
          {/*
           * Large editorial-style title input.
           * Borderless + transparent — the page heading IS the input.
           * focus:outline-none disables browser default; focus-visible ring
           * from globals.css still activates for keyboard users.
           */}
          <input
            name='title'
            defaultValue={post?.title}
            placeholder='Enter a captivating title…'
            className='w-full bg-transparent p-0 font-heading text-4xl font-extrabold
                       tracking-tight leading-tight text-text placeholder:text-text-subtle
                       focus:outline-none md:text-5xl'
            required
          />

          <div className='flex items-center gap-2 text-sm text-text-subtle'>
            <span>Slug:</span>
            <code
              className='rounded border border-border bg-surface-tinted
                         px-2 py-0.5 font-mono text-xs'
            >
              {post?.slug || 'will-be-generated-from-title'}
            </code>
          </div>
        </div>

        <input type='hidden' name='slug' value={post?.slug} />
      </div>

      {/* ── Media + Publish sidebar ───────────────────────────────────── */}
      <div className='grid grid-cols-1 items-start gap-8 md:grid-cols-3'>
        {/* Cover image — spans 2 of 3 columns */}
        <div className='space-y-4 md:col-span-2'>
          <label className='block text-[11px] font-bold uppercase tracking-widest text-text-subtle'>
            Cover Image
          </label>
          <ImageUploader
            initialValue={imageUrl}
            onUploadComplete={(url) => setImageUrl(url)}
          />
        </div>

        {/* Publish settings sidebar */}
        <div
          className='sticky top-8 space-y-5 rounded-xl border border-border
                     bg-surface-tinted p-6'
        >
          <h3 className='text-[11px] font-bold uppercase tracking-widest text-text-subtle'>
            Publish Settings
          </h3>

          <p className='text-xs leading-relaxed text-text-muted'>
            Publish immediately or save as a draft to review later.
          </p>

          <div className='flex flex-col gap-3 border-t border-border pt-4'>
            {/* Publish — btn-primary (high visual weight) */}
            <button
              type='submit'
              name='publishStatus'
              value='true'
              disabled={isPending}
              onClick={() => setIsPublished(true)}
              className='btn-primary w-full'
            >
              {isPending
                ? 'Publishing…'
                : post?.id
                  ? 'Update & Publish'
                  : 'Publish Post'}
            </button>

            {/* Save draft — btn-outline (lower visual weight) */}
            <button
              type='submit'
              name='publishStatus'
              value='false'
              disabled={isPending}
              onClick={() => setIsPublished(false)}
              className='btn-outline w-full'
            >
              {isPending ? 'Saving…' : 'Save as Draft'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Markdown editor ───────────────────────────────────────────── */}
      <div className='space-y-3'>
        <label className='block text-[11px] font-bold uppercase tracking-widest text-text-subtle'>
          Article Content
        </label>

        <div
          className='overflow-hidden rounded-xl border border-border bg-surface shadow-card'
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
