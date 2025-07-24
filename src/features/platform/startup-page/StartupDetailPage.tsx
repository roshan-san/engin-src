import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Doc } from "../../../../convex/_generated/dataModel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { 
  Info,
  Users as UsersIcon,
  Briefcase
} from "lucide-react";
import { useUser } from "../../authentication/UserContext";
import {
  StartupHeader,
  StartupAbout,
  StartupTeam,
  StartupPositions,
  StartupSidebar
} from "./components";

interface StartupDetailPageProps {
  startup: Doc<"startups">;
  isOwner: boolean;
}

export function StartupDetailPage({ startup, isOwner }: StartupDetailPageProps) {
  const { profile } = useUser();
  
  // Get team members (collaborators + owner)
  const teamMemberIds = [startup.ownerId, ...(startup.collaborators || [])];
  const teamProfiles = useQuery(api.profile.queries.getProfilesByIds, { 
    ids: teamMemberIds 
  });

  // Get open positions
  const positions = useQuery(api.startups.queries.listPositions, { 
    startupId: startup._id 
  });

  // Get accepted applications to determine roles
  const acceptedApplications = useQuery(api.startups.queries.getAcceptedApplications, { 
    startupId: startup._id 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header Section - Fixed at top */}
      <StartupHeader startup={startup} isOwner={isOwner} />

      {/* Main Content - With proper spacing to avoid header overlap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Content - Left Side */}
          <div className="xl:col-span-3">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-12 lg:h-14 bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm sticky top-0 z-10">
                <TabsTrigger 
                  value="about" 
                  className="flex items-center gap-2 text-sm lg:text-base font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200"
                >
                  <Info className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span className="hidden sm:inline">About</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="team" 
                  className="flex items-center gap-2 text-sm lg:text-base font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200"
                >
                  <UsersIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span className="hidden sm:inline">Team</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="positions" 
                  className="flex items-center gap-2 text-sm lg:text-base font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200"
                >
                  <Briefcase className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span className="hidden sm:inline">Positions</span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-6 lg:mt-8">
                <TabsContent value="about" className="space-y-6">
                  <StartupAbout startup={startup} isOwner={isOwner} />
                </TabsContent>

                <TabsContent value="team" className="space-y-6">
                  <StartupTeam 
                    startup={startup} 
                    teamProfiles={teamProfiles || []} 
                    acceptedApplications={acceptedApplications || []} 
                  />
                </TabsContent>

                <TabsContent value="positions" className="space-y-6">
                  <StartupPositions 
                    startup={startup} 
                    positions={positions || []} 
                    profile={profile} 
                    isOwner={isOwner} 
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-6 space-y-6">
              <StartupSidebar startup={startup} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 