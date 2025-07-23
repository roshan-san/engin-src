import { useMutation, useQuery } from "convex/react";
import { useRef, useEffect, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { MessageCircle } from "lucide-react";
import { api } from "@/../convex/_generated/api";
import { useUser } from "@/features/authentication/UserContext";

interface ChatWindowProps {
  username: string;
}

export function ChatWindow({ username }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { profile: myProfile } = useUser();
  
  // Queries
  const chatPartner = useQuery(api.profile.queries.getProfileByUsername, { username });
  const messages = useQuery(api.messages.queries.getMessages, { 
    otherUserId: chatPartner?._id 
  });
  const chatPartnerOnlineStatus = useQuery(api.messages.queries.getOnlineStatus, {
    userId: chatPartner?._id || "placeholder" as any
  });
  
  // Mutations
  const sendMessage = useMutation(api.messages.mutations.sendMessage);
  const markMessagesAsRead = useMutation(api.messages.mutations.markMessagesAsRead);

  // Mark messages as read when they are loaded
  useEffect(() => {
    if (chatPartner?._id && messages && messages.length > 0) {
      const hasUnreadMessages = messages.some(
        (msg) => !msg.read && msg.senderId === chatPartner._id
      );
      if (hasUnreadMessages) {
        markMessagesAsRead({ senderId: chatPartner._id });
      }
    }
  }, [chatPartner?._id, messages, markMessagesAsRead]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "" || !chatPartner) return;
    try {
      await sendMessage({
        receiverId: chatPartner._id,
        content: message.trim(),
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatLastSeen = (lastSeen: number) => {
    const now = Date.now();
    const diff = now - lastSeen;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const formatMessageTime = (timestamp: number) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const isToday = now.toDateString() === messageDate.toDateString();
    if (isToday) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Loading state
  if (!myProfile) {
    return (
      <div className="flex flex-1 flex-col h-full min-h-0 bg-background">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4 mx-auto border border-border/30">
              <MessageCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium mb-2 text-foreground">Loading conversation...</p>
            <p className="text-sm text-muted-foreground">Please wait while we connect you</p>
          </div>
        </div>
      </div>
    );
  }

  // User not found state
  if (!chatPartner) {
    return (
      <div className="flex flex-1 flex-col h-full min-h-0 bg-background">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4 mx-auto border border-border/30">
              <MessageCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium mb-2 text-foreground">User not found</p>
            <p className="text-sm text-muted-foreground">
              The user "{username}" could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col h-full min-h-0 bg-background">
      <ChatHeader
        chatPartner={chatPartner}
        onlineStatus={chatPartnerOnlineStatus}
        formatLastSeen={formatLastSeen}
      />
      <div className="flex-1 min-h-0 p-6 overflow-y-auto bg-gradient-to-b from-background to-muted/10" style={{scrollbarGutter: 'stable'}}>
        {Array.isArray(messages) && messages.length > 0 ? (
          <MessageList
            messages={messages}
            myProfile={myProfile}
            receiverProfile={chatPartner}
            formatMessageTime={formatMessageTime}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4 border border-border/30">
              <MessageCircle className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium mb-2 text-foreground">No messages yet</p>
            <p className="text-sm text-center">
              Start a conversation with {chatPartner.name || chatPartner.username || "this user"}
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-6 pt-4 border-t border-border/50 bg-background">
        <MessageInput
          message={message}
          setMessage={setMessage}
          onSend={handleSendMessage}
          disabled={!chatPartner || !myProfile}
        />
      </div>
    </div>
  );
} 