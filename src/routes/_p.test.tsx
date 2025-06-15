import { useAuth } from '@/features/authentication/store/useAuth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_p/test')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = useAuth()
  return <div>
  </div>
}
