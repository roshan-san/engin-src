import React from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id, Doc } from "../../../convex/_generated/dataModel";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Users } from "lucide-react";

interface CollaboratorsListProps {
  startupId: Id<"startups">;
  isOwner: boolean;
}

export const CollaboratorsList: React.FC<CollaboratorsListProps> = ({ startupId, isOwner }) => {
  // Fetch the startup to get the collaborators array
  const startup = useQuery(api.startups.queries.getStartup, { startupId });
  const removeCollaborator = useMutation(api.startups.mutations.removeCollaborator);
  const collaborators = startup?.collaborators || [];
  
  // Fetch all collaborator profiles
  const profiles = useQuery(api.profile.queries.getProfilesByIds, { ids: collaborators });
  
  // Fetch all accepted applications to get roles
  const acceptedApplications = useQuery(api.startups.queries.getAcceptedApplications, { startupId });

  function getProfile(profileId: Id<"profiles">) {
    return profiles?.find((p: Doc<"profiles">) => p._id === profileId);
  }

  function getRole(profileId: Id<"profiles">) {
    return acceptedApplications?.find((app: Doc<"applications">) => app.applicantId === profileId)?.acceptedRole || "Team Member";
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">Collaborators</h3>
        <Badge variant="secondary" className="ml-2">
          {collaborators.length}
        </Badge>
      </div>
      
      <div className="space-y-3">
        {collaborators.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No collaborators yet.</p>
            <p className="text-sm">Team members will appear here once they join.</p>
          </div>
        ) : (
          collaborators.map((collaboratorId: Id<"profiles">) => {
            const profile = getProfile(collaboratorId);
            const role = getRole(collaboratorId);
            
            return (
              <div key={collaboratorId} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                <div className="flex items-center gap-3">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="avatar" className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium">{profile?.name || "Unknown User"}</span>
                    <span className="text-sm text-muted-foreground">@{profile?.username || "username"}</span>
                  </div>
                  <Badge variant="outline" className="ml-3">{role}</Badge>
                </div>
                {isOwner && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeCollaborator({ startupId, collaboratorId })}
                  >
                    Remove
                  </Button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}; 