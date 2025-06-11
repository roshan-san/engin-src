import { useAuth } from '@/features/authentication/context/AuthContext'
import { OnboardingProvider } from '@/features/onboarding/context/OnboardContext'
import Container from '@/features/onboarding/OnboardingSteps'
import { createFileRoute, redirect, } from '@tanstack/react-router'

const user = true

export const Route = createFileRoute('/register')({
  component: RouteComponent,
  loader: async () => {
    if(user) {
      throw redirect({to: '/dashboard'})
    }
  }
})

function RouteComponent() {
  const {user ,isLoading}= useAuth()

  if(isLoading) return <div>Loading...</div>
  if(!user) {
    redirect({to: '/'});
    return <div>
      lalal
    </div>;
  }

  return <div className='flex flex-col items-center justify-center h-screen'>
    <OnboardingProvider>
      <Container/>
  </OnboardingProvider>
</div>
}
