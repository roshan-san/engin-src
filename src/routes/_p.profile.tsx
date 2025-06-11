import Header from '@/features/platform/Header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_p/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-full flex flex-col p-4 gap-12">
      <Header>Profile</Header>
    </div>
  )
}
