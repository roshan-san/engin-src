import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { MessageCircle, Users } from "lucide-react";
import { useUser } from "@/features/authentication/UserContext";

export function ChatList() {
  const chatSummaries = useQuery(api.messages.queries.getChatSummaries);
  const { profile: myProfile } = useUser();

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Messages</h2>
            <p className="text-xs text-muted-foreground">
              {chatSummaries?.length || 0} conversation{chatSummaries?.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chatSummaries && chatSummaries.length > 0 ? (
          <div className="p-2">
            {chatSummaries.filter((summary) => summary !== null).map((summary) => (
              <ChatListItem key={summary.profile._id} summary={summary} myId={myProfile?._id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Users className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium mb-2">No conversations yet</p>
            <p className="text-sm text-center">Connect with people to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatListItem({ summary, myId }: { summary: any, myId: string }) {
  const { profile, lastMessage, hasUnread } = summary;
  const isLastFromMe = lastMessage && lastMessage.senderId === myId;

  // Format time
  const formatTime = (timestamp: number) => {
    const now = new Date();
    const date = new Date(timestamp);
    if (now.toDateString() === date.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <Link to="/message/$username" params={{ username: profile?.username! }}>
      <div className={`flex items-center gap-3 p-3 rounded-lg group mx-1 transition-all duration-200 cursor-pointer hover:bg-accent/50 ${hasUnread ? 'bg-primary/5' : ''}`}>
        <div className="relative">
          <Avatar className="w-12 h-12 ring-2 ring-primary/10 group-hover:ring-primary/20 transition-all duration-200">
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {profile?.name?.[0] || "?"}
            </AvatarFallback>
          </Avatar>
          {/* Unread dot */}
          {hasUnread && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-background" />
          )}
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className={`font-semibold truncate group-hover:text-primary transition-colors duration-200 ${hasUnread ? 'font-bold' : ''}`}>{profile?.name || "Unknown User"}</span>
            {lastMessage && (
              <span className="text-xs text-muted-foreground ml-2">
                {formatTime(lastMessage._creationTime)}
              </span>
            )}
          </div>
          <div className={`flex items-center gap-2 mt-1 text-xs truncate ${hasUnread ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
            {lastMessage ? (
              <>
                <span>
                  {isLastFromMe ? <span className="opacity-70">You: </span> : null}
                  {lastMessage.content.length > 40 ? lastMessage.content.slice(0, 40) + '…' : lastMessage.content}
                </span>
              </>
            ) : (
              <span className="italic">No messages yet</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 