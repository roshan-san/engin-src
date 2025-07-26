import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useOnlineStatus } from "@/features/platform/message-users/useOnlineStatus";
import { BottomBar } from "@/features/platform/navigation-bars/BottomBar";
import { TopBar } from "@/features/platform/navigation-bars/TopBar";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { UserProvider } from "@/features/authentication/UserContext";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
});

function ProtectedLayout() {
  useOnlineStatus();
  const data = useQuery(api.auth.getUser);

  if (!data?.profile) {
    return <Navigate to="/onboard/user-type" />;
  }

  return (
    <UserProvider profile={data.profile}>
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

function RouteComponent() {
  const data = useQuery(api.auth.getUser);

  return (
    <div className="min-h-screen flex flex-col">
      <Authenticated>
        {data === undefined ? (
          <FullScreenLoader />
        ) : data?.profile ? (
          <ProtectedLayout />
        ) : (
          <Navigate to="/onboard/user-type" />
        )}
      </Authenticated>
      <Unauthenticated>
        <Navigate to="/" />
      </Unauthenticated>
    </div>
  );
}
