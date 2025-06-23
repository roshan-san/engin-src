import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/startups/$startupid")({
  component: RouteComponent,
});

function RouteComponent() {
  const {startupid}= Route.useParams()
  return <div>
    hello you {startupid} will build later 
  </div>;
}
