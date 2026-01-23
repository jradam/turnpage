'use client'

import { ReactElement } from 'react'
import { XCircleIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import NavLink from '@/components/NavLink'
import { useLogout } from '@/hooks/useLogout'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}): ReactElement {
  const router = useRouter()
  const logout = useLogout()

  return (
    <div
      role="alert"
      className="m-auto mt-20 w-full max-w-96 space-y-3 rounded-md bg-white p-8 text-center outline-1 outline-light"
    >
      <XCircleIcon className="mx-auto size-16 text-error" />
      <p className="font-semibold text-error">Something went wrong:</p>
      <p className="text-balance text-error">{error.message}</p>

      <div className="mx-auto mt-8 flex items-center justify-between">
        <NavLink action={router.back} back>
          Back
        </NavLink>

        <Button soft onClick={reset}>
          Try again
        </Button>

        <NavLink action={logout} forward>
          Log out
        </NavLink>
      </div>
    </div>
  )
}
