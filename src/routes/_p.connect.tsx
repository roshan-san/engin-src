import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_p/connect')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_p/connect"!</div>
}
