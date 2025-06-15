import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Profile } from "@/types/supa-types";

interface ProfileInterestsProps {
  profile: Profile;
}

export function ProfileInterests({ profile }: ProfileInterestsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Areas of Interest</CardTitle>
        <CardDescription>Topics and domains of expertise</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {profile.interests?.map((interest, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-sm px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100">
                    {interest}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Area of expertise</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 