import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FaMapMarkerAlt,
  FaUser,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaUserPlus,
  FaTimes,
  FaUserMinus,
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
        icon: <FaUserPlus className="h-4 w-4" />, text: "Connect",
      };
    }
    if (connection.status === "accepted") {
      return {
        icon: <FaUserMinus className="h-4 w-4" />, text: "Remove Friend",
      };
    }
    if (connection.status === "pending") {
      return {
        icon: <FaTimes className="h-4 w-4" />, text: "Cancel Request",
      };
    }
    return {
      icon: <FaUserPlus className="h-4 w-4" />, text: "Connect",
    };
  };

  const buttonContent = getButtonContent();

  return (
    <Card>
      <CardHeader className="flex-row gap-4 items-center">
        <Link
          to="/profile/$username"
          params={{ username: profile.username ?? "" }}
          className="shrink-0"
        >
          <Avatar className="h-14 w-14 border-2 border-primary/20 transition-all duration-300 group-hover:border-primary/40 bg-background">
            <AvatarImage src={profile.avatar_url} />
            <AvatarFallback className="text-xl">
              {profile.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1 min-w-0">
          <Link
            to="/profile/$username"
            params={{ username: profile.username ?? "" }}
          >
            <h3 className="font-semibold text-base transition-colors group-hover:text-primary truncate">
              {profile.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground truncate">
            @{profile.username}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {profile.user_type && (
            <Badge
              variant="default"
              className="gap-1 text-xs font-medium bg-primary/10 text-primary border-none rounded-full px-2 py-0.5"
            >
              <FaUser className="h-2.5 w-2.5" />
              {profile.user_type}
            </Badge>
          )}
          {profile.location && (
            <Badge
              variant="secondary"
              className="gap-1 text-xs font-medium rounded-full px-2 py-0.5"
            >
              <FaMapMarkerAlt className="h-2.5 w-2.5" />
              {profile.location}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
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
              <p>Message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant={!connection ? "default" : "ghost"}
                className="h-8 w-8 rounded-full"
                onClick={handleConnectionAction}
              >
                {buttonContent.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{buttonContent.text}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {(profile.github_url || profile.linkedin_url) && (
          <div className="flex items-center gap-2 border-l border-border/60 pl-2">
            {profile.github_url && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={profile.github_url}
                      target="_blank"
                      className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
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
                      className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
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
    </Card>
  );
}
