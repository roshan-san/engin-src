import { Card, CardContent } from "../../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Users, Crown, UserCheck } from "lucide-react";
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

  const getRoleIcon = (profileId: Id<"profiles">) => {
    if (profileId === startup.ownerId) return <Crown className="h-4 w-4 text-yellow-600" />;
    return <UserCheck className="h-4 w-4 text-blue-600" />;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-semibold text-foreground flex items-center gap-2">
        <Users className="h-6 w-6 text-primary" />
        Team Members
      </h2>
      
      {!teamProfiles || teamProfiles.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-foreground mb-2">No team members yet</h4>
          <p className="text-muted-foreground">This startup is looking for team members to join their journey.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {teamProfiles?.map((profile) => {
            if (!profile) return null;
            const role = getRole(profile._id);
            const roleIcon = getRoleIcon(profile._id);

            return (
              <Card key={profile._id} className="border border-border/50 shadow-sm bg-background/50 backdrop-blur-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-border/50">
                      <AvatarImage 
                        src={profile.avatar_url} 
                        alt={profile.name || profile.username || "Team Member"} 
                      />
                      <AvatarFallback className="text-lg lg:text-xl font-semibold bg-gradient-to-br from-primary to-primary/80 text-white">
                        {profile.name?.[0] || profile.username?.[0] || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg lg:text-xl font-semibold text-foreground truncate">
                          {profile.name || "Unknown User"}
                        </h3>
                        {roleIcon}
                      </div>
                      <Badge variant="secondary" className="mb-3 text-xs">
                        {role}
                      </Badge>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {profile.bio || `Team member at ${startup.name}`}
                      </p>
                      {profile.skills && profile.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {profile.skills?.slice(0, 3).map((skill: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                              {skill}
                            </Badge>
                          ))}
                          {profile.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs px-2 py-1">
                              +{profile.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
} 