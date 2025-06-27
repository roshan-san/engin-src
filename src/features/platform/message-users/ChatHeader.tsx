import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

export function ChatHeader({ chatPartner, onlineStatus, formatLastSeen }: {
  chatPartner: any,
  onlineStatus: any,
  formatLastSeen: (n: number) => string
}) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <div className="relative">    
          <Avatar className="w-12 h-12 ring-2 ring-primary/10">
            <AvatarImage src={chatPartner?.avatar_url || undefined} alt={chatPartner?.name || chatPartner?.username || "?"} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {chatPartner?.name?.charAt(0) || chatPartner?.username?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-3 border-background shadow-sm ${
            onlineStatus?.isOnline 
              ? 'bg-green-500 animate-pulse' 
              : 'bg-gray-400'
          }`} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold leading-tight text-foreground">
            {chatPartner?.name || chatPartner?.username || "Unknown User"}
          </h2>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            {onlineStatus?.isOnline ? (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Online
              </>
            ) : (
              `Last seen ${formatLastSeen(onlineStatus?.lastSeen || Date.now())}`
            )}
          </span>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>
  );
} 