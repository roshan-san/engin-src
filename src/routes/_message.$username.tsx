import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_message/$username')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_message/$username"!</div>
}
