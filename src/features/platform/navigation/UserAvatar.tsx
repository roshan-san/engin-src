'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/AuthContext";
export function UserAvatar() {
  const {userObj}= useAuthContext()
  const avatarUrl = userObj?.user_metadata?.avatar_url;

  return (
    <Avatar className="h-8 w-8 rounded-full ring-2 ring-primary/10 transition-all hover:ring-primary/20">
      <AvatarImage src={avatarUrl || undefined} />
      <AvatarFallback className="bg-primary/10 text-primary">
        {userObj?.email?.[0]?.toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  );
} 