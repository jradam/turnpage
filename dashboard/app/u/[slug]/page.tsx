import { ReactElement } from 'react'
import { redirect } from 'next/navigation'
import { getProfile } from '@/utilities/actions'
import EditProfile from './EditProfile'

type Props = {
  params: Promise<{ slug: string }>
}
export default async function Account({
  params,
}: Props): Promise<ReactElement> {
  const { data: profile, error } = await getProfile()
  if (!profile || error) throw Error(error || 'Profile not found')

  // Redirect to user slug (e.g. from /u/profile to /u/user-123)
  const { slug } = await params
  if (slug !== profile.slug) redirect(`/u/${profile.slug}`)

  return (
    <div className="mt-10 rounded-md border border-light bg-white px-8 py-6">
      <EditProfile profile={profile} />
    </div>
  )
}
