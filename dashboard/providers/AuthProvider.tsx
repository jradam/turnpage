'use client'

import { initBrowserClient } from '@/supabase/browserClient'
import { User } from '@turnpage/shared'
import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type AuthContextType = { user: User | null }
const AuthContext = createContext<AuthContextType>({ user: null })

export function AuthProvider({
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
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw Error('useAuth must be used within an AuthProvider')
  }
  return context
}
