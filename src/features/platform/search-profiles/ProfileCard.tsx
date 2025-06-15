import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MapPin, User2, Plus, Loader2, Github, Linkedin, Check } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import type { Profile } from '@/types/supa-types'
import { sendConnectionMutation, useAllConnections } from '../hooks/ConnectionHooks'
import type { MouseEvent } from 'react'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useAuth } from '@/features/authentication/contexts/useAuth'

export default function ProfileCard({ profile }: { profile: Profile }) {
  const sendConnection = sendConnectionMutation()
  const { data: user } = useAuth()
  const { data: connections } = useAllConnections()

  const isConnected = connections?.some(
    connection => 
      (connection.sender_id === user?.id && connection.receiver_id === profile.id) ||
      (connection.sender_id === profile.id && connection.receiver_id === user?.id)
  )

  const handleConnectionClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    sendConnection.mutate(profile.id)
  }

  const handleSocialClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
  }

  return (
    <Link to='/profile/$username' params={{ username: profile.username }}>
      <Card className="group transition-all duration-300 hover:scale-[1.01]">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 ring-1 ring-primary/10 group-hover:ring-primary/20">
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback>{profile.full_name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-semibold text-sm group-hover:text-primary truncate">
                    {profile.full_name}
                  </h3>
                  <p className="text-xs text-muted-foreground">@{profile.username}</p>
                </div>
                <div className="flex items-center gap-2">
                  {profile.id && user?.id !== profile.id && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={handleConnectionClick}
                            disabled={sendConnection.isPending || isConnected}
                          >
                            {sendConnection.isPending ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : isConnected || sendConnection.isSuccess ? (
                              <Check className="h-3 w-3 text-green-500" />
                            ) : (
                              <Plus className="h-3 w-3" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {isConnected 
                              ? "Already connected" 
                              : sendConnection.isSuccess 
                                ? "Connection request sent" 
                                : "Send connection request"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {profile.github_url && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link 
                            to={profile.github_url}
                            target="_blank"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={handleSocialClick}
                          >
                            <Github className="h-4 w-4" />
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
                            onClick={handleSocialClick}
                          >
                            <Linkedin className="h-4 w-4" />
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
              <div className="flex items-center gap-2.5">
                <Badge variant="secondary" className="gap-1 text-xs">
                  <User2 className="h-3 w-3" />
                  {profile.user_type}
                </Badge>
                {profile.location && (
                  <Badge variant="outline" className="gap-1 text-xs">
                    <MapPin className="h-3 w-3" />
                    {profile.location}
                  </Badge>
                )}
              </div>
              {profile.bio && (
                <p className="text-xs text-muted-foreground line-clamp-2 group-hover:text-foreground/80">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
} 