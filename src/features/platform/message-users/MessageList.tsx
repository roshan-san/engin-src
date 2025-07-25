import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { MessageBubble } from "./MessageBubble";
import { useUser } from "@/features/authentication/useUser";
import type { Doc } from "@/../convex/_generated/dataModel";

interface MessageListProps {
  receiverId: Doc<"profiles"> | null;
}

export function MessageList({ receiverId }: MessageListProps) {
  const { profile } = useUser();
  const messages = useQuery(api.messages.queries.getMessages, { 
    otherUserId: receiverId?._id 
  });

  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <p className="text-sm">No messages yet</p>
        <p className="text-xs">Start a conversation!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isOwnMessage = message.senderId === profile?._id;
        const senderProfile = isOwnMessage ? profile : receiverId;
        
        return (
          <MessageBubble
            key={message._id}
            message={message}
            isOwnMessage={isOwnMessage}
            senderProfile={senderProfile}
          />
        );
      })}
    </div>
  );
} 