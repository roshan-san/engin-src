import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileTube from "./ProfileTube";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Doc } from "../../../../convex/_generated/dataModel";

export default function NotificationsDrawer() {
  const pendingNotifications = useQuery(
    api.connections.queries.getMyPendingConnections,
  );

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="link" size="lg" className="relative h-14 px-4">
          <Bell className="h-6 w-6" />
          {pendingNotifications && pendingNotifications.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium">
              {pendingNotifications.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-0 h-full w-screen sm:w-3/4 sm:max-w-sm">
        <DrawerHeader className="border-b border-border/50">
          <DrawerTitle className="text-xl font-semibold">Notifications</DrawerTitle>
          <DrawerDescription>
            View and manage your notifications
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {pendingNotifications === undefined ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : pendingNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-8">
              <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium">No notifications</p>
              <p className="text-sm">You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingNotifications.map((connection: Doc<"connections">) => {
                return (
                  <ProfileTube
                    key={connection._id}
                    connectionId={connection._id}
                    profileId={connection.senderid}
                  />
                );
              })}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
