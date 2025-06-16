import Hero from '@/features/landing/Hero'
import { createFileRoute } from '@tanstack/react-router'
import Header from '@/features/landing/Header'
import { ConvexProvider, ConvexReactClient } from "convex/react"

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const deploymentURL = import.meta.env.VITE_CONVEX_URL;
  const convex = new ConvexReactClient(deploymentURL);
  
  return (
    <ConvexProvider client={convex}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Hero />
      </div>
    </ConvexProvider>
  )
}
