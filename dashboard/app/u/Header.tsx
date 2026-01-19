'use client'

import { ReactElement } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import Logo from '@/assets/Logo'
import NavLink from '@/components/NavLink'
import { initBrowserClient } from '@/supabase/browserClient'
import { useRouter } from 'next/navigation'

export default function Header(): ReactElement | null {
  const { user } = useAuth()
  const router = useRouter()

  const logout = async (): Promise<void> => {
    const supabase = initBrowserClient()
    await supabase.auth.signOut()
    router.push('/')
  }

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
