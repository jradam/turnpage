// @ts-check
import { defineConfig, envField } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import { config } from 'dotenv'

config({ path: '../../.env' })

if (
  !process.env.SUPABASE_URL ||
  !process.env.SUPABASE_ANON_KEY ||
  !process.env.PROFILE_ID
) {
  throw Error('Env vars are not set at project root')
}

// Get just the hostname from our supabase url to use as the image domain
const imageHost = new URL(process.env.SUPABASE_URL).hostname

// https://astro.build/config
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  image: { domains: [imageHost] },
  env: {
    schema: {
      SUPABASE_URL: envField.string({ context: 'server', access: 'secret' }),
      SUPABASE_ANON_KEY: envField.string({ context: 'server', access: 'secret' }),
      PROFILE_ID: envField.string({ context: 'server', access: 'secret' }),
    },
  },
})
