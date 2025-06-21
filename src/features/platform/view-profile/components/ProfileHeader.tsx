import { MapPin, Briefcase, MessageSquare, Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "@tanstack/react-router";
import type { Doc } from "@/../convex/_generated/dataModel";

interface ProfileHeaderProps {
  profile: Doc<"profiles">;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <Card className="w-full flex">
      <CardContent>
        <div className="flex items-center justify-around gap-6">
          <Avatar className="w-24 h-24 shadow-lg">
            <AvatarImage src={profile.avatar_url} alt={profile.name} />
            <AvatarFallback className="text-2xl">
              {profile.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center jusity-between gap-4">
              <div>
                <h1 className="text-xl md:text-3xl font-bold tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  @{profile.username}
                </p>
              </div>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to="/message/$username"
                          params={{ username: profile.username }}
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send a message to {profile.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send Connection Request</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {profile.location && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{profile.location}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Location</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      <span>{profile.work_type}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Work Type</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
