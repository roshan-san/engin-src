import { useNavigate } from "@tanstack/react-router"
import { useAuth } from "./authStore"
import { Loader2 } from "lucide-react"


export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useAuth()
  const navigate = useNavigate()

  if (isLoading) return <div className="flex items-center justify-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>

  if (!user) {
    navigate({ to: '/' })
    return null
  }

  return <>{children}</>
}
