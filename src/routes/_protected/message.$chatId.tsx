import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaperclipIcon, SendIcon } from "lucide-react";

export const Route = createFileRoute("/_protected/message/$chatId")({
  component: ChatComponent,
});

function ChatComponent() {
  const { chatId } = Route.useParams();

  // Mock data - in a real app, you'd fetch this based on chatId
  const chatPartner = {
    name: "Alice",
    avatarUrl: "https://github.com/shadcn.png",
  };
  const messages = [
    { sender: "them", text: "Hey! How's it going?" },
    { sender: "me", text: "Pretty good, thanks! Just working on this chat UI." },
    { sender: "them", text: "Nice! Looks great so far." },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <Avatar className="w-10 h-10 mr-4">
          <AvatarImage src={chatPartner.avatarUrl} alt={chatPartner.name} />
          <AvatarFallback>{chatPartner.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{chatPartner.name}</h2>
        <p className="ml-2 text-sm text-gray-500">(Chat ID: {chatId})</p>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                msg.sender === "me" ? "justify-end" : ""
              }`}
            >
              {msg.sender === "them" && (
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={chatPartner.avatarUrl}
                    alt={chatPartner.name}
                  />
                  <AvatarFallback>{chatPartner.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 max-w-xs lg:max-w-md ${
                  msg.sender === "me"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t">
        <div className="relative">
          <Input
            placeholder="Type a message..."
            className="pr-20"
          />
          <div className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center">
             <Button variant="ghost" size="icon">
                <PaperclipIcon className="w-5 h-5" />
             </Button>
             <Button variant="ghost" size="icon">
                <SendIcon className="w-5 h-5" />
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 