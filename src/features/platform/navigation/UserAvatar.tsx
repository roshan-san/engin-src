import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
export function UserAvatar({url}:{url:string | null}) {
  return (
    <div>
        <Avatar>
            <AvatarImage src={url!} />
            <AvatarFallback>
                <UserIcon className="h-4 w-4" />
            </AvatarFallback>
        </Avatar>
    </div>
  )
}
