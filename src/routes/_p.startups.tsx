import SearchStartups from '@/features/platform/search-startups/SearchStartups'
import Header from '@/features/platform/Header'
import { createFileRoute, Outlet, useMatches } from '@tanstack/react-router'

export const Route = createFileRoute('/_p/startups')({
  component: RouteComponent,
})

function RouteComponent() {
  const matches = useMatches()
  const isStartupDetails = matches.some(match => match.routeId === '/_p/startups/$startupid')

  return (
    <div className="h-full flex flex-col p-4">
      <Header>Startups</Header>
      {isStartupDetails ? <Outlet /> : <SearchStartups />}
    </div>
  )
}
