import { login } from '@/lib/actions/auth'

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ message: string }>
}) {
  const { message } = await searchParams

  return (
    <div
      className='flex min-h-screen w-full items-center justify-center
                 bg-background px-4'
    >
      <div className='w-full max-w-sm'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <div
            className='mx-auto mb-4 flex h-12 w-12 items-center justify-center
                       rounded-xl bg-primary-600 text-lg font-extrabold
                       text-text-inverse shadow-card'
          >
            B
          </div>
          <h1 className='font-heading text-2xl font-bold text-text'>
            Admin Login
          </h1>
          <p className='mt-1 text-sm text-text-muted'>
            Sign in to manage your blog
          </p>
        </div>

        <form
          className='space-y-5 rounded-xl border border-border bg-surface
                     p-8 shadow-card'
          action={login}
        >
          {/* Email */}
          <div className='space-y-1.5'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-text'
            >
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='you@example.com'
              required
              className='w-full rounded-md border border-border bg-surface-tinted
                         px-4 py-3 text-sm text-text placeholder:text-text-subtle
                         focus:border-primary-500 focus:outline-none
                         focus:ring-2 focus:ring-primary-500/20'
            />
          </div>

          {/* Password */}
          <div className='space-y-1.5'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-text'
            >
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='••••••••'
              required
              className='w-full rounded-md border border-border bg-surface-tinted
                         px-4 py-3 text-sm text-text placeholder:text-text-subtle
                         focus:border-primary-500 focus:outline-none
                         focus:ring-2 focus:ring-primary-500/20'
            />
          </div>

          {/* Error message */}
          {message && (
            <div
              role='alert'
              className='rounded-md border border-danger-200 bg-danger-50
                         px-4 py-3 text-center text-sm font-medium text-danger-600'
            >
              {message}
            </div>
          )}

          {/* Submit */}
          <button type='submit' className='btn-primary w-full py-3'>
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
