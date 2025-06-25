import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { type Id } from "../../../convex/_generated/dataModel";
import { useUser } from "../../features/authentication/UserContext";
import { ViewStartup } from "../../components/startups/ViewStartup";
import { EditStartup } from "../../components/startups/EditStartup";
import { FullScreenLoader } from "../../components/FullScreenLoader";
import { PositionsList } from "@/components/startups/PositionsList";
import { CollaboratorsList } from "@/components/startups/CollaboratorsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, Info } from "lucide-react";

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
    <div className="container mx-auto max-w-6xl p-4 md:p-6 space-y-6">
      {/* Main startup info section */}
      <div className="space-y-4">
        {isOwner ? (
          <EditStartup startup={startup} />
        ) : (
          <ViewStartup startup={startup} />
        )}
      </div>

      {/* Tabs for collaborators and positions */}
      <Tabs defaultValue="collaborators" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
          <TabsTrigger value="collaborators" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Collaborators</span>
            <span className="sm:hidden">Team</span>
          </TabsTrigger>
          <TabsTrigger value="positions" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Open Positions</span>
            <span className="sm:hidden">Jobs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="collaborators" className="mt-6">
          <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-md">
            <CardContent className="p-6">
              <CollaboratorsList startupId={startup._id} isOwner={isOwner} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions" className="mt-6">
          <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-md">
            <CardContent className="p-6">
              <PositionsList startupId={startup._id} isOwner={isOwner} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
