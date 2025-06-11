import { LeftBar } from '@/features/platform/navigation/LeftBar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_p')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="h-screen flex flex-col">
  <div className="flex flex-1">
    <div className="hidden md:block w-20">
      <LeftBar/>
    </div>
    <div className="flex-1">
      <Outlet/>
    </div>
  </div>
  <div className="md:hidden h-20">
    {/* <BottomBar /> */}
  </div>
</div>
}
