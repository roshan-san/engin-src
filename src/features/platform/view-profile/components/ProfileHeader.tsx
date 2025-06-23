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
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProfileConnections from "./ProfileConnections";

interface ProfileHeaderProps {
  profile: Doc<"profiles">;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <Card className="w-full flex border border-muted bg-background shadow-sm rounded-xl">
      <CardContent className="w-full p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">
          <div className="flex flex-col items-center gap-4 md:items-start md:flex-row md:gap-8">
            <Avatar className="w-24 h-24 shadow-sm border border-muted">
              <AvatarImage src={profile.avatar_url} alt={profile.name} />
              <AvatarFallback className="text-2xl font-semibold bg-muted text-primary">
                {profile.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center md:items-start gap-1">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-primary">
                {profile.name}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-mono">
                @{profile.username}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1">
                {profile.location && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
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
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4 mr-1 text-muted-foreground" />
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
          <div className="flex flex-row gap-3 mt-6 md:mt-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hover:bg-muted/60 border-muted"
                  >
                    <Link
                      to="/message/$username"
                      params={{ username: profile.username || "" }}
                    >
                      <MessageSquare className="w-4 h-4 mr-2 text-muted-foreground" />
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-muted/60 border-muted"
                  >
                    <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                    Connect
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send Connection Request</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="hover:bg-muted/60 border-muted">
                  <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                  Connections
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{profile.name}'s Connections</DialogTitle>
                </DialogHeader>
                <ProfileConnections profile={profile} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
