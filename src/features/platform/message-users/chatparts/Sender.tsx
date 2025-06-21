import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Doc } from "@/../convex/_generated/dataModel";
import { SendIcon } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";

export function Sender({chatPartner}:{chatPartner:Doc<"profiles">}) {
    const [message, setMessage] = useState("");
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
    return (
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="relative">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="pr-20"
          />
          <div className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center">
            <Button variant="ghost" size="icon" type="submit">
              <SendIcon className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    );
  }