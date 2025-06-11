'use client';
import { Laptop, Search, Users, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserAvatar } from "./UserAvatar";
import SignOutButton from "./SignOut";

const mainNavigationItems = [
  { href: "/dashboard", icon: Laptop, label: "Dashboard" },
  { href: "/startups", icon: Search, label: "Discover" },
  { href: "/connect", icon: Users, label: "Connect" },
  { href: "/message", icon: MessageCircle, label: "Messages" },
];

export function LeftBar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col items-center ">
      <div className="flex flex-col items-center gap-6 flex-grow py-8">
        {mainNavigationItems.map((item) => (
          <TooltipProvider key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200",
                    pathname.startsWith(item.href)
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    
      <div className="flex flex-col items-center gap-4 pb-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/profile"
              >
                <UserAvatar />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SignOutButton/>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Sign out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
