import { Outlet, useLocation } from "@tanstack/react-router";
import { ChatList } from "./ChatList";
import { MessageCircle } from "lucide-react";

export default function MessagesLayout() {
  const location = useLocation();
  const hasActiveChat = location.pathname.includes('/message') && 
    location.pathname !== '/message/' && 
    location.pathname !== '/message';

  return (
    <div className="h-full flex flex-col p-4">
      <div className="max-w-6xl w-full mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Messages</h1>
          <p className="text-muted-foreground text-lg">
            Connect and chat with your network
          </p>
        </div>
        
        <div className="flex h-full bg-background rounded-lg border">
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
      </div>
    </div>
  );
}
