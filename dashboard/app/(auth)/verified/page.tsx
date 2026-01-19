import NavLink from '@/components/NavLink'
import { ReactElement } from 'react'

// User is sent here after email confirmation
export default async function Verified({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}): Promise<ReactElement> {
  const { error } = await searchParams

  return (
    <>
      <div className="flex max-w-96 flex-col items-center gap-y-6 rounded-md border border-light bg-white px-8 py-6">
        {error ? (
          <>
            <p className="font-bold text-error">Email verification failed</p>
            <NavLink href="/login" forward>
              Retry
            </NavLink>
          </>
        ) : (
          <>
            <p className="font-bold text-success">
              Email verified successfully
            </p>
            <NavLink href="/login" forward>
              Log in
            </NavLink>
          </>
        )}
      </div>

      <div className="flex gap-x-2">
        <span className="font-bold">Need help?</span>
        <NavLink href="/contact" forward>
          Contact us
        </NavLink>
      </div>
    </>
  )
}
