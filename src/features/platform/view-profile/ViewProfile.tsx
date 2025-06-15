import type { Profile } from "@/types/supa-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "@/features/platform/view-profile/components/ProfileHeader";
import { ProfileAbout } from "@/features/platform/view-profile/components/ProfileAbout";
import { ProfileSkills } from "@/features/platform/view-profile/components/ProfileSkills";

export default function PublicProfileView({ profile }: { profile: Profile }) {
  return (
    <div className="h-full flex flex-col border-2 gap-4 items-center justify-center border-red-800">
      <ProfileHeader profile={profile}/>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-amber-300 border ">
        {/* Left Column */}
        <div className="space-y-6">
          <ProfileAbout profile={profile} />
        </div>

        {/* Right Column */}
        <div className="md:col-span-2">
          <Tabs defaultValue="skills" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="skills">Skills and Interests</TabsTrigger>
              <TabsTrigger value="startups">Startups</TabsTrigger>
            </TabsList>
            
            <TabsContent value="skills">
              <ProfileSkills profile={profile} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
