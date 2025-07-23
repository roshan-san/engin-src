import { Link, useRouterState } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { MessageCircle, Search, Users } from "lucide-react";
import { useUser } from "@/features/authentication/UserContext";
import { useState } from "react";

export function ChatList() {
  const chatSummaries = useQuery(api.messages.queries.getChatSummaries);
  const { profile: myProfile } = useUser();
  const [search, setSearch] = useState("");
  const routerState = useRouterState();
  const activeUsername = routerState.location.pathname.startsWith("/message/")
    ? routerState.location.pathname.split("/message/")[1]
    : null;

  const filteredSummaries = chatSummaries?.filter(
    (summary) =>
      summary &&
      (summary.profile.name?.toLowerCase().includes(search.toLowerCase()) ||
        summary.profile.username?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-background">
        <h2 className="font-bold text-lg mb-1">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-muted/50 border-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredSummaries && filteredSummaries.length > 0 ? (
          <div className="p-2 space-y-1">
            {filteredSummaries.filter(Boolean).map((summary) => (
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
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Users className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium mb-2">No conversations</p>
            <p className="text-sm text-center">Connect with people to start messaging</p>
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
      <div className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-accent/50 ${
        active ? 'bg-accent border border-primary' : hasUnread ? 'bg-primary/5' : ''
      }`}>
        <div className="relative">
          <Avatar className="w-12 h-12">
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {profile?.name?.[0] || "?"}
            </AvatarFallback>
          </Avatar>
          {hasUnread && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
              !
            </span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className={`font-semibold truncate ${hasUnread ? 'font-bold' : ''}`}>
              {profile?.name || "Unknown User"}
            </span>
            {lastMessage && (
              <span className="text-xs text-muted-foreground ml-2">
                {formatTime(lastMessage._creationTime)}
              </span>
            )}
          </div>
          
          <div className={`text-xs truncate mt-1 ${hasUnread ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
            {lastMessage ? (
              <>
                {isLastFromMe && <span className="opacity-70">You: </span>}
                {lastMessage.content.length > 30 ? lastMessage.content.slice(0, 30) + '…' : lastMessage.content}
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