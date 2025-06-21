  import { BottomBar } from '@/features/platform/navigation-bars/BottomBar'
import { LeftBar } from '@/features/platform/navigation-bars/LeftBar'
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { api } from '@/../convex/_generated/api'
import { useQuery } from 'convex/react'

  export const Route = createFileRoute('/_protected')({
    component: RouteComponent,
  })

  function RouteComponent() {
    const profile = useQuery(api.profile.getUserProfile)?.profile
    if (!profile) {
      return <Navigate to="/" />
    }
    return (
          <div className="flex h-screen sm:flex-row flex-col w-full">
            <div className="w-20 hidden md:block">
              <LeftBar />
            </div>
            <main className="flex-1 overflow-y-auto">
              <Outlet />
            </main>
            <div className="w-20 md:hidden">
              <BottomBar />
            </div>
          </div>
    )
  }
