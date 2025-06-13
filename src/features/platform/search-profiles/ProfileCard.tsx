import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MapPin, User2, Plus } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import type { Profile } from '@/types/supa-types'
import { sendConnectionMutation } from '../hooks/StartupHooks'
import { useAuth } from '@/features/authentication/store/authStore'


export default function ProfileCard({profile}:{profile:Profile}) {
  const user= useAuth()

  const sendConnection = sendConnectionMutation()

  return (
    <Link to='/profile/$username' params={{username:profile.username}}>
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={profile.avatar_url || undefined} />
          <AvatarFallback className="text-lg">{profile.full_name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1 flex-grow">
          <h3 className="font-semibold text-lg">{profile.full_name}</h3>
          <p className="text-sm text-muted-foreground">@{profile.username}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User2 className="h-4 w-4" />
            <span>{profile.user_type}</span>
          </div>
        </div>
        {user.data?.id !== profile.id && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              sendConnection.mutate(profile.id)
            }}
            disabled={sendConnection.isPending}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
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
  </Link>
  )
} 