import Header from "@/features/platform/Header";
import { ChatList } from "@/features/platform/message-users/ChatList";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/message")({
  component: MessagesIndex,
});

function MessagesIndex() {
  return (
    <div className="h-full flex flex-1 flex-col p-4">
      <Header>Message</Header>
      <div className="grid flex-1 h-full sm:grid-cols-2">
        <div className=" border-6">
          <ChatList />
        </div>
        <div className="overflow-x-scroll border-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
} 