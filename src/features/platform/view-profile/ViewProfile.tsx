import type { Profile } from "@/types/supa-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "@/features/platform/view-profile/components/ProfileHeader";
import { ProfileAbout } from "@/features/platform/view-profile/components/ProfileAbout";
import { ProfileSocialLinks } from "@/features/platform/view-profile/components/ProfileSocialLinks";
import { ProfileSkills } from "@/features/platform/view-profile/components/ProfileSkills";
import { ProfileInterests } from "@/features/platform/view-profile/components/ProfileInterests";

export default function PublicProfileView({ profile }: { profile: Profile }) {

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        <ProfileHeader 
          profile={profile} 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <ProfileAbout profile={profile} />
            <ProfileSocialLinks profile={profile} />
          </div>

          {/* Right Column */}
          <div className="md:col-span-2">
            <Tabs defaultValue="skills" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="interests">Interests</TabsTrigger>
              </TabsList>
              
              <TabsContent value="skills">
                <ProfileSkills profile={profile} />
              </TabsContent>

              <TabsContent value="interests">
                <ProfileInterests profile={profile} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
