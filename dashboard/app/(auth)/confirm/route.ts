import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { getEnvVars } from '@/utilities/helpers'

// Route handler for email confirmation links
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const path = `${origin}/verified`

  // If no code is found in the link, send to error page
  if (!code) return NextResponse.redirect(`${path}?error=no-code`)

  const { url, anonKey } = getEnvVars()
  const response = NextResponse.redirect(path)

  // Route handlers can set cookies (unlike Server Actions), which
  // is why we handle the code exchange here instead of in a page
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        )
      },
    },
  })

  // Exchange the code for a session and set the auth cookie
  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) return NextResponse.redirect(`${path}?error=exchange-error`)

  return response
}
