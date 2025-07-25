import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { ChatList } from "./ChatList";
import type { Doc } from "@/../convex/_generated/dataModel";

export default function MessagesLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasActiveChat = location.pathname.includes('/message') && 
    location.pathname !== '/message/' && 
    location.pathname !== '/message';

  const handleChatSelect = (chatPartner: Doc<"profiles">) => {
    if (chatPartner?.username) {
      navigate({ to: '/message/$username', params: { username: chatPartner.username } });
    }
  };

  return (
    <div className="h-full flex flex-col p-0">
      <div className="w-full h-full flex flex-col">
        {/* Mobile/Tablet Layout - Show either chat list OR chat window */}
        <div className="md:hidden h-full min-h-0 bg-background">
          {hasActiveChat ? (
            <Outlet />
          ) : (
            <ChatList onChatSelect={handleChatSelect} />
          )}
        </div>

        {/* Desktop/Laptop Layout - Show both side by side */}
        <div className="hidden md:flex h-full min-h-0 bg-background">
          {/* Sidebar */}
          <aside className="w-80 border-r border-border/50 bg-background flex flex-col min-h-0">
            <ChatList onChatSelect={handleChatSelect} />
          </aside>

          {/* Main Chat Area */}
          <main className="flex-1 flex flex-col min-h-0">
            {hasActiveChat ? (
              <Outlet />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
                <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mb-6">
                  <MessageCircle className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                <p className="text-sm text-center max-w-sm">
                  Choose a chat from the list to start messaging
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
