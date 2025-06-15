import { LeftBar } from '@/features/platform/navigation-bars/LeftBar'
import { BottomBar } from '@/features/platform/navigation-bars/BottomBar'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AuthGuard } from '@/features/authentication/store/AuthGaurd'

export const Route = createFileRoute('/_p')({
  component: RouteComponent,
})
function RouteComponent() {

  return (
    <AuthGuard>
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
    </AuthGuard>
  )
}
