import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  FaMapMarkerAlt,
  FaUser,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaUserPlus,
  FaTimes,
  FaUserMinus
} from 'react-icons/fa'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { Doc } from '@/../convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/../convex/_generated/api'

export default function ProfileCard({ profile }: { profile:Doc<"profiles"> }) {
  const connection = useQuery(api.connections.queries.getConnectionStatus, {
    receiverId: profile._id
  })

  const createConnection = useMutation(api.connections.mutations.createConnection)
  const rejectConnection = useMutation(api.connections.mutations.rejectConnection)

  const handleConnectionAction = () => {
    if (!connection) {
      createConnection({
        receiverId: profile._id
      })
    } else {
      rejectConnection({
        id: connection._id
      })
    }
  }

  const getButtonContent = () => {
    if (!connection) {
      return {
        icon: <FaUserPlus className="h-4 w-4" />,
        text: 'Connect'
      }
    }
    if (connection.status === 'accepted') {
      return {
        icon: <FaUserMinus className="h-4 w-4" />,
        text: 'Remove Friend'
      }
    }
    if (connection.status === 'pending') {
      return {
        icon: <FaTimes className="h-4 w-4" />,
        text: 'Cancel Request'
      }
    }
    return {
      icon: <FaUserPlus className="h-4 w-4" />,
      text: 'Connect'
    }
  }

  const buttonContent = getButtonContent()

  return (
    <Card className="transition-colors duration-200 hover:bg-accent">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Link to='/profile/$username' params={{ username: profile.username ?? '' }}>
            <Avatar className="h-16 w-16 border transition-colors duration-300 hover:border-primary/20">
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback className='text-2xl'>{profile.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <Link to='/profile/$username' params={{ username: profile.username ?? '' }}>
                  <h3 className="font-semibold text-lg transition-colors hover:text-primary truncate">
                    {profile.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground">@{profile.username}</p>
              </div>
              <div className="flex items-center shrink-0 gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8" asChild>
                        <Link to='/message/$username' params={{ username: profile.username ?? '' }}>
                          <FaEnvelope className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Message</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" className="h-8 w-8" onClick={handleConnectionAction}>
                        {buttonContent.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{buttonContent.text}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {profile.github_url && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to={profile.github_url}
                          target="_blank"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <FaGithub className="h-4 w-4" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View GitHub Profile</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {profile.linkedin_url && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to={profile.linkedin_url}
                          target="_blank"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <FaLinkedin className="h-4 w-4" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View LinkedIn Profile</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 flex-wrap">
                <Badge variant="secondary" className="gap-1.5 text-xs">
                  <FaUser className="h-3 w-3" />
                  {profile.user_type}
                </Badge>
                {profile.location && (
                  <Badge variant="outline" className="gap-1.5 text-xs">
                    <FaMapMarkerAlt className="h-3 w-3" />
                    {profile.location}
                  </Badge>
                )}
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  )
} 