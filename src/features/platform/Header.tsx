import { ModeToggle } from "@/components/ModeToggle";
import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      {/* Logo/Title */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-primary tracking-wider uppercase">ENGIN</span>
      </div>
      {/* Navigation Links */}
      <nav className="flex items-center gap-8">
        <Link to="/dashboard" className="text-base font-medium text-gray-700 hover:text-primary transition-colors">Home</Link>
        <Link to="/startups" className="text-base font-medium text-gray-700 hover:text-primary transition-colors">Explore Startups</Link>
        <Link to="/message" className="text-base font-medium text-gray-700 hover:text-primary transition-colors">Messages</Link>
        <Link to="/connect" className="text-base font-medium text-gray-700 hover:text-primary transition-colors">Connections</Link>
      </nav>
      {/* Right Side: Notification, Profile, ModeToggle */}
      <div className="flex items-center gap-4">
        {/* Notification Bell (placeholder icon) */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <span role="img" aria-label="Notifications">🔔</span>
          {/* Notification dot */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full border-2 border-white"></span>
        </button>
        {/* Profile Icon (placeholder icon) */}
        <button className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors">
          <span role="img" aria-label="Profile">👤</span>
        </button>
        <ModeToggle />
      </div>
    </header>
  );
}
