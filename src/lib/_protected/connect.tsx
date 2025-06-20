import Header from '@/features/platform/Header'
import SearchProfiles from '@/features/platform/search-profiles/SearchProfiles'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/_protected/connect')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="h-full flex flex-col p-4">
    <Header>Connect</Header>
    <SearchProfiles />
  </div>
}
