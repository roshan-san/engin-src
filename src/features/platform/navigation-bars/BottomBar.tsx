import { Laptop, Search, Users, MessageCircle, } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/features/authentication/UserContext";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

const navigationItems = [
  { href: "/dashboard", icon: Laptop },
  { href: "/startups", icon: Search },
  { href: "/connect", icon: Users },
  { href: "/message", icon: MessageCircle },
];

export function BottomBar() {
  const { profile } = useUser();
  const unreadCount = useQuery(api.messages.queries.getUnreadMessagesCount);
  const unread = unreadCount ?? 0;

  return (
    <nav className="flex justify-evenly items-center w-full h-full">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
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
          {item.href === "/message" && unread > 0 && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </Link>
      ))}
      {profile.username && (
        <Link
          to={"/profile/$username"}
          params={{ username: profile.username }}
          activeProps={{
            className: "ring-2 ring-primary ring-offset-2",
          }}
          className="rounded-full"
        >
          <Avatar>
            <AvatarImage src={profile.avatar_url} />
          </Avatar>
        </Link>
      )}
    </nav>
  );
}
