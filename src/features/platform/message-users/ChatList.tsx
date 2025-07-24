import { Link, useRouterState } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Users, MessageCircle } from "lucide-react";
import { useUser } from "@/features/authentication/UserContext";

export function ChatList() {
  const chatSummaries = useQuery(api.messages.queries.getChatSummaries);
  const { profile: myProfile } = useUser();
  const routerState = useRouterState();
  const activeUsername = routerState.location.pathname.startsWith("/message/")
    ? routerState.location.pathname.split("/message/")[1]
    : null;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header for mobile */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border/50 bg-background">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Conversations</h2>
            <p className="text-sm text-muted-foreground">
              {chatSummaries?.length || 0} chats
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        {chatSummaries && chatSummaries.length > 0 ? (
          <div className="px-2">
            {chatSummaries.filter(Boolean).map((summary) => (
              <ChatListItem
                key={summary.profile._id}
                summary={summary}
                myId={myProfile?._id}
                active={activeUsername === summary.profile.username}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <p className="font-semibold mb-1 text-foreground">No conversations</p>
            <p className="text-sm text-center opacity-60">Connect with people to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatListItem({ summary, myId, active }: { 
  summary: any, 
  myId: string, 
  active: boolean 
}) {
  const { profile, lastMessage, hasUnread } = summary;
  const isLastFromMe = lastMessage && lastMessage.senderId === myId;

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
      <div className={`flex items-center gap-3 px-4 py-4 transition-all duration-200 cursor-pointer ${
        active 
          ? 'bg-primary/10 border-l-4 border-l-primary' 
          : hasUnread 
            ? 'bg-primary/5 hover:bg-primary/10' 
            : 'hover:bg-muted/30'
      }`}>
        <div className="relative">
          <Avatar className="w-12 h-12 lg:w-11 lg:h-11">
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback className="bg-primary/20 text-primary font-semibold">
              {profile?.name?.[0] || "?"}
            </AvatarFallback>
          </Avatar>
          {hasUnread && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 lg:w-4 lg:h-4 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
              !
            </span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className={`font-semibold truncate text-base lg:text-sm ${hasUnread ? 'text-primary' : 'text-foreground'}`}>
              {profile?.name || "Unknown User"}
            </span>
            {lastMessage && (
              <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                {formatTime(lastMessage._creationTime)}
              </span>
            )}
          </div>
          
          <div className={`text-sm lg:text-xs truncate mt-1 ${hasUnread ? 'font-medium text-primary' : 'text-muted-foreground'}`}>
            {lastMessage ? (
              <>
                {isLastFromMe && <span className="opacity-70">You: </span>}
                {lastMessage.content.length > 30 ? lastMessage.content.slice(0, 30) + '…' : lastMessage.content}
              </>
            ) : (
              <span className="italic opacity-60">No messages yet</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 