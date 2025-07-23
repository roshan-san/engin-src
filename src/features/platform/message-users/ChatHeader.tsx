import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";

export function ChatHeader({ chatPartner, onlineStatus, formatLastSeen }: {
  chatPartner: any,
  onlineStatus: any,
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
    <div className="flex items-center justify-between p-6 border-b border-border/50 bg-background">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="w-10 h-10">
            <AvatarImage src={chatPartner?.avatar_url} alt={chatPartner?.name || chatPartner?.username} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {chatPartner?.name?.charAt(0) || chatPartner?.username?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${
            onlineStatus?.isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`} />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-lg">
              {chatPartner?.name || chatPartner?.username || "Unknown User"}
            </h2>
            <CheckCircle className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm text-muted-foreground">
            {onlineStatus?.isOnline ? (
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
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