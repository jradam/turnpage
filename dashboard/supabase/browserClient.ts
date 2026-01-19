import { getEnvVars } from '@/utilities/helpers'
import { createBrowserClient } from '@supabase/ssr'
import { SupabaseClient } from '@turnpage/shared'

// Supabase client for Client Components. Client is reused if it exists.
// (serverClient.ts can't do this as each server request might be a different user)

let client: SupabaseClient | null = null

export function initBrowserClient(): SupabaseClient {
  if (client) return client

  const { url, anonKey } = getEnvVars()
  client = createBrowserClient(url, anonKey)

  return client
}
