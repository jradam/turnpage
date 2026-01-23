'use server'

import { redirect } from 'next/navigation'
import { Profile, SupabaseClient, User } from '@turnpage/shared'
import { revalidatePath } from 'next/cache'
import { initServerClient } from '@/supabase/serverClient'

// Notes on error handling:
// - Supabase methods never throw (unless using throwOnError)
// - Thrown errors on server lose their message when sent to client anyway
// - So, handle errors in components on client side (toasts, inline messages, etc.)

// Check if the user is authenticated yet
export async function getUser(): Promise<User | null> {
  const supabase = await initServerClient()
  const { data } = await supabase.auth.getUser()
  return data.user
}

type Result<T> = { data: T; error: null } | { data: null; error: string }

// Get an authenticated supabase client and the user
const getAuthenticatedClient = async (): Promise<{
  supabase: SupabaseClient
  user: User
}> => {
  const supabase = await initServerClient()
  // Just read session from cookie since we already properly check user's auth in proxy.ts
  const { data, error } = await supabase.auth.getSession()

  if (error || !data.session?.user) redirect('/login')
  return { supabase, user: data.session.user }
}

export const getProfile = async (): Promise<Result<Profile>> => {
  const { supabase, user } = await getAuthenticatedClient()

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) return { data: null, error: error.message }
  if (!profile) return { data: null, error: 'No profile found' }

  return { data: profile, error: null }
}

export const updateProfile = async (
  profile: Partial<Profile>,
  noRevalidate?: 'no-revalidate',
): Promise<Result<Profile>> => {
  const { supabase, user } = await getAuthenticatedClient()

  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('user_id', user.id)
    .select('*')

  if (error) return { data: null, error: error.message }
  if (!data?.length) return { data: null, error: 'No profile found' }

  // Clear the server cache (and refresh the page for current viewers)
  if (!noRevalidate) revalidatePath(`/u/${profile.slug}`)

  return { data: data[0], error: null }
}

export const uploadImage = async ({
  file,
  filename,
  folder,
}: {
  file: File
  filename: string
  folder: string
}): Promise<Result<string>> => {
  const { supabase } = await getAuthenticatedClient()

  const extension = file.name.split('.').pop()
  const path = `${folder}/${filename}.${extension}`

  // Tell browsers to cache for a year, as the image will update when
  // needed anyway - as long as the cache busting link below is used
  const ONE_YEAR_IN_SECONDS = '31536000'

  const { data, error } = await supabase.storage
    .from('images')
    .upload(path, file, {
      cacheControl: ONE_YEAR_IN_SECONDS,
      upsert: true, // Replace file if exists
    })

  if (error) return { data: null, error: error.message }
  if (!data) return { data: null, error: 'No data returned' }

  // Add timestamp query for cache busting
  return { data: `/${data.fullPath}?v=${Date.now()}`, error: null }
}
