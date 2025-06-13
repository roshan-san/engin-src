import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import supabase from '@/utils/supabase'
import { LeftBar } from '@/features/platform/navigation-bars/LeftBar'
import { BottomBar } from '@/features/platform/navigation-bars/BottomBar'
export const Route = createFileRoute('/_p')({
  component: RouteComponent,
  beforeLoad: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      throw redirect({ to: '/' })
    }
    return { user }
  }
})

function RouteComponent() {
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
