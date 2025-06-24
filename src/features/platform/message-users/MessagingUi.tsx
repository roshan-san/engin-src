import { Outlet, useParams } from "@tanstack/react-router";
import { ChatList } from "./ChatList";

export default function MessagingUi() {
  const { username } = useParams({ from: "/_protected/message/$username" });
  return (
    <div className="flex flex-1 h-full w-full bg-background rounded-xl shadow-lg overflow-hidden border border-border">
      <aside
        className={`flex-col h-full bg-muted border-r border-border sm:w-80 ${
          username ? "hidden sm:flex" : "flex w-full"
        }`}
      >
        <ChatList />
      </aside>
      <main
        className={`flex-1 flex-col h-full ${
          username ? "flex" : "hidden sm:flex"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
