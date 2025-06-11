import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MapPin, Briefcase, User2, Github, Linkedin } from 'lucide-react'
import type { Profile } from '@/utils/supa-types'

interface PublicProfileViewProps {
  profile: Profile
}

export function PublicProfileView({ profile }: PublicProfileViewProps) {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500" />
        <CardHeader className="relative">
          <div className="absolute -top-16 left-6">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
              <AvatarFallback>{profile.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-16">
            <h1 className="text-2xl font-bold">{profile.full_name}</h1>
            <p className="text-muted-foreground">@{profile.username}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{profile.location || 'Location not specified'}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>{profile.work_type}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <User2 className="h-4 w-4" />
            <span>{profile.user_type}</span>
          </div>

          {profile.bio && (
            <div className="space-y-2">
              <h3 className="font-semibold">About</h3>
              <p className="text-muted-foreground">{profile.bio}</p>
            </div>
          )}

          {profile.skills && profile.skills.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.interests && profile.interests.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span key={interest} className="px-2 py-1 border rounded-md text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            {profile.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 