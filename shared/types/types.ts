// ------------ PROFILE

export type ProfileType = 'author' | 'musician' | 'actor' // Only 'author' implemented for now

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

export type Profile = {
  id: string
  profile_type: ProfileType
  slug: string
  domain: string | null
  name: string | null
  bio: string[] | null
  photo_url: string | null

  var_banner_color: string | null

  el_body: Element | null
  el_h1: Element | null
  el_h2: Element | null
  el_button: Element | null

  metadata: AuthorData | null
  created_at: string
  updated_at: string
  published_at: string | null
  user_id?: string | null
}

// ------------ BOOK

export type WorkType = 'book' | 'album' | 'film' | 'project' // Only 'book' implemented for now

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

export type Book = {
  id: string
  profile_id: string
  work_type: WorkType
  title: string
  description: string[]
  cover_url: string
  release_date: string | null
  metadata: BookMetadata | null
  links: WorkLink[] | null
  order: number
  created_at: string | null
  updated_at: string | null
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
