import type { Doc } from "@/../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import ProfileCard from "@/features/platform/search-profiles/ProfileCard";

export default function ConnectionsList({ profile }: { profile: Doc<"profiles"> }) {
  // Fetch connected profiles for the given profile
  const connectedProfiles = useQuery(api.messages.queries.getConnectedProfilesById, {
    profileId: profile._id,
  });

  return (
    <Card className="w-full mt-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Connections</h2>
        {connectedProfiles && connectedProfiles.length > 0 ? (
          <div className="flex flex-col gap-2">
            {connectedProfiles.map((connectedProfile: any) => (
              <ProfileCard key={connectedProfile._id} profile={connectedProfile} />
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-center py-4">No connections yet.</div>
        )}
      </CardContent>
    </Card>
  );
} 