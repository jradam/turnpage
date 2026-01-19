import { test, expect, describe } from 'bun:test'
import { createSupabase } from './database'

const supabase = createSupabase(process.env)

describe('Supabase API queries', () => {
  test('fetch profiles where profile_type = "author"', async () => {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('profile_type', 'author')

    expect(error).toBeNull()
    expect(profiles?.length).toBeGreaterThan(0)
  })

  test('fetch works where work_type = "book"', async () => {
    const { data: works, error } = await supabase
      .from('works')
      .select('*')
      .eq('work_type', 'book')

    expect(error).toBeNull()
    expect(works?.length).toBeGreaterThan(0)
  })

  test('fetch news articles', async () => {
    const { data: news, error } = await supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false })

    expect(error).toBeNull()
    expect(news?.length).toBeGreaterThan(0)
  })

  test('JSONB filtering - books with formats in metadata', async () => {
    const { data: booksWithFormats, error } = await supabase
      .from('works')
      .select('*')
      .eq('work_type', 'book')
      .not('metadata->formats', 'is', null)

    expect(error).toBeNull()
    expect(booksWithFormats?.length).toBeGreaterThan(0)
  })
})
