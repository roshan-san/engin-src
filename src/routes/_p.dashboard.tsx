import CreateBtn from '@/features/platform/dashboard/CreateBtn'
import { useMyStartups } from '@/features/platform/dashboard/hooks/useStartups'
import Header from '@/features/platform/Header'
import StartupCard from '@/features/platform/search-startups/StartupCard'
import { createFileRoute } from '@tanstack/react-router'

function StartupCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
      <div className="p-6 space-y-4">
        <div className="h-6 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_p/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const {data:myStartups,isLoading} = useMyStartups()
  console.log(myStartups)
  
  if (isLoading) {
    return (
      <div className="h-full flex flex-col p-4 gap-12">
        <Header>Dashboard</Header>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <StartupCardSkeleton key={i} />
            ))}
          </div>
          <CreateBtn />
        </div>
      </div>
    )
  }

  if (!myStartups){
    return(
      <div></div>
    )
  }

  return (
    <div className="h-full flex flex-col p-4 gap-12">
      <Header>Dashboard</Header>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {myStartups.length === 0 ? (
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
