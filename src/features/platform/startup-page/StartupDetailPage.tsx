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
import { CreateBtn } from "../create-startup/CreateBtn";

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
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <StartupHeader startup={startup} isOwner={isOwner} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about" className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  About
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4" />
                  Team
                </TabsTrigger>
                <TabsTrigger value="positions" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Positions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6 mt-6">
                <StartupAbout startup={startup} isOwner={isOwner} />
              </TabsContent>

              <TabsContent value="team" className="space-y-6 mt-6">
                <StartupTeam 
                  startup={startup} 
                  teamProfiles={teamProfiles || []} 
                  acceptedApplications={acceptedApplications || []} 
                />
              </TabsContent>

              <TabsContent value="positions" className="space-y-6 mt-6">
                <StartupPositions 
                  startup={startup} 
                  positions={positions || []} 
                  profile={profile} 
                  isOwner={isOwner} 
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <StartupSidebar startup={startup} />
        </div>
      </div>

      {/* Floating Action Button for Owners */}
      {isOwner && <CreateBtn />}
    </div>
  );
} 