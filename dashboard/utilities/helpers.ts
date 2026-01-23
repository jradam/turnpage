import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function getEnvVars(): {
  url: string
  anonKey: string
  storagePath: string
} {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const storagePath = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PATH

  if (!url || !anonKey || !storagePath) throw Error('Missing env vars')
  return { url, anonKey, storagePath }
}
