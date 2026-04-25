import { login } from '@/lib/actions/auth'

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ message: string }>
}) {
  const { message } = await searchParams
  return (
    <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-[80vh]'>
      <form
        className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground'
        action={login}
      >
        <h1 className='text-2xl font-bold mb-6'>Admin Login</h1>

        <label className='text-md font-medium' htmlFor='email'>
          Email
        </label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border mb-6 text-black'
          name='email'
          placeholder='you@example.com'
          required
        />

        <label className='text-md font-medium' htmlFor='password'>
          Password
        </label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border mb-6 text-black'
          type='password'
          name='password'
          placeholder='••••••••'
          required
        />

        <button className='bg-bloom-600 rounded-md px-4 py-2 text-white font-bold mb-2 hover:bg-bloom-700 transition'>
          Sign In
        </button>

        {message && (
          <p className='mt-4 p-4 bg-danger-50 border border-danger-200 text-danger-600 text-center rounded-md text-sm font-medium'>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
