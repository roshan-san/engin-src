import { useAuth } from '@/features/authentication/context/AuthContext'
import Container from '@/features/onboarding/Container'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const {user}= useAuth()
  return <div>
  {user ? (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Welcome {user.email}</h1>
      <p className="text-muted-foreground">Complete your profile to get started</p>
    </div>
  ) : 
  <Container/>
  }
</div>
}
