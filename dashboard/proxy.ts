import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { getEnvVars } from './utilities/helpers'

// This runs before every request. It:
// 1. Protects auth routes at /u/*
// 2. Keeps users logged in by refreshing their auth tokens

export default async function proxy(
  request: NextRequest,
): Promise<NextResponse> {
  // Public routes don't need auth checks
  if (!request.nextUrl.pathname.toLowerCase().startsWith('/u')) {
    return NextResponse.next()
  }

  const response = NextResponse.next({ request: { headers: request.headers } })
  const { url, anonKey } = getEnvVars()

  // Proxy.ts has access to the response object, so unlike serverClient.ts, this can set cookies
  // So, when getUser() below refreshes tokens, they can be saved
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) =>
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        ),
    },
  })

  // Check if user is logged in, and refresh their token (getUser refreshes token if necessary)
  const { data, error } = await supabase.auth.getUser()
  if (!data.user || error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}
