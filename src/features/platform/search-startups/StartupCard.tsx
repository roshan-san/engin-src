import React, { useState } from 'react';
import { MapPin, ThumbsUp, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Doc, Id } from '@/../convex/_generated/dataModel';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import { useNavigate } from '@tanstack/react-router';
import { useUser } from '@/features/authentication/UserContext';

interface StartupCardProps {
  startup: Doc<'startups'>;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup }) => {
  const navigate = useNavigate();
  const { profile } = useUser();
  const founderProfile = useQuery(api.profile.queries.getProfileById, { profileId: startup.ownerId });
  const [likeLoading, setLikeLoading] = useState(false);
  const toggleLike = useMutation(api.startups.mutations.updateStartup); // You may want a dedicated like mutation

  // Likes logic
  const likesArr = startup.likes || [];
  const hasLiked = profile ? likesArr.includes(profile._id as Id<'profiles'>) : false;
  const [likes, setLikes] = useState(likesArr.length);
  const [liked, setLiked] = useState(hasLiked);

  // Like button handler
  const handleLike = async () => {
    if (!profile) return;
    setLikeLoading(true);
    let newLikesArr;
    if (liked) {
      newLikesArr = likesArr.filter((id) => id !== profile._id);
    } else {
      newLikesArr = [...likesArr, profile._id];
    }
    await toggleLike({
      startupId: startup._id,
      likes: newLikesArr,
    });
    setLikes(newLikesArr.length);
    setLiked(!liked);
    setLikeLoading(false);
  };

  // Tag logic: show up to 3, then a '+N' badge
  // Avatar logic

  return (
    <Card className="w-full bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 font-sans">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12 rounded-lg bg-primary/90">
              <AvatarFallback className="bg-primary/90 text-primary-foreground font-bold text-lg">
                {founderProfile?.name?.charAt(0).toUpperCase() || '...'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-primary text-lg font-bold leading-tight">{startup.name}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{founderProfile?.name || '...'}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className="text-xs text-muted-foreground font-semibold">{startup.stage}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mt-3 mb-4 leading-relaxed line-clamp-2">
          {startup.description}
        </p>

        {/* Stats Grid */}
        <div className="bg-gray-50 rounded-xl border border-gray-100 grid grid-cols-3 text-center py-3 mb-4">
          <div>
            <div className="text-base font-bold text-primary">{startup.team_size}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Team</div>
          </div>
        </div>

        {/* Location and Likes */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <MapPin size={14} />
            <span className="text-sm">{startup.location}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <ThumbsUp size={14} />
            <span className="text-sm">{likes}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {startup.tags?.map((tag, idx) => (
            <Badge key={idx} className="bg-gray-100 text-muted-foreground px-3 py-1 text-xs font-medium rounded-full">
              {tag}
            </Badge>
          ))}
          {startup.tags?.length && startup.tags?.length > 3 && (
            <Badge className="bg-gray-100 text-muted-foreground px-3 py-1 text-xs font-medium rounded-full">
              +{startup.tags?.length - 3}
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 border-t border-gray-100 pt-4">
          <Button
            variant={liked ? 'default' : 'outline'}
            className={`flex-1 flex items-center justify-center space-x-2 border-gray-200 rounded-lg hover:bg-primary/10 font-medium text-sm ${liked ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            onClick={handleLike}
            disabled={likeLoading}
          >
            <ThumbsUp size={16} />
            <span>Upvote</span>
          </Button>
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center space-x-2 border-gray-200 rounded-lg hover:bg-primary/10 text-muted-foreground font-medium text-sm"
            onClick={() => navigate({ to: '/startups/$startupid', params: { startupid: startup._id } })}
          >
            <Eye size={16} />
            <span>View Details</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StartupCard;


