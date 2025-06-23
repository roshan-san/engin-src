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
    <div className="flex flex-1 flex-col h-full min-h-0">
      <div className="flex items-center p-4 border-b min-h-[64px]">
        <Avatar className="w-10 h-10 mr-4">
          <AvatarImage src={chatPartner?.avatar_url || undefined} alt={chatPartner?.name || "?"} />
          <AvatarFallback>{chatPartner?.name?.charAt(0) || "?"}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{chatPartner?.name || "Unknown User"}</h2>
        <p className="ml-2 text-sm text-gray-500">(Chat ID: {username})</p>
      </div>
      <div className="flex-1 min-h-0 p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex items-end gap-2 ${
                  msg.sender?._id === myProfile?._id ? "justify-end" : ""
                }`}
              >
                {msg.sender?._id !== myProfile?._id && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={chatPartner?.avatar_url || undefined}
                      alt={chatPartner?.name || "?"}
                    />
                    <AvatarFallback>{chatPartner?.name?.charAt(0) || "?"}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg p-3 max-w-xs lg:max-w-md ${
                    msg.sender?._id === myProfile?._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No messages yet.</div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="relative">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="pr-20"
            disabled={!chatPartner}
          />
          <div className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center">
            <Button variant="ghost" size="icon" type="button">
              <PaperclipIcon className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" type="submit" disabled={!chatPartner}>
              <SendIcon className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 