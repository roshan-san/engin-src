import { Outlet, useLocation } from "@tanstack/react-router";
import { ChatList } from "./ChatList";
import { MessageCircle } from "lucide-react";

export default function MessagingUi() {
  const location = useLocation();
  
  // Check if we're on a specific chat route
  const hasActiveMessageRoute = location.pathname.includes('/message/') && 
    location.pathname !== '/message/' && 
    location.pathname !== '/message';

  return (
    <div className="flex flex-1 h-full w-full bg-background rounded-xl shadow-lg overflow-hidden border border-border">
      <aside className="flex-col h-full bg-muted/30 border-r border-border sm:w-80">
        <ChatList />
      </aside>
      <main className="flex-1 flex-col h-full">
        {hasActiveMessageRoute ? (
          <Outlet />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
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
