import { createSupabase } from '../utilities/database'
import { readFileSync, readdirSync, unlinkSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// This is a post-build script that removes unused fonts from the build output
// (templates bundle all fonts when built, but each author only uses one or two)

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '../..')
const distDir = join(process.argv[2] || '.', 'dist/_astro')

// Load environment variables
function loadEnvFile(path: string): Record<string, string> {
  const contents = readFileSync(path, 'utf-8')
  const env: Record<string, string> = {}

  for (const line of contents.split('\n')) {
    const separatorIndex = line.indexOf('=')
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex)
    const value = line.slice(separatorIndex + 1)
    env[key] = value
  }

  return env
}

const env = loadEnvFile(join(rootDir, '.env'))

// Fetch profile from database
const { data: profile } = await createSupabase(env)
  .from('profiles')
  .select('*')
  .eq('id', env.PROFILE_ID)
  .single()

if (!profile || !existsSync(distDir)) {
  process.exit(0)
}

// Get font families from profile
function getFontsFromProfile(data: Record<string, unknown>): string[] {
  const families: string[] = []

  for (const [key, value] of Object.entries(data)) {
    if (!key.startsWith('el_')) continue

    if (
      value !== null &&
      typeof value === 'object' &&
      'family' in value &&
      typeof value.family === 'string'
    ) {
      families.push(value.family)
    }
  }

  return [...new Set(families)] // Remove duplicates
}

const usedFontFamilies = getFontsFromProfile(profile) // e.g. [ "Playfair Display Variable" ]

// Convert "Caveat Variable" -> "caveat"
function simplifyFontFamily(family: string): string {
  return family
    .replace(/\s+Variable$/i, '') // Remove "Variable" suffix
    .toLowerCase()
    .replace(/\s+/g, '-') // Spaces to dashes
}

const filesToKeep = usedFontFamilies.map(simplifyFontFamily) // e.g. [ "playfair-display" ]

// Remove unused font files
let removedCount = 0

// filenames are like "playfair-display-vietnamese-wght-italic.DUEcMSM3.woff2"
for (const filename of readdirSync(distDir)) {
  if (!filename.endsWith('.woff2')) continue

  const isUsedFont = filesToKeep.some((font) => filename.startsWith(font))
  const isLatinSubset = filename.includes('latin')
  const shouldKeep = isUsedFont && isLatinSubset

  if (!shouldKeep) {
    unlinkSync(join(distDir, filename))
    removedCount++
  }
}

/* eslint-disable-next-line no-console */
console.log(`Removed ${removedCount} unused font files`)
