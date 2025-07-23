import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { useUser } from "@/features/authentication/UserContext";
import { ProfileHeader } from "@/features/platform/view-profile/components/ProfileHeader";
import { ProfileAbout } from "@/features/platform/view-profile/components/ProfileAbout";
import { ProfileSkills } from "@/features/platform/view-profile/components/ProfileSkills";
import ProfileStartups from "@/features/platform/view-profile/components/ProfileStartups";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { User, Briefcase, Building2 } from "lucide-react";
export const Route = createFileRoute("/_protected/profile/$username")({
  component: ProfilePage,
});

function ProfilePage() {
  const { username } = Route.useParams();
  const { profile: currentUser } = useUser();
  
  const profile = useQuery(api.profile.queries.getProfileByUsername, {
    username: username
  });
  
  if (profile === undefined) {
    return <FullScreenLoader />;
  }
  
  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
            <User className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Profile Not Found</h2>
          <p className="text-muted-foreground">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?._id === profile._id;

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 py-4 sm:px-6 sm:py-6 space-y-6">
        <div>
          <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ProfileAbout profile={profile} />
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue="startups" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-12">
                  <TabsTrigger value="startups" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Startups</span>
                    <span className="sm:hidden">Companies</span>
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span className="hidden sm:inline">Skills & Interests</span>
                    <span className="sm:hidden">Skills</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="startups" className="pt-4">
                  <Card className="border-0 shadow-lg bg-background rounded-xl">
                    <CardContent className="p-4 sm:p-6">
                      <ProfileStartups 
                        profile={profile}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills" className="pt-4">
                  <Card className="border-0 shadow-lg bg-background rounded-xl">
                    <CardContent className="p-4 sm:p-6">
                      <ProfileSkills profile={profile} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
