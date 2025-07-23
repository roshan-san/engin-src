import SearchStartups from '@/features/platform/search-startups/SearchStartups'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/startups/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="max-w-6xl w-full mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Explore Startups</h1>
          <p className="text-muted-foreground text-lg">
            Discover innovative startups and find opportunities to collaborate
          </p>
        </div>
        <SearchStartups />
      </div>
    </div>
  )
}
