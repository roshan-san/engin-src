import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel.d.ts";
import { useUser } from "../../features/authentication/useUser";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { StartupEditPage } from "@/features/platform/startup-page/StartupEditPage";

export const Route = createFileRoute("/_protected/startup-edit/$startupid")({
  component: RouteComponent,
});

function RouteComponent() {
  const { startupid } = Route.useParams();
  const startup = useQuery(api.startups.queries.getStartup, {
    startupId: startupid as Id<"startups">,
  });
  const { profile } = useUser();

  // Test if route component is being called
  console.log("Edit route component called with startupid:", startupid);
  console.log("Startup data:", startup);
  console.log("Profile data:", profile);

  if (!startup) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-foreground mb-4">Loading Startup...</h1>
          <p className="text-muted-foreground mb-2">Startup ID: {startupid}</p>
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return <FullScreenLoader />;
  }

  const isOwner = startup.ownerId === profile._id;

  if (!isOwner) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to edit this startup.</p>
        </div>
      </div>
    );
  }

  return <StartupEditPage startup={startup} />;
} 