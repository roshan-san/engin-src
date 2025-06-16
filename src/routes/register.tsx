import { OnboardingProvider } from '@/features/onboarding/context/OnboardContext'
import OnboardingSteps from '@/features/onboarding/OnboardingSteps'
import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useProfile } from '@/features/authentication/contexts/useProfile'
import { useAuth } from '@/features/authentication/contexts/useAuth'
import { FullScreenLoader } from '@/components/FullScreenLoader'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: user, isLoading: isUserLoading } = useAuth()
  const { data: profile, isLoading: isProfileLoading } = useProfile()

  if (isUserLoading || isProfileLoading) {
    return <FullScreenLoader />
  }

  if (!user) {
    return <Navigate to="/" />
  }

  if (profile) {
    return <Navigate to="/dashboard" />
  }
  
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <OnboardingProvider>
        <OnboardingSteps/>
      </OnboardingProvider>
    </div>
  )
}
