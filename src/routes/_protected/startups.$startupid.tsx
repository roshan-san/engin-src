import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { type Id } from "../../../convex/_generated/dataModel";
import { useUser } from "../../features/authentication/UserContext";
import { ViewStartup } from "../../components/startups/ViewStartup";
import { EditStartup } from "../../components/startups/EditStartup";
import { FullScreenLoader } from "../../components/FullScreenLoader";

export const Route = createFileRoute("/_protected/startups/$startupid")({
  component: RouteComponent,
});

function RouteComponent() {
  const { startupid } = Route.useParams();
  const startup = useQuery(api.startups.queries.getStartup, {
    startupId: startupid as Id<"startups">,
  });
  const { profile } = useUser();

  if (!startup || !profile) {
    return <FullScreenLoader />;
  }

  const isOwner = startup.ownerId === profile._id;

  return (
    <div className="container mx-auto p-4">
      {isOwner ? (
        <EditStartup startup={startup} />
      ) : (
        <ViewStartup startup={startup} />
      )}
    </div>
  );
}
