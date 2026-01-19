import NavLink from '@/components/NavLink'
import { redirect } from 'next/navigation'
import { ReactElement } from 'react'
import ResendEmail from './ResendEmail'

export default async function Verify({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; resend?: string }>
}): Promise<ReactElement> {
  const { email, resend } = await searchParams
  if (!email) redirect('/login')

  return (
    <>
      <div className="flex max-w-96 flex-col gap-y-6 rounded-md border border-light bg-white px-8 py-6 text-center">
        <div>
          <p>We sent an email to:</p>
          <strong className="text-highlight">{email}</strong>
        </div>

        <p className="text-balance">
          Click on the link in the email to complete signup.
        </p>

        <ResendEmail email={email} allowImmediateResend={!!resend} />
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
