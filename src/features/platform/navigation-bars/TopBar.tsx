import { Link } from "@tanstack/react-router";
import { useUser } from "@/features/authentication/UserContext";
import ProfileDropdown from "./ProfileDropdown";
import { TrendingUp, Laptop, Search, Users, MessageCircle } from "lucide-react";

export function TopBar() {
  const { profile } = useUser();
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-background border-b">
      {/* Logo/Title */}
      <div className="text-2xl font-bold text-primary tracking-wider uppercase select-none">ENGIN</div>
      {/* Navigation Links: only on md+ */}
      <nav className="hidden md:flex items-center gap-6">
        <Link to="/home" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <Laptop className="h-5 w-5 mr-1" /> Home
        </Link>
        <Link to="/trending" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <TrendingUp className="h-5 w-5 mr-1" /> Trending
        </Link>
        <Link to="/startups" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <Search className="h-5 w-5 mr-1" /> Explore Startups
        </Link>
        <Link to="/connect" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <Users className="h-5 w-5 mr-1" /> Network
        </Link>
        <Link to="/message" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <MessageCircle className="h-5 w-5 mr-1" /> Messages
        </Link>
      </nav>
      {/* Right Side: Profile */}
      <div className="flex items-center gap-4">
        {profile.username && <ProfileDropdown profile={profile} />}
      </div>
    </header>
  );
} 