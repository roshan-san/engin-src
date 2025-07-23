import { Outlet, useLocation } from "@tanstack/react-router";
import { ChatList } from "./ChatList";
import { MessageCircle, } from "lucide-react";

export default function MessagesLayout() {
  const location = useLocation();
  const hasActiveChat = location.pathname.includes('/message') && 
    location.pathname !== '/message/' && 
    location.pathname !== '/message';

  return (
    <div className="flex h-full bg-background rounded-lg border overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 border-r bg-muted/20">
        <ChatList />
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {hasActiveChat ? (
          <Outlet />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
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
  );
}
