import { useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';

export function EmergingSpotlight() {
  const trending = useQuery(api.posts.queries.getTrendingTags);
  const navigate = useNavigate();

  return (
    <Card className="p-5 mb-6">
      <div className="font-bold text-lg mb-1 text-green-700 flex items-center gap-2">
        <span className="text-green-500">✦</span> Emerging Spotlight
      </div>
      <div className="text-xs text-muted-foreground mb-4">Trending ideas, rising startups, and founders to watch</div>
      <div className="flex flex-wrap gap-2 mb-3">
        {trending?.slice(0, 5).map(t => (
          <Badge
            key={t.tag}
            variant="secondary"
            className="cursor-pointer text-sm px-2 py-1"
            onClick={() => navigate({ to: `/trending/${encodeURIComponent(t.tag)}` })}
          >
            {t.tag.startsWith('#') ? t.tag : `#${t.tag}`}
          </Badge>
        ))}
      </div>
    </Card>
  );
} 