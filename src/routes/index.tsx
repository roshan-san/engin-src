import Hero from '@/features/landing/Hero'
import { createFileRoute, Navigate } from '@tanstack/react-router'
import Header from '@/features/landing/Header'
import { Authenticated, Unauthenticated, useQuery } from 'convex/react'
import { OnboardingProvider } from '@/features/onboarding/context/OnboardContext'
import OnboardingSteps from '@/features/onboarding/OnboardingSteps'
import {api} from "@/../convex/_generated/api"
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const data = useQuery(api.profile.getUserProfile) 
  return (
    <div className="min-h-screen flex flex-col">
      <Authenticated>
        {data?.profile? 
          (<Navigate to='/dashboard'/>):
          (
            <OnboardingProvider>
            <OnboardingSteps />
          </OnboardingProvider>
          )
        }
        
      </Authenticated>
      <Unauthenticated>
        <Header />
        <Hero />
      </Unauthenticated>
    </div>
  )
}
