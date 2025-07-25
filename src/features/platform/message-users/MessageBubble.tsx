import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Doc } from "@/../convex/_generated/dataModel";

interface MessageBubbleProps {
  message: Doc<"messages">;
  isOwnMessage: boolean;
  senderProfile: Doc<"profiles"> | null;
}

export function MessageBubble({ message, isOwnMessage, senderProfile }: MessageBubbleProps) {
  return (
    <div className={cn(
      "flex gap-2 mb-4",
      isOwnMessage ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={senderProfile?.avatar_url} />
        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
          {senderProfile?.name?.charAt(0) || senderProfile?.username?.charAt(0) || "?"}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "max-w-[70%] px-3 py-2 rounded-lg",
        isOwnMessage 
          ? "bg-primary text-primary-foreground ml-auto" 
          : "bg-muted text-foreground"
      )}>
        <p className="text-sm break-words">{message.content}</p>
        <span className={cn(
          "text-xs mt-1 block",
          isOwnMessage ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {new Date(message._creationTime).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
} 