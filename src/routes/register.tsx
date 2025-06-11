import { OnboardingProvider } from '@/features/onboarding/context/OnboardContext'
import { createFileRoute, redirect } from '@tanstack/react-router'
import OnboardingSteps from '@/features/onboarding/OnboardingSteps'
import supabase from '@/utils/supabase';

export const Route = createFileRoute('/register')({
  component: RouteComponent,
  beforeLoad: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    console.log("user found")
    console.log('user', user);
    if (user) {
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id);
      if (profile) {
        console.log('profile found');
        console.log(profile);
        throw redirect({ to: '/dashboard' });
      }
    }
  },
})

function RouteComponent() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <OnboardingProvider>
        <OnboardingSteps/>
      </OnboardingProvider>
    </div>
  )
}
