'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ImageUploader({
  onUploadComplete,
  initialValue
}: {
  onUploadComplete: (url: string) => void
  initialValue?: string
}) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(initialValue || '')
  const supabase = createClient()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      if (!e.target.files || e.target.files.length === 0) return

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `card-images/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get the Public URL
      const {
        data: { publicUrl }
      } = supabase.storage.from('blog-images').getPublicUrl(filePath)

      setPreview(publicUrl)
      onUploadComplete(publicUrl)
    } catch (error) {
      alert('Error uploading image!')
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='space-y-4'>
      <label className='block text-sm font-medium text-text'>Card Image</label>

      {preview && (
        <img
          src={preview}
          alt='Preview'
          className='h-24 w-40 rounded-lg border border-border object-cover shadow-card'
        />
      )}

      <input
        type='file'
        accept='image/*'
        onChange={handleUpload}
        disabled={uploading}
        className='block w-full text-sm text-text-muted
                   file:mr-4 file:rounded-md file:border-0
                   file:bg-primary-50 file:px-4 file:py-2
                   file:text-sm file:font-semibold file:text-primary-700
                   hover:file:bg-primary-100
                   disabled:opacity-50'
      />

      {uploading && <p className='text-xs text-primary-500'>Uploading…</p>}
    </div>
  )
}
