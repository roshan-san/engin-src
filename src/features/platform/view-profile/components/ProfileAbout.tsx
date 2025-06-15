import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Profile } from "@/types/supa-types";

interface ProfileAboutProps {
  profile: Profile;
}

export function ProfileAbout({ profile }: ProfileAboutProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
        <CardDescription>Professional summary</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{profile.bio || "No bio available"}</p>
      </CardContent>
    </Card>
  );
} 