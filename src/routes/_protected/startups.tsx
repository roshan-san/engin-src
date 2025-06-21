import { ConnectionAcc } from '@/features/platform/make-connections/ConnectionAcc'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/startups')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <ConnectionAcc/>
  </div>
}
