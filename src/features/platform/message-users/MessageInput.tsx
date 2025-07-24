import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";

export function MessageInput({
  message,
  setMessage,
  onSend,
  disabled
}: {
  message: string,
  setMessage: (v: string) => void,
  onSend: (e: React.FormEvent) => void,
  disabled: boolean
}) {
  return (
    <form onSubmit={onSend} className="flex items-end gap-2">
      <div className="flex-1 relative">
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="pr-10 rounded-full bg-muted/60 border-none focus:ring-2 focus:ring-primary focus:bg-background transition-all duration-200 h-9 text-sm"
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSend(e as any);
            }
          }}
        />
      </div>
      
      <Button
        variant="default"
        size="icon"
        type="submit"
        disabled={disabled || !message.trim()}
        className="rounded-full h-9 w-9 shrink-0 shadow-sm hover:shadow-md transition-all duration-200"
      >
        <SendIcon className="w-4 h-4" />
      </Button>
    </form>
  );
} 