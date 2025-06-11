import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_p/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_p/profile"!</div>
}
