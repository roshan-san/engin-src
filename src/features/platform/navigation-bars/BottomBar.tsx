import { Laptop, Search, Users, MessageCircle, type LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/features/authentication/UserContext";

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

function NavigationLink({ href, icon: Icon }: NavigationItem) {
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
      <Icon className="h-5 w-5" />
    </Link>
  );
}

export function BottomBar() {
  const { profile } = useUser();

  return (
    <nav className="flex justify-evenly items-center w-full h-full">
      {navigationItems.map((item) => (
        <NavigationLink key={item.href} {...item} />
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
