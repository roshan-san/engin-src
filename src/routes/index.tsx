import { createFileRoute } from '@tanstack/react-router'
import Hero from '@/features/landing/hero'
import Header from '@/features/landing/Header'
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Header/>
    <Hero/>
  </div>
}
