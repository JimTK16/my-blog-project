'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error('Login error:', error.message)
    // Redirect back to login with an error message in the search params.
    // login/page.tsx already reads searchParams.message and displays it.
    // This keeps the server action return type `void` (satisfying React 19 types).
    redirect('/login?message=Invalid+login+credentials')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard') // Send them to the dashboard after login
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
