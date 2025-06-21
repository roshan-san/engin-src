import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, User2 } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export default function ProfileTube({ profileId, connectionId }: {
  profileId:string
  connectionId: string
}) {
  const acceptConnection = useMutation(api.connections.mutations.acceptConnection)
  const rejectConnection = useMutation(api.connections.mutations.rejectConnection)

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profile.data?.avatar_url || undefined} />
          <AvatarFallback>{profile.data?.full_name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{profile.data?.full_name}</h3>
          <p className="text-sm text-muted-foreground truncate">@{profile.data?.username}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User2 className="h-4 w-4" />
            <span>{profile.data?.user_type}</span>
            {profile.data?.location && (
              <>
                <span>•</span>
                <MapPin className="h-4 w-4" />
                <span>{profile.data?.location}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => rejectConnection({ id: connectionId })}
            disabled={rejectConnection.isPending}
          >
            Decline
          </Button>
          <Button
            size="sm"
            onClick={() => acceptConnection({ id: connectionId })}
            disabled={acceptConnection.isPending}
          >
            Accept
          </Button>
        </div>
      </div>
    </Card>
  )
} 