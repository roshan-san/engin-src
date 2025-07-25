import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from 'convex/react'
import { api } from '@/../convex/_generated/api'
import { useUser } from '@/features/authentication/useUser'
import { CreateBtn } from '@/features/platform/create-startup/CreateBtn'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MapPin, Users, Eye, Plus, Calendar, TrendingUp } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { FullScreenLoader } from '@/components/FullScreenLoader'
import type { Doc } from '@/../convex/_generated/dataModel'

export const Route = createFileRoute('/_protected/my-startups')({
  component: RouteComponent,
})

function RouteComponent() {
  const { profile } = useUser()
  const myStartups = useQuery(api.startups.queries.getMyStartups)
  const userStartups = useQuery(api.startups.queries.getStartupsByUser, { userId: profile._id })

  if (myStartups === undefined || userStartups === undefined) {
    return <FullScreenLoader />
  }

  const ownedStartups = userStartups?.owned || []
  const collaboratedStartups = userStartups?.collaborated || []

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Owned Startups Section */}
      {ownedStartups.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">My Startups</h2>
            <Badge variant="secondary">{ownedStartups.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownedStartups.map((startup) => (
              <StartupCard key={startup._id} startup={startup} isOwner={true} />
            ))}
          </div>
        </div>
      )}

      {/* Collaborated Startups Section */}
      {collaboratedStartups.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Collaborations</h2>
            <Badge variant="secondary">{collaboratedStartups.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaboratedStartups.map((startup) => (
              <StartupCard key={startup._id} startup={startup} isOwner={false} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {ownedStartups.length === 0 && collaboratedStartups.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Plus className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No startups yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first startup or join a team as a collaborator
            </p>
            <Button
              onClick={() => {
                const createBtn = document.querySelector('[aria-label="Create startup"]') as HTMLButtonElement
                createBtn?.click()
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Startup
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create Startup Button (Fixed Position) */}
      <CreateBtn />
    </div>
  )
}

// Startup Card Component
interface StartupCardProps {
  startup: Doc<"startups">
  isOwner: boolean
}

function StartupCard({ startup, isOwner }: StartupCardProps) {
  const navigate = useNavigate()
  const founderProfile = useQuery(api.profile.queries.getProfileById, { profileId: startup.ownerId })

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'Recently'
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={founderProfile?.avatar_url} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {founderProfile?.name?.charAt(0) || founderProfile?.username?.charAt(0) || '?'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg truncate">{startup.name}</CardTitle>
              {isOwner && (
                <Badge variant="default" className="text-xs">Owner</Badge>
              )}
            </div>
            <CardDescription className="text-sm">
              by {founderProfile?.name || founderProfile?.username || 'Unknown'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {startup.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{startup.team_size} members</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{startup.location}</span>
          </div>
        </div>

        {startup.tags && startup.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {startup.tags.slice(0, 2).map((tag: string, idx: number) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {tag.startsWith('#') ? tag : `#${tag}`}
              </Badge>
            ))}
            {startup.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{startup.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(startup.createdAt)}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation()
              navigate({ to: '/startups/$startupid', params: { startupid: startup._id } })
            }}
          >
            <Eye className="w-3 h-3 mr-1" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
