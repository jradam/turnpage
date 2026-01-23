'use client'

import Logo from '@/assets/Logo'
import NavLink from '@/components/NavLink'
import { useLogout } from '@/hooks/useLogout'
import { useSession } from '@/providers/SessionProvider'
import { ReactElement } from 'react'

export default function Header(): ReactElement | null {
  const { user } = useSession()
  const logout = useLogout()

  return (
    <nav className="flex items-center gap-x-3 px-6 py-6">
      <Logo icon className="size-10" />
      <div className="text-sm">
        <span>{user?.email}</span>
        <NavLink action={logout}>Log out</NavLink>
      </div>
    </nav>
  )
}
