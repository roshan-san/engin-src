import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_p/startups/$startupid')({
  component: RouteComponent,
})

function RouteComponent() {
  const { startupid } = Route.useParams()
  return <div>
    <h1>not fully ready yet , {startupid} , tis will be editable if the user owns this startup  othe wise for viewing anlone </h1>
  </div>
}
