import CreateBtn from '@/features/platform/create-startup/CreateBtn'
import Header from '@/features/platform/Header'
import { useMyStartups } from '@/features/platform/hooks/StartupHooks'
import StartupCard from '@/features/platform/search-startups/StartupCard'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/_p/dashboard')({
  component: RouteComponent,
})

export default function RouteComponent() {
  const myStartups = useMyStartups()
  return (
    
    <div className="h-full flex flex-col p-4 gap-12">
      <Header>Dashboard</Header>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        </div>
        <CreateBtn />
      </div>
    </div>
  )
}
