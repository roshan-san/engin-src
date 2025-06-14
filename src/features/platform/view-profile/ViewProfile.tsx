import type { Profile } from "@/types/supa-types";
import { MapPin, Briefcase, Github, Linkedin, Mail, Globe, Calendar, ExternalLink, Users, MessageSquare, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "@tanstack/react-router";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function PublicProfileView({ profile }: { profile: Profile }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background shadow-lg cursor-pointer">
                    <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                    <AvatarFallback className="text-2xl">{profile.full_name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                      <AvatarFallback>{profile.full_name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{profile.full_name}</h4>
                      <p className="text-sm text-muted-foreground">@{profile.username}</p>
                      <div className="flex items-center pt-2">
                        <Calendar className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-xs text-muted-foreground">Joined 2024</span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{profile.full_name}</h1>
                    <p className="text-lg md:text-xl text-muted-foreground">@{profile.username}</p>
                  </div>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" asChild>
                            <Link to="/$username" params={{ username: profile.username }}>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Message
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Send a message to {profile.full_name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Users className="w-4 h-4 mr-2" />
                                Connections
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Profile Connections</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-4">
                                  <div className="flex items-center gap-4">
                                    <Avatar className="w-12 h-12">
                                      <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                                      <AvatarFallback>{profile.full_name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="text-sm font-medium">{profile.full_name}</p>
                                      <p className="text-xs text-muted-foreground">@{profile.username}</p>
                                    </div>
                                  </div>
                                  <Separator />
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <p className="text-sm font-medium">Followers</p>
                                      <p className="text-2xl font-bold">0</p>
                                    </div>
                                    <div className="space-y-2">
                                      <p className="text-sm font-medium">Following</p>
                                      <p className="text-2xl font-bold">0</p>
                                    </div>
                                  </div>
                                  <Separator />
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-sm font-medium">Recent Connections</h4>
                                      <Button variant="ghost" size="sm" className="h-8">
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Connect
                                      </Button>
                                    </div>
                                    <ScrollArea className="h-[200px] pr-4">
                                      <div className="space-y-4">
                                        {/* Placeholder for connection list */}
                                        <div className="flex items-center gap-3">
                                          <Avatar className="h-8 w-8">
                                            <AvatarFallback>JD</AvatarFallback>
                                          </Avatar>
                                          <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">John Doe</p>
                                            <p className="text-xs text-muted-foreground truncate">@johndoe</p>
                                          </div>
                                          <Button variant="ghost" size="sm" className="h-8">
                                            <MessageSquare className="w-4 h-4" />
                                          </Button>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Avatar className="h-8 w-8">
                                            <AvatarFallback>JS</AvatarFallback>
                                          </Avatar>
                                          <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">Jane Smith</p>
                                            <p className="text-xs text-muted-foreground truncate">@janesmith</p>
                                          </div>
                                          <Button variant="ghost" size="sm" className="h-8">
                                            <MessageSquare className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    </ScrollArea>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View profile connections</p>
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

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>Professional summary</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{profile.bio || "No bio available"}</p>
              </CardContent>
            </Card>

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
          </div>

          {/* Right Column */}
          <div className="md:col-span-2">
            <Tabs defaultValue="skills" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="interests">Interests</TabsTrigger>
              </TabsList>
              
              <TabsContent value="skills">
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
              </TabsContent>

              <TabsContent value="interests">
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
