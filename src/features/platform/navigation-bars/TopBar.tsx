import { Link } from "@tanstack/react-router";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ModeToggle";
import { useUser } from "@/features/authentication/UserContext";
import SignOutButton from "./SignOut";

export function TopBar() {
  const { profile } = useUser();
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-background border-b">
      {/* Logo/Title */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-primary tracking-wider uppercase select-none">ENGIN</span>
      </div>
      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-6">
        <Link to="/home" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors">Home</Link>
        <Link to="/startups" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors">Startups</Link>
        <Link to="/connect" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors">Connect</Link>
        <Link to="/message" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors">Messages</Link>
      </nav>
      {/* Right Side: Profile, Sign Out, ModeToggle */}
      <div className="flex items-center gap-4">
        {profile.username && (
          <Link to="/profile/$username" params={{ username: profile.username }}>
            <Avatar className="h-9 w-9 border border-primary/30">
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback>{profile.name?.charAt(0) ?? "?"}</AvatarFallback>
            </Avatar>
          </Link>
        )}
        <SignOutButton />
        <ModeToggle />
      </div>
    </header>
  );
} 