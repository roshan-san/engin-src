import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerDescription } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { HiBell } from "react-icons/hi"
import { Skeleton } from "@/components/ui/skeleton"
import { useConnectionRequest } from "./useConnectionRequest"
import ConnectionRequestCard from "./ProfileTube"

export default function ReqDrawer() {
  const { 
    data: connrequests, 
    isLoading,
    acceptConnection,
    rejectConnection,
    isAccepting,
    isRejecting
  } = useConnectionRequest()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="lg" className="relative h-14 px-4">
          <HiBell className="h-6 w-6" />
          {connrequests && connrequests.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium">
              {connrequests.length}
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
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[200px] w-full" />
            ))
          ) : connrequests?.length === 0 ? (
            <p className="text-center text-muted-foreground">No pending connection requests</p>
          ) : (
            connrequests?.map((request) => (
              <ConnectionRequestCard
                key={request.id}
                request={request}
                onAccept={acceptConnection}
                onReject={rejectConnection}
                isAccepting={isAccepting}
                isRejecting={isRejecting}
              />
            ))
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
} 