import Hero from '@/features/landing/Hero'
import { createFileRoute } from '@tanstack/react-router'
import Header from '@/features/landing/Header'
import { Authenticated, Unauthenticated } from 'convex/react'
import { OnboardingProvider } from '@/features/onboarding/context/OnboardContext'
import OnboardingSteps from '@/features/onboarding/OnboardingSteps'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div className="min-h-screen flex flex-col">
        <Authenticated>
        <OnboardingProvider>
            <OnboardingSteps/>
          </OnboardingProvider>
        </Authenticated>
        <Unauthenticated>
        <Header />
        <Hero />
        </Unauthenticated>
      </div>
  )
}
