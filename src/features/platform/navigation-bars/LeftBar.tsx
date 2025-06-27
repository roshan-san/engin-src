import { Laptop, Search, Users, MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SignOutButton from "./SignOut";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/features/authentication/UserContext";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

const mainNavigationItems = [
  { href: "/dashboard", icon: Laptop, label: "Dashboard" },
  { href: "/startups", icon: Search, label: "Discover" },
  { href: "/connect", icon: Users, label: "Connect" },
  { href: "/message", icon: MessageCircle, label: "Messages" },
];

export function LeftBar() {
  const { profile } = useUser();
  const unreadCount = useQuery(api.messages.queries.getUnreadMessagesCount);

  return (
    <div className="flex h-full flex-col items-center">
      <div className="flex flex-col items-center gap-8 flex-grow py-10">
        {mainNavigationItems.map((item) => (
          <TooltipProvider key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={item.href}
                  activeProps={{
                    className:
                      "bg-primary text-primary-foreground shadow-sm p-2.5 rounded-lg transition-all duration-200 relative",
                  }}
                  inactiveProps={{
                    className:
                      "text-muted-foreground hover:bg-primary/10 hover:text-foreground p-2.5 rounded-lg transition-all duration-200 relative",
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  {/* Show notification dot for Messages tab */}
                  {item.href === "/message" && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      <div className="flex flex-col items-center gap-6 pb-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {profile.username ? (
                <Link
                  to={"/profile/$username"}
                  params={{ username: profile.username }}
                >
                  <Avatar>
                    <AvatarImage src={profile.avatar_url} />
                  </Avatar>
                </Link>
              ) : (
                <Avatar>
                  <AvatarImage src={profile.avatar_url} />
                </Avatar>
              )}
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              <p>{profile.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SignOutButton />
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              <p>Sign out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
