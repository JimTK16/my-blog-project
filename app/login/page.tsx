import { login } from '@/lib/actions/auth'

export default function LoginPage({
  searchParams
}: {
  searchParams: { message: string }
}) {
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

        <button className='bg-blue-600 rounded-md px-4 py-2 text-white font-bold mb-2 hover:bg-blue-700 transition'>
          Sign In
        </button>

        {searchParams?.message && (
          <p className='mt-4 p-4 bg-red-100 text-red-700 text-center rounded-md'>
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
