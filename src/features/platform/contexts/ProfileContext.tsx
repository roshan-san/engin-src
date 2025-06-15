import { createContext, useContext, ReactNode } from 'react'
import type { Profile } from '@/types/supa-types'
import { useQuery } from '@tanstack/react-query'
import { getUserApi } from '@/api/auth'

interface ProfileContextType {
  profile: Profile | undefined
  isLoading: boolean
  error: Error | null
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['auth-user'],
    queryFn: getUserApi,
    staleTime: Infinity,
    gcTime: Infinity
  })

  return (
    <ProfileContext.Provider value={{ profile, isLoading, error }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function kcj() {
  const context = useContext(ProfileContext)
  const k= useProfile()
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
