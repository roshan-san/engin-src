import { Outlet } from "@tanstack/react-router";
import { ChatList } from "./ChatList";

export default function MessagingUi() {
  return (
    <div className="grid flex-1 h-full sm:grid-cols-2">
      <div>
        <ChatList />
      </div>
      <Outlet />
    </div>
  );
}
