import { useAuth } from '@/features/authentication/context/AuthContext'
import { OnboardingProvider } from '@/features/onboarding/context/OnboardContext'
import { createFileRoute, redirect, } from '@tanstack/react-router'
import OnboardingSteps from '@/features/onboarding/OnboardingSteps'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
  loader: async () => {
    const profile = false
    if(profile) {
      throw redirect({to: '/dashboard'})
    }
  }
})

function RouteComponent() {
  const {user ,isLoading}= useAuth()

  if(isLoading) return <div>Loading...</div>
  if(!user) {
    throw redirect({to: '/'});
  }

  return <div className='flex flex-col items-center justify-center h-screen'>
    <OnboardingProvider>
      <OnboardingSteps/>
  </OnboardingProvider>
</div>
}
