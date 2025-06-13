import { getAllStartupsById } from '@/api/startups'
import { useAuth } from '@/features/authentication/store/authStore'
import CreateBtn from '@/features/platform/create-startup/CreateBtn'
import Header from '@/features/platform/Header'
import StartupCard from '@/features/platform/search-startups/StartupCard'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_p/dashboard')({
  component: RouteComponent,
})

export default function RouteComponent() {
  const { data: user } = useAuth()
  const { data: myStartups, isLoading: myStartupsLoading } = useQuery({
    queryKey: ["mystartups", user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error('User ID is required')
      console.log(user.id)
      return getAllStartupsById(user.id)
    },
    enabled: !!user?.id
  })
  return (
    
    <div className="h-full flex flex-col p-4 gap-12">
      <Header>Dashboard</Header>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          {myStartupsLoading ? (
            <div className="col-span-3 text-center py-10">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : !myStartups ? (
            <div className="col-span-3 text-center py-10">
              <p className="text-muted-foreground">Startup object not found</p>
            </div>
          ) : myStartups?.length === 0 ? (
            <div className="col-span-3 text-center py-10">
              <p className="text-muted-foreground">No startups found. Create your first startup!</p>
            </div>
          ) : (
            myStartups.map((startup) => (
              <StartupCard key={startup.id} startup={startup} />
            ))
          )}
        </div>
        <CreateBtn />
      </div>
    </div>
  )
}
