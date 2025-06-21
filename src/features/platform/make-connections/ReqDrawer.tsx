import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerDescription } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { HiBell } from "react-icons/hi"
import { Skeleton } from "@/components/ui/skeleton"
import ProfileTube from "./ProfileTube"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import type { Doc } from "../../../../convex/_generated/dataModel"

export default function ReqDrawer() {
  const pendingConnections = useQuery(api.connections.queries.getMyPendingConnections);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="lg" className="relative h-14 px-4">
          <HiBell className="h-6 w-6" />
          {pendingConnections && pendingConnections.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium">
              {pendingConnections.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Connection Requests</DrawerTitle>
          <DrawerDescription>
            View and manage your pending connection requests
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          {pendingConnections === undefined ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : pendingConnections.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No pending connection requests
            </div>
          ) : (
            <div className="space-y-4">
              {pendingConnections.map((connection: Doc<"connections">) => {
                return (
                <ProfileTube
                  key={connection._id}
                  connectionId={connection._id}
                  profileId={connection.senderid}
                />
              )})}
            </div>
          )}
        </div>   
      </DrawerContent>
    </Drawer>
  )
} 