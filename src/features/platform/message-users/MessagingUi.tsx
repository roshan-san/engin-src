import { Outlet } from "@tanstack/react-router";
import ChatList from "./ChatList";
import { useMe } from "@/features/authentication/contexts/AuthContext";

export default function MessagingUi() {
  const { profile } = useMe();
  return (
    <>
      <ChatList profile={profile} />
      <div className="hidden sm:block">
        <Outlet />
      </div>
    </>
  );
}
