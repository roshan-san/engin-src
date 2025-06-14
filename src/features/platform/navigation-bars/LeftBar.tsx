import { Laptop, Search, Users, MessageCircle, Loader2, } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import SignOutButton from "./SignOut";
import { Link } from "@tanstack/react-router";
import { useProfile } from "@/features/authentication/store/profileStrore";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
const mainNavigationItems = [
  { href: "/dashboard", icon: Laptop, label: "Dashboard" },
  { href: "/startups", icon: Search, label: "Discover" },
  { href: "/connect", icon: Users, label: "Connect" },
  { href: "/message", icon: MessageCircle, label: "Messages" },
];

export function LeftBar() {
  const profile = useProfile()
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
                    className: "bg-primary text-primary-foreground shadow-sm p-2.5 rounded-lg transition-all duration-200"
                  }}
                  inactiveProps={{
                    className: "text-muted-foreground hover:bg-primary/10 hover:text-foreground p-2.5 rounded-lg transition-all duration-200"
                  }}
                >
                  <item.icon className="h-5 w-5" />
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
              {profile.isLoading ? (
                <div className="p-2.5">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              ) : profile.data ? (
                <Link
                  to={"/profile/$username"}
                  params={{ username: profile.data.username }}
                >
                  <Avatar>
                    <AvatarImage src={profile.data.avatar_url} />
                  </Avatar>
                </Link>
              ) : null}
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              <p>{profile.data?.full_name}</p>
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
