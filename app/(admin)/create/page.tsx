import { createPost } from '@/lib/actions/posts'

export default function CreatePostPage() {
  return (
    <main className='max-w-2xl mx-auto p-8'>
      <h1 className='text-2xl font-bold mb-6'>Create New Blog Post</h1>

      <form action={createPost} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='title' className='font-medium'>
            Title
          </label>
          <input
            name='title'
            id='title'
            type='text'
            required
            className='border p-2 rounded text-black'
            placeholder='Enter blog title...'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='card_image_url' className='font-medium'>
            Card Image URL
          </label>
          <input
            name='card_image_url'
            id='card_image_url'
            type='url'
            className='border p-2 rounded text-black'
            placeholder='https://example.com/image.jpg'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='content' className='font-medium'>
            Content (Markdown)
          </label>
          <textarea
            name='content'
            id='content'
            required
            rows={10}
            className='border p-2 rounded text-black font-mono'
            placeholder='Write your markdown here...'
          />
        </div>

        <button
          type='submit'
          className='bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition'
        >
          Publish Post
        </button>
      </form>
    </main>
  )
}
