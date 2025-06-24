import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaperclipIcon, SendIcon } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useState, useRef, useEffect } from "react";
import { useConvexAuth } from "convex/react";

export function ChatWindow({ username }: { username: string }) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useConvexAuth();

  const myProfile = useQuery(
    api.profile.queries.getMyProfile,
    isAuthenticated ? undefined : "skip",
  );

  const chatPartner = useQuery(api.messages.queries.getProfileByUsername, {
    username,
  });

  const messages = useQuery(api.messages.queries.getMessages, {
    otherUserId: chatPartner?._id,
  });

  const sendMessage = useMutation(api.messages.mutations.sendMessage);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "" || !chatPartner) return;
    try {
      await sendMessage({
        receiverId: chatPartner._id,
        content: message,
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col h-full min-h-0 bg-background">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 flex items-center gap-4 p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Avatar className="w-12 h-12">
          <AvatarImage src={chatPartner?.avatar_url || undefined} alt={chatPartner?.name || "?"} />
          <AvatarFallback>{chatPartner?.name?.charAt(0) || "?"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold leading-tight">{chatPartner?.name || "Unknown User"}</h2>
          <span className="text-xs text-muted-foreground">@{username}</span>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 min-h-0 p-4 sm:p-6 overflow-y-auto bg-background" style={{scrollbarGutter: 'stable'}}>
        <div className="flex flex-col gap-4">
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((msg) => {
              const isMe = msg.sender?._id === myProfile?._id;
              return (
                <div
                  key={msg._id}
                  className={`flex items-end gap-2 ${isMe ? "justify-end" : ""}`}
                >
                  {!isMe && (
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarImage
                        src={chatPartner?.avatar_url || undefined}
                        alt={msg.sender?.name || "?"}
                      />
                      <AvatarFallback>{msg.sender?.name?.charAt(0) || "?"}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2 max-w-xs lg:max-w-md shadow-sm text-sm flex flex-col ${
                      isMe
                        ? "bg-primary text-primary-foreground items-end ml-auto"
                        : "bg-muted text-foreground items-start"
                    }`}
                  >
                    <p className="break-words whitespace-pre-line">{msg.content}</p>
                    <span className="block mt-1 text-[10px] text-muted-foreground text-right">
                      {new Date(msg._creationTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {isMe && (
                    <Avatar className="w-8 h-8 shrink-0 ml-2">
                      <AvatarImage
                        src={myProfile?.avatar_url}
                        alt={myProfile?.name || "?"}
                      />
                      <AvatarFallback>{myProfile?.name?.charAt(0) || "?"}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-400">No messages yet.</div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Input */}
      <div className="p-6 pt-4 border-t bg-background">
        <form onSubmit={handleSendMessage} className="relative flex gap-2 items-center">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="pr-20 rounded-full bg-muted/60 border-none focus:ring-2 focus:ring-primary"
            disabled={!chatPartner}
          />
          <Button variant="ghost" size="icon" type="button" className="rounded-full">
            <PaperclipIcon className="w-5 h-5" />
          </Button>
          <Button variant="default" size="icon" type="submit" disabled={!chatPartner} className="rounded-full">
            <SendIcon className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
} 