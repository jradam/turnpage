'use client'

import { ReactElement } from 'react'
import { QuestionMarkCircleIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
import NavLink from '@/components/NavLink'
import { useLogout } from '@/hooks/useLogout'

export default function NotFound(): ReactElement {
  const router = useRouter()
  const logout = useLogout()

  return (
    <div
      role="alert"
      className="m-auto mt-20 w-full max-w-96 space-y-3 rounded-md bg-white p-8 text-center outline-1 outline-light"
    >
      <QuestionMarkCircleIcon className="mx-auto size-16 text-highlight" />
      <p className="font-semibold">Page not found</p>

      <div className="mx-auto mt-8 flex items-center justify-between">
        <NavLink action={router.back} back>
          Back
        </NavLink>

        <NavLink action={logout} forward>
          Log out
        </NavLink>
      </div>
    </div>
  )
}
