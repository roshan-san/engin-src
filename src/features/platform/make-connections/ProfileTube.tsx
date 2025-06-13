import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, User2 } from "lucide-react"
import type { Profile } from "@/types/supa-types"
import { acceptConnectionMutation, rejectConnectionMutation } from "../hooks/ConnectionHooks"

interface ProfileTubeProps {
  profile: Profile
  connectionId: string
}

export default function ProfileTube({ profile, connectionId }: ProfileTubeProps) {
  const acceptConnection = acceptConnectionMutation()
  const rejectConnection = rejectConnectionMutation()

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profile.avatar_url || undefined} />
          <AvatarFallback>{profile.full_name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{profile.full_name}</h3>
          <p className="text-sm text-muted-foreground truncate">@{profile.username}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User2 className="h-4 w-4" />
            <span>{profile.user_type}</span>
            {profile.location && (
              <>
                <span>•</span>
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => rejectConnection.mutate(connectionId)}
            disabled={rejectConnection.isPending}
          >
            Decline
          </Button>
          <Button
            size="sm"
            onClick={() => acceptConnection.mutate(connectionId)}
            disabled={acceptConnection.isPending}
          >
            Accept
          </Button>
        </div>
      </div>
    </Card>
  )
} 