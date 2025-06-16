import { AuthProvider } from '@/features/authentication/contexts/AuthContext'
import { BottomBar } from '@/features/platform/navigation-bars/BottomBar'
import { LeftBar } from '@/features/platform/navigation-bars/LeftBar'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ConvexProvider, ConvexReactClient } from "convex/react";

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
})

function RouteComponent() {
  const deploymentURL = import.meta.env.VITE_CONVEX_URL;
  const convex = new ConvexReactClient(deploymentURL);
  return (
    <ConvexProvider client={convex}>
      <AuthProvider>
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
      </AuthProvider>
    </ConvexProvider>
  )
}
