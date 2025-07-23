import { createFileRoute, Outlet } from "@tanstack/react-router";
import { UserProvider } from "@/features/authentication/UserContext";
import { useOnlineStatus } from "@/features/platform/message-users/useOnlineStatus";
import { BottomBar } from "@/features/platform/navigation-bars/BottomBar";
import { TopBar } from "@/features/platform/navigation-bars/TopBar";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
});

function RouteComponent() {
  // Track online status
  useOnlineStatus();

  return (
    <UserProvider>
      <div className="flex h-screen flex-col w-full">
        <TopBar />
        <main className="flex-1 w-full overflow-y-auto">
          <Outlet />
        </main>
          <BottomBar />
      </div>
    </UserProvider>
  );
}
