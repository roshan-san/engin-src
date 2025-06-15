import {  useUser } from '@/features/authentication/contexts/AuthContext'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_p/test')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = useUser()
  return (
   <div>
    {user.email}
   </div>
  )
}
