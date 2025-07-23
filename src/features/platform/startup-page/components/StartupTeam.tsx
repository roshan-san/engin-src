import { Card, CardContent } from "../../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import type { Doc, Id } from "@/../convex/_generated/dataModel";

interface StartupTeamProps {
  startup: Doc<"startups">;
  teamProfiles: any[];
  acceptedApplications: any[];
}

export function StartupTeam({ startup, teamProfiles, acceptedApplications }: StartupTeamProps) {
  const getRole = (profileId: Id<"profiles">) => {
    if (profileId === startup.ownerId) return "CEO & Founder";
    const application = acceptedApplications?.find(app => app.applicantId === profileId);
    return application?.acceptedRole || "Team Member";
  };



  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Team Members</h2>
      <div className="space-y-4">
        {teamProfiles?.map((profile) => {
          if (!profile) return null;
          const role = getRole(profile._id);

          
          return (
            <Card key={profile._id} className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage 
                      src={profile.avatar_url} 
                      alt={profile.name || profile.username || "Team Member"} 
                    />
                    <AvatarFallback className="text-lg font-semibold">
                      {profile.name?.[0] || profile.username?.[0] || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground">
                      {profile.name || "Unknown User"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {role}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {profile.bio || "Team member at " + startup.name}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills?.slice(0, 3).map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 