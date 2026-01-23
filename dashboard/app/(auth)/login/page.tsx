import NavLink from '@/components/NavLink'
import { ReactElement } from 'react'
import AuthForm from '../AuthForm'

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}): Promise<ReactElement> {
  // Errors from email verification failing get sent here
  const { error } = await searchParams

  return (
    <>
      <AuthForm mode="Log in" initialError={error} />

      <div className="flex gap-x-2">
        <span className="font-bold">Not a member?</span>
        <NavLink href="/signup" forward>
          Sign up
        </NavLink>
      </div>
    </>
  )
}
