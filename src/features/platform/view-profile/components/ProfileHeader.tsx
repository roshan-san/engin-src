import { MapPin, Briefcase, MessageSquare, Users, Github, Linkedin, User } from "lucide-react";
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
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import ProfileConnections from "./ProfileConnections";

interface ProfileHeaderProps {
  profile: Doc<"profiles">;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/30 rounded-xl overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
          {/* Profile Info */}
          <div className="flex items-start gap-3 lg:gap-4 flex-1 min-w-0">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <Avatar className="w-16 h-16 sm:w-20 sm:h-20 shadow-lg border-2 border-primary/20">
                <AvatarImage src={profile.avatar_url} alt={profile.name} />
                <AvatarFallback className="text-lg sm:text-xl font-semibold bg-gradient-to-br from-primary/20 to-primary/40 text-primary">
                  {profile.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
              </div>
            </div>
            
            {/* Profile Details */}
            <div className="min-w-0 flex-1">
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                    {profile.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded-md">
                      @{profile.username}
                    </span>
                  </div>
                </div>
                
                {profile.bio && (
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                    {profile.bio}
                  </p>
                )}
                
                {/* Profile Stats */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {profile.location && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">
                              {profile.location}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Location</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  
                  {profile.work_type && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                            <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
                            <span className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-300">
                              {profile.work_type}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Work Type</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  
                  {profile.user_type && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50">
                            <User className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                            <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">
                              {profile.user_type}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>User Type</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 lg:flex-shrink-0">
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {profile.github_url && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="h-9 w-9 sm:h-10 sm:w-10 p-0 hover:bg-muted/60 border-muted"
                      >
                        <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 text-muted-foreground" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>GitHub Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              {profile.linkedin_url && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="h-9 w-9 sm:h-10 sm:w-10 p-0 hover:bg-muted/60 border-muted"
                      >
                        <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4 text-muted-foreground" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>LinkedIn Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="hover:bg-muted/60 border-muted h-9 sm:h-10"
                    >
                      <Link
                        to="/message/$username"
                        params={{ username: profile.username || "" }}
                      >
                        <MessageSquare className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span className="text-xs sm:text-sm">Message</span>
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
                      className="hover:bg-muted/60 border-muted h-9 sm:h-10"
                    >
                      <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-xs sm:text-sm">Connect</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send Connection Request</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="hover:bg-muted/60 border-muted h-9 sm:h-10">
                    <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-xs sm:text-sm">Connections</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <ProfileConnections profile={profile} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
