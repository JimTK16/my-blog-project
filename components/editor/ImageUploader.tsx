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
      <label className='block text-sm font-medium text-soil-700'>
        Card Image
      </label>
      {preview && (
        <img
          src={preview}
          alt='Preview'
          className='w-40 h-24 object-cover rounded border'
        />
      )}
      <input
        type='file'
        accept='image/*'
        onChange={handleUpload}
        disabled={uploading}
        className='block w-full text-sm text-soil-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-bloom-50 file:text-bloom-700 hover:file:bg-bloom-100'
      />
      {uploading && <p className='text-xs text-bloom-500'>Uploading...</p>}
    </div>
  )
}
