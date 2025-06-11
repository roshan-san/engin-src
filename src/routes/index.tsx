import Hero from '@/features/landing/Hero'
import { createFileRoute } from '@tanstack/react-router'
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
