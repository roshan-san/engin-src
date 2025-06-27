import { Laptop, Search, Users, MessageCircle, type LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/features/authentication/UserContext";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

type NavigationItem = {
  href: string;
  icon: LucideIcon;
};

const navigationItems: NavigationItem[] = [
  { href: "/dashboard", icon: Laptop },
  { href: "/startups", icon: Search },
  { href: "/connect", icon: Users },
  { href: "/message", icon: MessageCircle },
];

const navLinkBaseClasses =
  "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200";
const navLinkActiveClasses = "bg-primary text-primary-foreground";
const navLinkInactiveClasses = "text-muted-foreground hover:bg-primary/10";

function NavigationLink({ href, icon: Icon, unread }: NavigationItem & { unread?: number }) {
  return (
    <Link
      to={href}
      activeProps={{
        className: `${navLinkBaseClasses} ${navLinkActiveClasses}`,
      }}
      inactiveProps={{
        className: `${navLinkBaseClasses} ${navLinkInactiveClasses}`,
      }}
    >
      <div className="relative">
        <Icon className="h-5 w-5" />
        {href === "/message" && unread && unread > 0 && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </div>
    </Link>
  );
}

export function BottomBar() {
  const { profile } = useUser();
  const unreadCount = useQuery(api.messages.queries.getUnreadMessagesCount);
  const unread = unreadCount ?? 0;

  return (
    <nav className="flex justify-evenly items-center w-full h-full">
      {navigationItems.map((item) => (
        <NavigationLink key={item.href} {...item} unread={item.href === "/message" ? unread : undefined} />
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
