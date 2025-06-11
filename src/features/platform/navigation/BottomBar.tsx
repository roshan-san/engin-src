import { Laptop, Search, Users, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserAvatar } from "../UserAvatar";
import { Link, useRouter } from "@tanstack/react-router";

const navigationItems = [
  { href: "/dashboard", icon: Laptop, },
  { href: "/startups", icon: Search, },
  { href: "/connect", icon: Users, },
  { href: "/message", icon: MessageCircle,},
];

export function BottomBar() {
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t">
      <div className="flex justify-around items-center h-full p-2">
        {navigationItems.map(({ href, icon: Icon }) => (
          <Link 
            key={href}
            to={href} 
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200",
              currentPath === href
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
          </Link>
        ))}
        <Link 
          to="/profile"
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200",
            currentPath === "/profile"
              ? "bg-primary text-primary-foreground shadow-sm" 
              : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
          )}
        >
          <UserAvatar />
        </Link>
      </div>
    </div>
  );
} 