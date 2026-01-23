'use client'

import { useSession } from '@/providers/SessionProvider'
import { useRouter } from 'next/navigation'

export function useLogout(): () => void {
  const { supabase } = useSession()
  const router = useRouter()

  const logout = async (): Promise<void> => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return logout
}
