import { MessageBubble } from "./MessageBubble";

export function MessageList({ messages, myProfile, receiverProfile, formatMessageTime }: {
  messages: any[],
  myProfile: any,
  receiverProfile: any,
  formatMessageTime: (n: number) => string
}) {
  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      {messages.map((msg, index) => {
        const isMe = msg.senderId === myProfile?._id;
        const showDate = index === 0 ||
          new Date(msg._creationTime).toDateString() !==
          new Date(messages[index - 1]._creationTime).toDateString();
        return (
          <div key={msg._id}>
            {showDate && (
              <div className="flex justify-center my-4">
                <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  {new Date(msg._creationTime).toLocaleDateString([], {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            )}
            <MessageBubble
              msg={msg}
              isMe={isMe}
              myProfile={myProfile}
              receiverProfile={receiverProfile}
              formatMessageTime={formatMessageTime}
            />
          </div>
        );
      })}
    </div>
  );
} 