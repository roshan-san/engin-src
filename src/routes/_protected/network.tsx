import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/network')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Network</h1>
    </div>
  )
}
