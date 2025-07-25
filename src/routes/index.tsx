import Hero from "@/features/landing/Hero";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import Header from "@/features/landing/Header";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { OnboardProvider } from "@/features/onboarding/context/OnboardContext";
import OnboardingSteps from "@/features/onboarding/OnboardingSteps";
import { api } from "@/../convex/_generated/api";
import { FullScreenLoader } from "@/components/FullScreenLoader";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const data = useQuery(api.auth.getUser);

  return (
    <div className="min-h-screen flex flex-col">
      <Authenticated>
        {data === undefined ? (
          <FullScreenLoader />
        ) : data?.profile ? (
          <Navigate to="/home" />
        ) : (
          <OnboardProvider>
            <OnboardingSteps />
          </OnboardProvider>
        )}
      </Authenticated>
      <Unauthenticated>
        <Header />
        <Hero />
      </Unauthenticated>
    </div>
  );
}
