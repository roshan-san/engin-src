import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Profile } from "@/types/supa-types";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ProfileAboutProps {
  profile: Profile;
}

interface SocialLink {
  icon: LucideIcon;
  label: string;
  url: string | null;
}

function SocialLinkButton({ icon: Icon, label, url }: SocialLink) {
  if (!url) return null;
  
  return (
    <Button variant="outline" className="w-full justify-start group" asChild>
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center">
        <Icon className="w-4 h-4 mr-2" />
        <span className="flex-1">{label}</span>
        <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    </Button>
  );
}

export function ProfileAbout({ profile }: ProfileAboutProps) {
  const socialLinks: SocialLink[] = [
    { icon: Github, label: "GitHub", url: profile.github_url },
    { icon: Linkedin, label: "LinkedIn", url: profile.linkedin_url },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
          <CardDescription>Professional summary</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{profile.bio || "No bio available"}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Connect on professional networks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {socialLinks.map((link) => (
              <SocialLinkButton key={link.label} {...link} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 