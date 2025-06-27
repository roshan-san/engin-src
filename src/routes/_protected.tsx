import { BottomBar } from "@/features/platform/navigation-bars/BottomBar";
import { LeftBar } from "@/features/platform/navigation-bars/LeftBar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { UserProvider } from "@/features/authentication/UserContext";
import { useOnlineStatus } from "@/features/platform/message-users/useOnlineStatus";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
});

function RouteComponent() {
  // Track online status
  useOnlineStatus();

  return (
    <UserProvider>
      <div className="flex h-screen sm:flex-row flex-col w-full">
        <div className="w-20 hidden sm:block">
          <LeftBar />
        </div>
        <main className="flex-1 w-full overflow-y-auto">
          <Outlet />
        </main>
        <div className="h-20  flex items-center justify-center sm:hidden">
          <BottomBar />
        </div>
      </div>
    </UserProvider>
  );
}
