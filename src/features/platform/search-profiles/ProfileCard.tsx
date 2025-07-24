import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaUserPlus,
  FaUserMinus,
  FaClock,
} from "react-icons/fa";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Doc } from "@/../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function ProfileCard({ profile }: { profile: Doc<"profiles"> }) {
  const connection = useQuery(api.connections.queries.getConnectionStatus, {
    receiverId: profile._id,
  });

  const createConnection = useMutation(
    api.connections.mutations.createConnection,
  );
  const rejectConnection = useMutation(
    api.connections.mutations.rejectConnection,
  );

  const handleConnectionAction = () => {
    if (!connection) {
      createConnection({
        receiverId: profile._id,
      });
    } else {
      rejectConnection({
        id: connection._id,
      });
    }
  };

  const getButtonContent = () => {
    if (!connection) {
      return {
        icon: <FaUserPlus className="h-3 w-3 sm:h-4 sm:w-4" />, 
        text: "Connect",
        variant: "default" as const,
        className: "bg-primary hover:bg-primary/90 text-primary-foreground"
      };
    }
    if (connection.status === "accepted") {
      return {
        icon: <FaUserMinus className="h-3 w-3 sm:h-4 sm:w-4" />, 
        text: "Connected",
        variant: "outline" as const,
        className: "border-green-500 text-green-600 hover:bg-green-50"
      };
    }
    if (connection.status === "pending") {
      return {
        icon: <FaClock className="h-3 w-3 sm:h-4 sm:w-4" />, 
        text: "Pending",
        variant: "outline" as const,
        className: "border-yellow-500 text-yellow-600 hover:bg-yellow-50"
      };
    }
    return {
      icon: <FaUserPlus className="h-3 w-3 sm:h-4 sm:w-4" />, 
      text: "Connect",
      variant: "default" as const,
      className: "bg-primary hover:bg-primary/90 text-primary-foreground"
    };
  };

  const buttonContent = getButtonContent();

  return (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-border/50 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <CardHeader className="relative pb-2">
          <div className="flex items-start gap-3">
            <Link
              to="/profile/$username"
              params={{ username: profile.username ?? "" }}
              className="shrink-0"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-background shadow-xl group-hover:border-primary/30 transition-all duration-300 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                <Avatar className="w-full h-full rounded-none">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback className="text-lg sm:text-xl font-bold bg-gradient-to-br from-primary to-primary/80 text-white rounded-none">
                    {profile.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </Link>
            
            <div className="flex-1 min-w-0 space-y-1">
              <Link
                to="/profile/$username"
                params={{ username: profile.username ?? "" }}
                className="block"
              >
                <h3 className="font-bold text-base sm:text-lg transition-colors group-hover:text-primary">
                  {profile.name}
                </h3>
              </Link>
              
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  @{profile.username}
                </span>
                {profile.user_type && (
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium bg-primary/10 text-primary border-none rounded-full px-2 py-0.5"
                  >
                    {profile.user_type}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative pb-2">
          <div className="space-y-2">
            {profile.bio && (
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {profile.bio}
              </p>
            )}
            
            {/* Location */}
            {profile.location && (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                <FaMapMarkerAlt className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                <span>{profile.location}</span>
              </div>
            )}
            
            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-semibold text-foreground">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {profile.skills.slice(0, 2).map((skill, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-xs px-1.5 py-0.5 bg-background/50"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {profile.skills.length > 2 && (
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                      +{profile.skills.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="relative flex flex-col gap-2 pt-2 border-t border-border/30">
          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-2 w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    asChild
                  >
                    <Link
                      to="/message/$username"
                      params={{ username: profile.username ?? "" }}
                    >
                      <FaEnvelope className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant={buttonContent.variant}
                    className={`rounded-full transition-all duration-200 text-xs sm:text-sm ${buttonContent.className}`}
                    onClick={handleConnectionAction}
                  >
                    {buttonContent.icon}
                    <span className="ml-1.5 sm:ml-2 font-medium">{buttonContent.text}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{buttonContent.text}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Social Links */}
          {(profile.github_url || profile.linkedin_url) && (
            <div className="flex items-center justify-center gap-2">
              {profile.github_url && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={profile.github_url}
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 p-1.5 rounded-full hover:bg-muted/50"
                      >
                        <FaGithub className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View GitHub Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {profile.linkedin_url && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={profile.linkedin_url}
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 p-1.5 rounded-full hover:bg-muted/50"
                      >
                        <FaLinkedin className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View LinkedIn Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          )}
        </CardFooter>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <CardHeader className="relative pb-3">
          <div className="flex items-start gap-3">
            <Link
              to="/profile/$username"
              params={{ username: profile.username ?? "" }}
              className="shrink-0"
            >
              <div className="w-16 h-16 border-2 border-background shadow-lg group-hover:border-primary/30 transition-all duration-300 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                <Avatar className="w-full h-full rounded-none">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-primary to-primary/80 text-white rounded-none">
                    {profile.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </Link>
            
            <div className="flex-1 min-w-0 space-y-1">
              <Link
                to="/profile/$username"
                params={{ username: profile.username ?? "" }}
                className="block"
              >
                <h3 className="font-bold text-lg transition-colors group-hover:text-primary truncate">
                  {profile.name}
                </h3>
              </Link>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  @{profile.username}
                </span>
                {profile.user_type && (
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium bg-primary/10 text-primary border-none rounded-full px-2 py-0.5"
                  >
                    {profile.user_type}
                  </Badge>
                )}
              </div>
              
              {profile.bio && (
                <p className="text-sm text-muted-foreground line-clamp-1 leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative pb-3">
          <div className="space-y-2">
            {/* Location */}
            {profile.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FaMapMarkerAlt className="h-4 w-4 text-blue-500" />
                <span>{profile.location}</span>
              </div>
            )}
            
            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-foreground">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {profile.skills.slice(0, 3).map((skill, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-xs px-1.5 py-0.5 bg-background/50"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {profile.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                      +{profile.skills.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="relative flex justify-between items-center pt-3 border-t border-border/30">
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    asChild
                  >
                    <Link
                      to="/message/$username"
                      params={{ username: profile.username ?? "" }}
                    >
                      <FaEnvelope className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant={buttonContent.variant}
                    className={`rounded-full transition-all duration-200 text-sm ${buttonContent.className}`}
                    onClick={handleConnectionAction}
                  >
                    {buttonContent.icon}
                    <span className="ml-2 font-medium">{buttonContent.text}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{buttonContent.text}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Social Links */}
          {(profile.github_url || profile.linkedin_url) && (
            <div className="flex items-center gap-2 border-l border-border/60 pl-3">
              {profile.github_url && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={profile.github_url}
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 p-1.5 rounded-full hover:bg-muted/50"
                      >
                        <FaGithub className="h-4 w-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View GitHub Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {profile.linkedin_url && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={profile.linkedin_url}
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 p-1.5 rounded-full hover:bg-muted/50"
                      >
                        <FaLinkedin className="h-4 w-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View LinkedIn Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
