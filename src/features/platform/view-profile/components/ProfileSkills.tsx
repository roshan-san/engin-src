import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Profile } from "@/types/supa-types";

interface ProfileSkillsProps {
  profile: Profile;
}

export function ProfileSkills({ profile }: ProfileSkillsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Skills</CardTitle>
        <CardDescription>Expertise and technologies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {profile.skills?.map((skill, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {skill}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Skill level: Expert</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 