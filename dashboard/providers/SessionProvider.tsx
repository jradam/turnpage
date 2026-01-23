'use client'

import { initBrowserClient } from '@/supabase/browserClient'
import { SupabaseClient, User } from '@turnpage/shared'
import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type SessionContextType = {
  user: User | null
  supabase: SupabaseClient
}
const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({
  children,
}: {
  children: ReactNode
}): ReactElement {
  const [user, setUser] = useState<User | null>(null)
  const supabase = initBrowserClient()

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return (): void => {
      data.subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <SessionContext.Provider value={{ user, supabase }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession(): SessionContextType {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw Error('useSession must be used within a SessionProvider')
  }
  return context
}
