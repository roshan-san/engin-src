import { Navigate } from '@tanstack/react-router'
import { FullScreenLoader } from '@/components/FullScreenLoader'
import { createContext, useContext } from 'react'
import { useAuth } from './useAuth'
import { useProfile } from './useProfile'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/types/supa-types'

type SessionContextType = {
  user: User
  profile: Profile
}

const SessionContext = createContext<SessionContextType | null>(null)

export function useMe() {
  const context = useContext(SessionContext)
  if (!context) throw new Error('useMe must be used inside <AuthProvider>')
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useAuth()
  const profile = useProfile()

  if (user.isLoading || profile.isLoading) {
    return <FullScreenLoader />
  }

  if (user.isError) {
    return <div>erropa</div>
  }

  if (!user.data) {
    return <Navigate to="/" />
  }

  if (profile.isError || !profile.data) {
    return <Navigate to="/register" />
  }

  return (
    <>
      <Navigate to="/dashboard" />
      <SessionContext.Provider value={{ user: user.data, profile: profile.data }}>
        {children}
      </SessionContext.Provider>
    </>
  )
}
