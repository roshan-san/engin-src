import { ArrowLeft, Edit } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Doc } from "@/../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { StartupEditDialog } from "../StartupEditDialog";

interface StartupHeaderProps {
  startup: Doc<"startups">;
  isOwner: boolean;
}

export function StartupHeader({ startup, isOwner }: StartupHeaderProps) {
  return (
    <div className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link 
            to="/startups" 
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted/80 hover:bg-muted transition-all duration-200 hover:scale-105 shadow-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
              <span className="text-white font-bold text-lg sm:text-xl">
                {startup.name.charAt(0).toUpperCase()}
              </span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground truncate">
                {startup.name}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base mt-1 line-clamp-2 sm:line-clamp-1">
                {startup.description}
              </p>
            </div>
          </div>
          
          {isOwner && (
            <div className="flex-shrink-0">
              <StartupEditDialog 
                startup={startup}
                renderTrigger={({ setOpen }: { setOpen: (open: boolean) => void }) => (
                  <Button 
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 hover:scale-105 shadow-sm"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit Startup</span>
                  </Button>
                )}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 