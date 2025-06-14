import { OnboardingProvider } from '@/features/onboarding/context/OnboardContext'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import OnboardingSteps from '@/features/onboarding/OnboardingSteps'
import { Loader2 } from 'lucide-react'
import { useMyProfile } from '@/features/platform/hooks/ProfileHooks'


export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const profile = useMyProfile()
  const navigate=useNavigate()
  if(profile.isLoading){<Loader2/>}
  if(profile.data){navigate({to:"/dashboard"})}

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <OnboardingProvider>
        <OnboardingSteps/>
      </OnboardingProvider>
    </div>
  )
}
