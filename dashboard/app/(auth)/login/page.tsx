import NavLink from '@/components/NavLink'
import AuthForm from '../AuthForm'
import { ReactElement } from 'react'
import { initServerClient } from '@/supabase/serverClient'
import { redirect } from 'next/navigation'

export default async function Login(): Promise<ReactElement> {
  const supabase = await initServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Automatically redirect if user is authenticated
  if (user?.email) redirect(`/u/profile`)

  return (
    <>
      <AuthForm mode="Log in" />

      <div className="flex gap-x-2">
        <span className="font-bold">Not a member?</span>
        <NavLink href="/signup" forward>
          Sign up
        </NavLink>
      </div>
    </>
  )
}
