import { Link } from "@tanstack/react-router";
import { useUser } from "@/features/authentication/UserContext";
import ProfileDropdown from "./ProfileDropdown";
import { Search, Users, MessageCircle, Home } from "lucide-react";
import NotificationsDrawer from "../make-connections/NotificationDrawer";
import { ModeToggle } from "@/components/ModeToggle";

export function TopBar() {
  const { profile } = useUser();
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-background border-b">
      {/* Logo/Title */}
      <div className="text-2xl font-bold text-primary tracking-wider uppercase select-none">ENGIN</div>
      {/* Navigation Links: only on md+ */}
      <nav className="hidden md:flex items-center gap-6">
        <Link 
          to="/home" 
          activeProps={{
            className: "text-base font-medium text-primary transition-colors flex items-center gap-1"
          }}
          inactiveProps={{
            className: "text-base font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          }}
        >
          <Home className="h-5 w-5 mr-1" /> Home
        </Link>
        <Link 
          to="/startups" 
          activeProps={{
            className: "text-base font-medium text-primary transition-colors flex items-center gap-1"
          }}
          inactiveProps={{
            className: "text-base font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          }}
        >
          <Search className="h-5 w-5 mr-1" /> Explore
        </Link>
        <Link 
          to="/message" 
          activeProps={{
            className: "text-base font-medium text-primary transition-colors flex items-center gap-1"
          }}
          inactiveProps={{
            className: "text-base font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          }}
        >
          <MessageCircle className="h-5 w-5 mr-1" /> Messages
        </Link>
        <Link 
          to="/network" 
          activeProps={{
            className: "text-base font-medium text-primary transition-colors flex items-center gap-1"
          }}
          inactiveProps={{
            className: "text-base font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          }}
        >
          <Users className="h-5 w-5 mr-1" /> Network
        </Link>
        
      </nav>
      {/* Right Side: Profile */}
      <div className="flex items-center gap-4">
        <NotificationsDrawer />
        <ModeToggle/>
        {profile.username && <ProfileDropdown profile={profile} />}
      </div>
    </header>
  );
} 