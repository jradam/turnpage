import Logo from '@/assets/Logo'
import NavLink from '@/components/NavLink'
import { ReactElement, ReactNode } from 'react'

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode
}>): ReactElement {
  return (
    <>
      <nav className="flex gap-x-6 px-8 py-6">
        <NavLink back href="/">
          Home
        </NavLink>
      </nav>

      <div className="mt-8 flex flex-col items-center gap-y-6 pb-20">
        <Logo icon />

        {children}
      </div>
    </>
  )
}
