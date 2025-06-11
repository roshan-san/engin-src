import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_p/message')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_p/message"!</div>
}
