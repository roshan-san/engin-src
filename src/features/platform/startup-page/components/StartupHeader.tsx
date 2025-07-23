import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Doc } from "@/../convex/_generated/dataModel";
import { StartupEditDrawer } from "../StartupEditDrawer";

interface StartupHeaderProps {
  startup: Doc<"startups">;
  isOwner: boolean;
}

export function StartupHeader({ startup, isOwner }: StartupHeaderProps) {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex items-center gap-4">
          <Link 
            to="/startups" 
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">
                {startup.name.charAt(0).toUpperCase()}
              </span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {startup.name}
              </h1>
              <p className="text-muted-foreground text-sm md:text-base mt-1">
                {startup.description}
              </p>
            </div>
            
            {isOwner && (
              <StartupEditDrawer startup={startup} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 