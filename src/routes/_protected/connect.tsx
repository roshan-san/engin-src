import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_protected/connect")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full flex flex-col p-4">
      page to show teh existing connections of the user
    </div>
  );
}
