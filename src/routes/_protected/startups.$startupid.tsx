import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/startups/$startupid")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hllo "/_protected/startups/$startupid"!</div>;
}
