import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MapPin, User2} from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { Link } from '@tanstack/react-router'
import type { Profile } from '@/utils/supa-types'

interface ProfileCardProps {
  profile: Profile
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={profile.avatar_url || undefined} />
          <AvatarFallback className="text-lg">{profile.full_name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{profile.full_name}</h3>
          <p className="text-sm text-muted-foreground">@{profile.username}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User2 className="h-4 w-4" />
            <span>{profile.user_type}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {profile.bio && (
          <p className="text-sm text-muted-foreground line-clamp-2">{profile.bio}</p>
        )}
        <div className="flex flex-wrap gap-4">
          {profile.location && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.github_url && (
            <Link 
              to={profile.github_url}
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaGithub className="h-4 w-4" />
            </Link>
          )}
          {profile.linkedin_url && (
            <Link 
              to={profile.linkedin_url}
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaLinkedin className="h-4 w-4" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 