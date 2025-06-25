import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { type Id } from "../../../convex/_generated/dataModel";
import { useUser } from "../../features/authentication/UserContext";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { StartupBox } from "@/features/platform/startup-page/StartupBox";
import { ExtraTabs } from "@/features/platform/startup-page/ExtraTabs";

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
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 space-y-6">
        <div className="bg-card rounded-2xl border shadow-sm">
            <StartupBox startup={startup} />
        </div>
        <ExtraTabs startup={startup} isOwner={isOwner} />
      </div>
    </div>
  );
}
