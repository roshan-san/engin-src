import SearchStartups from "@/features/platform/search-startups/SearchStartups";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/startups/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full flex flex-col p-4">
      <SearchStartups />
    </div>
  )
}
