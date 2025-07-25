import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Doc } from "@/../convex/_generated/dataModel";

export function ChatHeader({ chatPartner, onlineStatus, formatLastSeen }: {
  chatPartner: Doc<"profiles">,
  onlineStatus: { isOnline: boolean; lastSeen: number } | null,
  formatLastSeen: (n: number) => string
}) {
  if (!chatPartner) {
    return (
      <div className="flex items-center justify-center w-full p-4 text-destructive">
        <span>User not found.</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 border-b border-border/50 bg-background">
      <div className="flex items-center gap-2">
        {/* Back button for mobile/tablet */}
        <Link 
          to="/message" 
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 transition-colors mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        
        <div className="relative">
          <Avatar className="w-8 h-8 md:w-10 md:h-10">
            <AvatarImage src={chatPartner?.avatar_url} alt={chatPartner?.name || chatPartner?.username} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
              {chatPartner?.name?.charAt(0) || chatPartner?.username?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
          <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 border-background ${
            onlineStatus?.isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`} />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h2 className="font-semibold text-sm md:text-base">
              {chatPartner?.name || chatPartner?.username || "Unknown User"}
            </h2>
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">
            {onlineStatus?.isOnline ? (
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                Online
              </span>
            ) : (
              `Last seen ${formatLastSeen(onlineStatus?.lastSeen || Date.now())}`
            )}
          </span>
        </div>
      </div>
    </div>
  );
} 