import { LeftBar } from '@/features/platform/navigation-bars/LeftBar'
import { BottomBar } from '@/features/platform/navigation-bars/BottomBar'
import { createFileRoute, Outlet, Navigate } from '@tanstack/react-router'
import { useAuth } from '@/features/authentication/store/authStore'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/_p')({
  component: RouteComponent,
})
function RouteComponent() {
  const user = useAuth()

  return (
    <div className="flex h-screen sm:flex-row flex-col w-full">
      {user.isLoading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
      ) : user.data ? (
        <>
          <div className="w-20 hidden md:block">
            <LeftBar />
          </div>
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
          <div className="w-20 md:hidden">
            <BottomBar />
          </div>
        </>
      ) :(
        <Navigate to="/" />
      )}
    </div>
  )
}
