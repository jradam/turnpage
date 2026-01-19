import NavLink from '@/components/NavLink'
import AuthForm from '../AuthForm'
import { ReactElement } from 'react'

export default async function Signup(): Promise<ReactElement> {
  return (
    <>
      <AuthForm mode="Sign up" />

      <div className="flex gap-x-2">
        <span className="font-bold">Already a member?</span>
        <NavLink href="/login" forward>
          Log in
        </NavLink>
      </div>
    </>
  )
}
