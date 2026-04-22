import { NextResponse } from 'next/server'
// The client you created in lib/supabase/server.ts
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  // "next" allows you to redirect the user back to where they came from
  // (e.g., if they were trying to access /create while logged out)
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()

    // THE MAGIC STEP: Exchange the temporary code for a real user session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // Production host
      const isLocalEnv = process.env.NODE_ENV === 'development'

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // If there's no code or an error, send them to a login error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
