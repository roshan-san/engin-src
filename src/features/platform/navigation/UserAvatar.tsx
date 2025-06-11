import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { useProfile } from "@/features/authentication/store/authStore";
export function UserAvatar() {
  const { data: profile } = useProfile()
  return (
    <div>
        <Avatar>
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback>
                <UserIcon className="h-4 w-4" />
            </AvatarFallback>
        </Avatar>
    </div>
  )
}
