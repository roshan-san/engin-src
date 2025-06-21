import { Outlet, useMatchRoute } from "@tanstack/react-router";
import { ChatList } from "./ChatList";
import { cn } from "@/lib/utils";

export default function MessagingUi() {
  const matchRoute = useMatchRoute();
  const isChatActive = matchRoute({ to: "/messages/$chatId", strict: false });

  return (
    <div className="grid sm:grid-cols-[300px_1fr] h-[calc(100vh-theme(spacing.16))]">
      <div
        className={cn(
          "h-full border-r",
          isChatActive ? "hidden sm:block" : "block"
        )}
      >
        <ChatList />
      </div>
      <div
        className={cn("h-full", isChatActive ? "block" : "hidden sm:block")}
      >
        <Outlet />
      </div>
    </div>
  );
}
