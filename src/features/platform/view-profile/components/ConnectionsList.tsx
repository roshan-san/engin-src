import type { Doc } from "@/../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import ProfileCard from "@/features/platform/search-profiles/ProfileCard";
import { Users } from "lucide-react";

export default function ConnectionsList({ profile }: { profile: Doc<"profiles"> }) {
  // Fetch connected profiles for the given profile
  const connectedProfiles = useQuery(api.messages.queries.getConnectedProfilesById, {
    profileId: profile._id,
  });

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Connections</h2>
      {connectedProfiles && connectedProfiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {connectedProfiles.map((connectedProfile: any) => (
            <ProfileCard key={connectedProfile._id} profile={connectedProfile} />
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground text-center py-8">
          <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="font-medium mb-1">No connections yet</p>
          <p className="text-sm">This user hasn't connected with anyone yet.</p>
        </div>
      )}
    </div>
  );
} 