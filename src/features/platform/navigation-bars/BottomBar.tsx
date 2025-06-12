import { Laptop, Search, Users, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useProfile } from "@/features/authentication/store/authStore";
import { UserAvatar } from "./UserAvatar";

const navigationItems = [
  { href: "/dashboard", icon: Laptop, },
  { href: "/startups", icon: Search, },
  { href: "/connect", icon: Users, },
  { href: "/message", icon: MessageCircle,},
];

export function BottomBar() {
  const { data: profile } = useProfile();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t">
      <div className="flex justify-around items-center h-full p-2">
        {navigationItems.map(({ href, icon: Icon }) => (
          <Link 
            key={href}
            to={href}
            activeProps={{
              className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-all duration-200"
            }}
            inactiveProps={{
              className: "flex h-12 w-12 items-center justify-center rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-foreground transition-all duration-200"
            }}
          >
            <Icon className="h-5 w-5" />
          </Link>
        ))}
        {profile ? (
                <Link
                  to={"/profile/$username"}
                  params={{ username: profile.username }}
                >
                  <UserAvatar url={profile.avatar_url}  />
                </Link>
              ) : (
                <div className="p-2.5">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              )}
      </div>
    </div>
  );
} 