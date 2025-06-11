import CreateBtn from '@/features/platform/dashboard/CreateBtn'
import Header from '@/features/platform/Header'
import StartupCard from '@/features/platform/search-startups/StartupCard'
import supabase from '@/utils/supabase'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/_p/dashboard')({
  component: RouteComponent,
  loader: async () => {
    const { data } = await supabase.from("startups").select('*').eq('founder_id', "07f1e584-2847-41d4-9c6f-d854419f6cd5")
    return data
  }
})

function RouteComponent() {
  const loaderData = useLoaderData({
    from: "/_p/dashboard"
  })

  if (!loaderData || loaderData.length === 0) {
    return (
      <div className="h-full flex flex-col p-4 gap-12">
        <Header>Dashboard</Header>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="col-span-3 text-center py-10">
              <p className="text-muted-foreground">No startups found. Create your first startup!</p>
            </div>
          </div>
          <CreateBtn />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col p-4 gap-12">
      <Header>Dashboard</Header>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {loaderData.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
        <CreateBtn />
      </div>
    </div>
  )
}
