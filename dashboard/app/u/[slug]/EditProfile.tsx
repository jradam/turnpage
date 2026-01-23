'use client'

import ImageUpload from '@/components/ImageUpload'
import Input from '@/components/Input'
import { updateProfile } from '@/utilities/actions'
import { Profile } from '@turnpage/shared'
import { ReactElement, useEffect, useReducer } from 'react'
import { toast } from 'sonner'

const SAVE_INTERVAL_MS = 1000

type State = {
  slug: string
  name: string | null
  photo_url: string | null
}

type Props = {
  profile: Profile
}

export default function EditProfile(props: Props): ReactElement {
  const { profile } = props
  const [state, dispatch] = useReducer(
    (prev: State, next: Partial<State>): State => ({ ...prev, ...next }),
    {
      slug: profile.slug,
      name: profile.name,
      photo_url: profile.photo_url,
    },
  )

  // Debounced autosave on state change
  useEffect(() => {
    const hasChanges =
      state.slug !== profile.slug ||
      state.name !== profile.name ||
      state.photo_url !== profile.photo_url

    if (!hasChanges) return

    const timeout = setTimeout(async () => {
      const { data, error } = await updateProfile(state, 'no-revalidate')

      if (!data || error) {
        toast.error(error || 'Error updating profile')
        return
      }

      toast.success('Profile updated')
    }, SAVE_INTERVAL_MS)

    return (): void => clearTimeout(timeout)
  }, [state, profile])

  return (
    <div className="flex flex-col gap-y-6">
      <Input
        label="Username"
        value={state.slug}
        onChange={(value) => dispatch({ slug: value })}
      />
      <Input
        label="Author name"
        value={state.name || ''}
        onChange={(value) => dispatch({ name: value })}
      />
      <ImageUpload
        label="Author image"
        filename="author_image"
        folder={`profiles/${profile.id}`}
        previewUrl={state.photo_url}
        onUpload={(value) => dispatch({ photo_url: value })}
      />
    </div>
  )
}
