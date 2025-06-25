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
import { Users, Briefcase, Building2 } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 py-4 sm:px-6 sm:py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              Startup Details
            </h1>
            <p className="text-sm text-muted-foreground">
              {isOwner ? "Manage your startup" : "Explore opportunities"}
            </p>
          </div>
        </div>

        {/* Main startup info */}
        <div>
          {isOwner ? (
            <EditStartup startup={startup} />
          ) : (
            <ViewStartup startup={startup} />
          )}
        </div>

        {/* Tabs section */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">
            Team & Opportunities
          </h2>
          
          <Tabs defaultValue="collaborators" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="collaborators" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Collaborators</span>
                <span className="sm:hidden">Team</span>
              </TabsTrigger>
              <TabsTrigger value="positions" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Positions</span>
                <span className="sm:hidden">Jobs</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="collaborators" className="pt-4">
              <Card className="border-0 shadow-lg bg-background rounded-xl">
                <CardContent className="p-4 sm:p-6">
                  <CollaboratorsList startupId={startup._id} isOwner={isOwner} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="positions" className="pt-4">
              <Card className="border-0 shadow-lg bg-background rounded-xl">
                <CardContent className="p-4 sm:p-6">
                  <PositionsList startupId={startup._id} isOwner={isOwner} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
