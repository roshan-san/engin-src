import { OnboardingProvider } from '@/features/onboarding/context/OnboardContext'
import { createFileRoute,redirect,useNavigate } from '@tanstack/react-router'
import OnboardingSteps from '@/features/onboarding/OnboardingSteps'
import { useProfile } from '@/features/authentication/store/profileStrore';
import { useEffect } from 'react';

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: profile } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      navigate({ to: '/' });
    }
  }, [profile, navigate]);

  if (!profile) {
    return null; // Return null while redirecting
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <OnboardingProvider>
        <OnboardingSteps/>
      </OnboardingProvider>
    </div>
  )
}
