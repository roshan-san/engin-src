import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <div className="flex items-center justify-between p-4 border-b bg-background">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="w-12 h-12">
            <AvatarImage src={chatPartner?.avatar_url} alt={chatPartner?.name || chatPartner?.username} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {chatPartner?.name?.charAt(0) || chatPartner?.username?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
            onlineStatus?.isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`} />
        </div>
        
        <div className="flex flex-col">
          <h2 className="font-semibold text-lg">
            {chatPartner?.name || chatPartner?.username || "Unknown User"}
          </h2>
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