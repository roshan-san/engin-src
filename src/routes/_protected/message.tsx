import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/message')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/message"!</div>
}
