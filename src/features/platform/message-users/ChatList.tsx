import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, MessageCircle } from "lucide-react";
import type { Doc } from "@/../convex/_generated/dataModel";

interface ChatListProps {
  onChatSelect: (chatPartner: Doc<"profiles">) => void;
}

export function ChatList({ onChatSelect }: ChatListProps) {
  const chatSummaries = useQuery(api.messages.queries.getChatSummaries);

  if (!chatSummaries || chatSummaries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <MessageCircle className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
        <p className="text-muted-foreground text-sm">
          Start a conversation by connecting with other users
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border/50">
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chatSummaries.map((summary) => {
          const chatPartner = summary.profile;
          if (!chatPartner) return null;
          
          return (
            <div
              key={chatPartner._id}
              onClick={() => onChatSelect(chatPartner)}
              className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer transition-colors border-b border-border/30"
            >
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={chatPartner.avatar_url} alt={chatPartner.name || chatPartner.username} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {chatPartner.name?.charAt(0) || chatPartner.username?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${
                  summary.hasUnread ? 'bg-red-500' : 'bg-gray-400'
                }`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm truncate">
                    {chatPartner.name || chatPartner.username || "Unknown User"}
                  </h3>
                  <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {summary.lastMessage?.content || "No messages yet"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 