import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin, User2, Check, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from '@tanstack/react-router';
import type { Profile } from '@/utils/supa-types';
import type { Database } from '@/database.types';

type Connection = Database['public']['Tables']['connections']['Row'];

interface ProfileTubeProps {
  request: Connection & { sender: Profile };
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  isAccepting: boolean;
  isRejecting: boolean;
}

export default function ProfileTube({ 
  request, 
  onAccept, 
  onReject,
  isAccepting,
  isRejecting
}: ProfileTubeProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={request.sender.avatar_url || undefined} />
            <AvatarFallback className="text-lg">{request.sender.full_name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <Link 
              to={"/profile/$username"}
              params={{ username: request.sender.username }}
              className="font-semibold text-lg hover:underline"
            >
              {request.sender.full_name}
            </Link>
            <p className="text-sm text-muted-foreground">@{request.sender.username}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User2 className="h-4 w-4" />
              <span>{request.sender.user_type}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="default" 
            size="icon"
            onClick={() => onAccept(request.id)}
            disabled={isAccepting || isRejecting}
            className="h-8 w-8"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onReject(request.id)}
            disabled={isAccepting || isRejecting}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {request.sender.bio && (
          <p className="text-sm text-muted-foreground line-clamp-2">{request.sender.bio}</p>
        )}
        <div className="flex flex-wrap gap-4">
          {request.sender.location && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{request.sender.location}</span>
            </div>
          )}
          {request.sender.github_url && (
            <Link 
              to={request.sender.github_url}
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaGithub className="h-4 w-4" />
            </Link>
          )}
          {request.sender.linkedin_url && (
            <Link 
              to={request.sender.linkedin_url}
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaLinkedin className="h-4 w-4" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 