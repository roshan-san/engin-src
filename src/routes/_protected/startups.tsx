import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/startups")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
