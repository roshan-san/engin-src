import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, CheckCheck } from "lucide-react";

export function MessageBubble({ msg, isMe, myProfile, receiverProfile, formatMessageTime }: {
  msg: any,
  isMe: boolean,
  myProfile: any,
  receiverProfile: any,
  formatMessageTime: (n: number) => string
}) {
  const isValidAvatarUrl = (url: string | null | undefined) => {
    return url && url.trim() !== '' && url !== 'null' && url !== 'undefined';
  };

  return (
    <div className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
      {!isMe && (
        <Avatar className="w-6 h-6 lg:w-8 lg:h-8 shrink-0">
          {isValidAvatarUrl(receiverProfile?.avatar_url) ? (
            <AvatarImage
              src={receiverProfile.avatar_url}
              alt={receiverProfile?.name || receiverProfile?.username || "?"}
            />
          ) : null}
          <AvatarFallback className="text-xs lg:text-sm bg-primary/10 text-primary font-semibold">
            {receiverProfile?.name?.charAt(0) || receiverProfile?.username?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={`max-w-[200px] lg:max-w-[250px] px-3 py-2 rounded-2xl shadow-sm ${
          isMe
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground border border-border/30"
        }`}
      >
        <p className="text-sm break-words whitespace-pre-line leading-relaxed">
          {msg.content}
        </p>
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
      </div>
      
      {isMe && (
        <Avatar className="w-6 h-6 lg:w-8 lg:h-8 shrink-0">
          {isValidAvatarUrl(myProfile?.avatar_url) ? (
            <AvatarImage
              src={myProfile.avatar_url}
              alt={myProfile?.name || myProfile?.username || "?"}
            />
          ) : null}
          <AvatarFallback className="text-xs lg:text-sm bg-primary/10 text-primary font-semibold">
            {myProfile?.name?.charAt(0) || myProfile?.username?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
} 