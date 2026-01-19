import type { NextConfig } from 'next'
import { config } from 'dotenv'

config({ path: '../.env' })

if (
  !process.env.SUPABASE_URL ||
  !process.env.SUPABASE_ANON_KEY ||
  !process.env.SUPABASE_STORAGE_PATH
) {
  throw Error('Env vars are not set at project root')
}

const nextConfig: NextConfig = {
  typedRoutes: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_STORAGE_PATH: process.env.SUPABASE_STORAGE_PATH,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: new URL(process.env.SUPABASE_URL).hostname,
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
