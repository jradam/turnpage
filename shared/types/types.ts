import type { Tables } from './database.types'

// TODO: Implement pg_jsonschema extension to lock down the schema for generic Json
// columns in Supabase, though unfortunately this does not help with generated types
// OR: Move away from using Json table columns entirely

// ------------ PROFILE

export type Font =
  | 'Noto Serif Variable'
  | 'Playfair Display Variable'
  | 'Caveat Variable'

export type Element = {
  family: Font | null
  weight: 'normal' | 'bold' | 'bolder' | 'lighter' | null
  style: 'normal' | 'italic' | null
  color: string | null
  bg_color: string | null
}

export type AuthorData = {
  genre?: string[]
  awards?: string[]
  agent?: string
  goodreads_url?: string
}

// Use generated types from Supabase, but override columns that are generic 'Json' type
export type Profile = Omit<
  Tables<'profiles'>,
  'el_body' | 'el_h1' | 'el_h2' | 'el_button' | 'metadata'
> & {
  el_body: Element | null
  el_h1: Element | null
  el_h2: Element | null
  el_button: Element | null
  metadata: AuthorData | null
}

// ------------ BOOK
// Called generic 'works' in database for future-proofing
// e.g. for actors, could be 'films' not 'books'

export type WorkLink = {
  type: 'amazon' | 'custom'
  url: string
  label: string
}

type BookFormat =
  | { format: 'audiobook'; minutes: number }
  | { format: string; isbn: string }

export type BookMetadata = {
  author?: string
  formats?: BookFormat[]
  pages?: number
  publisher?: string
}

// Use generated types from Supabase, but override columns that are generic 'Json' type
export type Book = Omit<Tables<'works'>, 'metadata' | 'links'> & {
  metadata: BookMetadata | null
  links: WorkLink[] | null
}

// ------------ NEWS

export type NewsArticle = {
  id: string
  profile_id: string
  title: string
  slug: string
  content: string[]
  image_url: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}
