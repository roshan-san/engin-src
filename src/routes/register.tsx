import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/authentication/context/AuthContext'
import { OnboardingProvider } from '@/features/onboarding/context/OnboardContext'
import Container from '@/features/onboarding/OnboardingSteps'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const {user, signOut ,isLoading}= useAuth()

  if(isLoading) return <div>Loading...</div>
  if(!user) {
    redirect({to: '/'});
    return <div>
      lalal
    </div>;
  }

  return <div>
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Welcome {user.email}</h1>
      <p className="text-muted-foreground">Complete your profile to get started</p>
    </div>
    <OnboardingProvider>
      <Container/>
      <Button onClick={() => signOut()}>Sign Out</Button>
  </OnboardingProvider>
</div>
}
