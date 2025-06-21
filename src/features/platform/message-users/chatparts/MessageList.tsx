import { Avatar ,AvatarFallback, AvatarImage }  from "@/components/ui/avatar";
import { api } from "@/../convex/_generated/api";
import { useQuery } from "convex/react";
import { useEffect, useRef } from "react";
import type { Doc } from "@/../convex/_generated/dataModel";

export function MessageList({myProfile, chatPartner,}:{ myProfile: Doc<"profiles">;chatPartner: Doc<"profiles">;}) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messages = useQuery(api.messages.queries.getMessages, {
      otherUserId: chatPartner?._id,
    });

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {messages?.map((msg) => {
            const isMyMessage = msg.sender?._id === myProfile?._id;
            return(
              <div
              key={msg._id}
              className={`flex items-end gap-2 ${isMyMessage ? "justify-end" : ""}`}
            >
              {!isMyMessage && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={chatPartner.avatar_url!} alt={chatPartner.name!} />
                  <AvatarFallback>{chatPartner.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 max-w-xs lg:max-w-md ${
                  isMyMessage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <p>{msg.content}</p>
              </div>
            </div>
          )})}
          <div ref={messagesEndRef} />
        </div>
      </div>
    );
  }
  