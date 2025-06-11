import Hero from '@/features/landing/Hero'
import { createFileRoute } from '@tanstack/react-router'
import Header from '@/features/landing/Header'
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="min-h-screen flex flex-col">
    <Header/>
    <Hero/>
  </div>
}
