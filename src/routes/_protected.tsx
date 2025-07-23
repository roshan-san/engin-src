import { createFileRoute, Outlet } from "@tanstack/react-router";
import { UserProvider } from "@/features/authentication/UserContext";
import { useOnlineStatus } from "@/features/platform/message-users/useOnlineStatus";
import { BottomBar } from "@/features/platform/navigation-bars/BottomBar";
import { TopBar } from "@/features/platform/navigation-bars/TopBar";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
});

function RouteComponent() {
  useOnlineStatus();

  return (
    <UserProvider>
      <div className="flex h-screen flex-col w-full">
        <TopBar />
        <main className="flex-1 w-full overflow-y-auto pb-16 md:pb-0">
          <Outlet />
        </main>
        {/* BottomBar: only on mobile, fixed to bottom */}
        <div className="block md:hidden fixed bottom-0 left-0 w-full z-50 bg-background border-t">
          <BottomBar />
        </div>
      </div>
    </UserProvider>
  );
}
