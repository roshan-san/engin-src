import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "@/features/platform/view-profile/components/ProfileHeader";
import { ProfileAbout } from "@/features/platform/view-profile/components/ProfileAbout";
import { ProfileSkills } from "@/features/platform/view-profile/components/ProfileSkills";
import type { Doc } from "@/../convex/_generated/dataModel";
import ProfileStartups from "../view-profile/components/ProfileStartups";

export default function EditProfile({
  profile,
}: {
  profile: Doc<"profiles">;
}) {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <ProfileHeader profile={profile} />

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-1">
          <ProfileAbout profile={profile} />
        </div>

        <div className="space-y-6 md:col-span-2">
          <Tabs defaultValue="skills">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="startups">Startups</TabsTrigger>
              <TabsTrigger value="skills">Skills & Interests</TabsTrigger>
            </TabsList>
            <TabsContent value="skills">
              <ProfileSkills profile={profile} />
            </TabsContent>
            <TabsContent value="startups">
              <ProfileStartups profile={profile} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
