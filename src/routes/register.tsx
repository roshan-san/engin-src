import { OnboardingProvider } from '@/features/onboarding/context/OnboardContext'
import OnboardingSteps from '@/features/onboarding/OnboardingSteps'
import { createFileRoute, } from '@tanstack/react-router'
import { useConvexAuth,  } from 'convex/react';

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isAuthenticated , isLoading} = useConvexAuth()
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {isLoading && <div>Loading...</div>}
      {isAuthenticated && <div>hello you are aiuuthed</div>}
      hello
    </div>
  )
}
