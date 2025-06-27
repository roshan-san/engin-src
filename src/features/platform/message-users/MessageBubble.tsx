import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, CheckCheck } from "lucide-react";

export function MessageBubble({ msg, isMe, myProfile, receiverProfile, formatMessageTime }: {
  msg: any,
  isMe: boolean,
  myProfile: any,
  receiverProfile: any,
  formatMessageTime: (n: number) => string
}) {
  return (
    <div className={`flex items-end gap-3 ${isMe ? "justify-end" : "justify-start"}`}>
      {!isMe && (
        <Avatar className="w-8 h-8 shrink-0 ring-1 ring-border">
          <AvatarImage
            src={receiverProfile?.avatar_url || undefined}
            alt={receiverProfile?.name || receiverProfile?.username || "?"}
          />
          <AvatarFallback className="text-xs bg-primary/10 text-primary">
            {receiverProfile?.name?.charAt(0) || receiverProfile?.username?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={`rounded-2xl px-4 py-2 max-w-xs lg:max-w-md shadow-sm text-sm flex flex-col ${
          isMe
            ? "bg-primary text-primary-foreground items-end ml-auto"
            : "bg-muted text-foreground items-start"
        }`}
      >
        <p className="break-words whitespace-pre-line leading-relaxed">{msg.content}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[10px] opacity-70">
            {formatMessageTime(msg._creationTime)}
          </span>
          {isMe && (
            <div className="flex items-center">
              {msg.read ? (
                <CheckCheck className="w-3 h-3 text-blue-300" />
              ) : (
                <Check className="w-3 h-3 opacity-50" />
              )}
            </div>
          )}
        </div>
        {!isMe && (
          <span className="text-xs text-muted-foreground mt-1">{receiverProfile?.name || receiverProfile?.username}</span>
        )}
      </div>
      {isMe && (
        <Avatar className="w-8 h-8 shrink-0 ring-1 ring-border">
          <AvatarImage
            src={myProfile?.avatar_url}
            alt={myProfile?.name || myProfile?.username || "?"}
          />
          <AvatarFallback className="text-xs bg-primary/10 text-primary">
            {myProfile?.name?.charAt(0) || myProfile?.username?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
} 