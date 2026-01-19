import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types/database.types'

export function createSupabase(
  env: Record<string, string | undefined>,
): SupabaseClient<Database> {
  const supabaseUrl = env.SUPABASE_URL
  const supabaseAnonKey = env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw Error('Missing Supabase env variables')
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}
