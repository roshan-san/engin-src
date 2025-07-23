import { TrendingUp, Laptop, Search, Users, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

const navigationItems = [
  { href: "/home", icon: Laptop, label: "Home" },
  { href: "/trending", icon: TrendingUp, label: "Trending" },
  { href: "/startups", icon: Search, label: "Explore" },
  { href: "/message", icon: MessageCircle, label: "Messages" },
  { href: "/connect", icon: Users, label: "Network" },
];

export function BottomBar() {
  const unreadCount = useQuery(api.messages.queries.getUnreadMessagesCount);
  const unread = unreadCount ?? 0;

  return (
    <nav className="block md:hidden fixed bottom-0 left-0 w-full bg-background border-t z-50 flex justify-evenly items-center h-16">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          activeProps={{
            className:
              "flex flex-col items-center bg-transparent text-primary shadow-none p-2.5 rounded-lg transition-all duration-200 relative",
          }}
          inactiveProps={{
            className:
              "flex flex-col items-center text-muted-foreground hover:bg-primary/10 hover:text-foreground p-2.5 rounded-lg transition-all duration-200 relative",
          }}
        >
          <item.icon className="h-5 w-5 mb-0.5" />
          {item.href === "/message" && unread > 0 && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
          <span className="text-xs mt-0.5 font-medium">
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
