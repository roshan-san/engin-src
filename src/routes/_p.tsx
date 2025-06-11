import { LeftBar } from '@/features/platform/navigation/LeftBar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import supabase from '@/utils/supabase'

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
    <div className="flex h-screen">
      <LeftBar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
