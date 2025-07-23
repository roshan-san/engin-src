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
      <DrawerContent className="w-full max-w-full sm:max-w-sm h-full fixed right-0 top-0 z-50 p-0 md:rounded-none md:shadow-lg md:bg-white md:dark:bg-gray-900">
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>
            View and manage your notifications
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          {pendingNotifications === undefined ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : pendingNotifications.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No notifications
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
