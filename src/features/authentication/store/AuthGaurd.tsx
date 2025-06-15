import { Navigate } from "@tanstack/react-router"
import { useAuth } from "./authStore"
import { FullScreenLoader } from "@/components/FullScreenLoader"
import type { User } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'

const UserContext = createContext<User | null>(null)

export function useUser() {
  const user = useContext(UserContext)
  if (!user) throw new Error('useUser must be used within AuthGuard')
  return user
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = useAuth()

  if (user.isLoading) return <FullScreenLoader/>

  if(user.isError) return <div>error vantu pa</div>

  if (!user.data) return <Navigate to="/"/>

  return (
    <UserContext.Provider value={user.data}>
      {children}
    </UserContext.Provider>
  )
}
