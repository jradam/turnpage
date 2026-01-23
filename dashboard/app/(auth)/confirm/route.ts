import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { getEnvVars } from '@/utilities/helpers'

// Route handler for email confirmation links
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams, origin } = request.nextUrl

  const errorPath = `${origin}/login`
  const destination = `${origin}/u/profile`

  // Re-encode with '+' so we can pass through again
  const linkError = searchParams.get('error_description')?.replace(/ /g, '+')
  const code = searchParams.get('code')

  if (linkError || !code) {
    return NextResponse.redirect(
      `${errorPath}?error=${linkError || 'Link+error'}`,
    )
  }

  const { url, anonKey } = getEnvVars()
  const response = NextResponse.redirect(destination)

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
  if (error) return NextResponse.redirect(`${errorPath}?error=Login+error`)

  return response
}
