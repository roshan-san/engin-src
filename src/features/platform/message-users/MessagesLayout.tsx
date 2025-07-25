import { Outlet, useLocation } from "@tanstack/react-router";
import { ChatList } from "./ChatList";
import { MessageCircle } from "lucide-react";

export default function MessagesLayout() {
  const location = useLocation();
  const hasActiveChat = location.pathname.includes('/message') && 
    location.pathname !== '/message/' && 
    location.pathname !== '/message';

  return (
    <div className="h-full flex flex-col p-0">
      <div className="w-full h-full flex flex-col">
        {/* Mobile Layout - Show either chat list OR chat window */}
        <div className="lg:hidden h-full min-h-0 bg-background">
          {hasActiveChat ? (
            <Outlet />
          ) : (
            <ChatList onChatSelect={() => {}} />
          )}
        </div>

        {/* Desktop Layout - Show both side by side */}
        <div className="hidden lg:flex h-full min-h-0 bg-background">
          {/* Sidebar */}
          <aside className="w-80 border-r border-border/50 bg-background flex flex-col min-h-0">
            <ChatList onChatSelect={() => {}} />
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
