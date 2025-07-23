import { api } from "@/../convex/_generated/api";
import { useQuery } from "convex/react";
import StartupCard from "../search-startups/StartupCard";
import { StartupCardSkeleton } from "./StartupCardSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket } from "lucide-react";

export function StartupLists() {
  const myStartups = useQuery(api.startups.queries.getMyStartups);

  if (myStartups === undefined) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StartupCardSkeleton />
        <StartupCardSkeleton />
        <StartupCardSkeleton />
      </div>
    );
  }

  if (myStartups.length === 0) {
    return (
      <Alert>
        <Rocket className="h-4 w-4" />
        <AlertTitle>No Startups Yet!</AlertTitle>
        <AlertDescription>
          You haven't created any startups. Click the "Create Startup" button to get started.
        </AlertDescription>
      </Alert>
    );
  }

  const adaptedStartups = myStartups.map((startup) => ({
    ...startup,
    id: startup._id,
    created_at: startup._creationTime,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {adaptedStartups.map((startup) => (
        <StartupCard key={startup.id} startup={startup} />
      ))}
    </div>
  );
}
