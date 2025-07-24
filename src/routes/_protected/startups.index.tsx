import SearchStartups from '@/features/platform/search-startups/SearchStartups'
import { createFileRoute } from '@tanstack/react-router'
import { CreateBtn } from '@/features/platform/create-startup/CreateBtn'

export const Route = createFileRoute('/_protected/startups/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-full flex flex-col p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl w-full mx-auto">
        <SearchStartups />
      </div>
      <CreateBtn />
    </div>
  )
}
