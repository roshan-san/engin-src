import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { useConnectionRequests } from "../hooks/useConnectionRequests"
import { Button } from "@/components/ui/button"
import { HiBell } from "react-icons/hi"
import { Skeleton } from "@/components/ui/skeleton"
import { useConnectionRequests } from "./useConnectionRequests"
import ProfileCard from "../search-profiles/ProfileCard"

export default function ReqDrawer() {
  const { data: connrequests, isLoading } = ()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <HiBell className="h-5 w-5" />
          {connrequests && connrequests.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              {connrequests.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Connection Requests</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[100px] w-full" />
            ))
          ) : connrequests?.length === 0 ? (
            <p className="text-center text-muted-foreground">No pending connection requests</p>
          ) : (
            connrequests.map((request) => (
              <ProfileCard key={request.id} profile={request.sender} />
            ))
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
} 