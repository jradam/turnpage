import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { SupabaseClient } from '@turnpage/shared'
import { getEnvVars } from '@/utilities/helpers'

// Supabase client for Server Components and Server Actions. It reads
// auth tokens from the cookies the browser sends in the request headers
// to check who is logged in

export async function initServerClient(): Promise<SupabaseClient> {
  const { url, anonKey } = getEnvVars()
  const cookieStore = await cookies()

  return createServerClient(url, anonKey, {
    cookies: { getAll: () => cookieStore.getAll() },
  })
}
