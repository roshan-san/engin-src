import { BottomBar } from '@/features/platform/navigation-bars/BottomBar'
import { LeftBar } from '@/features/platform/navigation-bars/LeftBar'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { UserProvider } from '@/features/authentication/UserContext'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <UserProvider>
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
    </UserProvider>
  )
}
