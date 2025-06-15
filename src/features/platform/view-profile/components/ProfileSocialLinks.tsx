import { Github, Linkedin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/types/supa-types";

interface ProfileSocialLinksProps {
  profile: Profile;
}

export function ProfileSocialLinks({ profile }: ProfileSocialLinksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
        <CardDescription>Connect on professional networks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {profile.github_url && (
            <Button variant="outline" className="w-full justify-start group" asChild>
              <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
                <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>
          )}
          {profile.linkedin_url && (
            <Button variant="outline" className="w-full justify-start group" asChild>
              <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
                <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 