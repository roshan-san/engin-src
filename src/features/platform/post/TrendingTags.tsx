import { useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import { Badge } from '@/components/ui/badge';
import { Hash, TrendingUp, Sparkles } from 'lucide-react';

interface TrendingTagsProps {
  onTagClick?: (tag: string) => void;
  selectedTag?: string | null;
}

export function TrendingTags({ onTagClick, selectedTag }: TrendingTagsProps) {
  const trendingTags = useQuery(api.posts.queries.getTrendingTags);

  // Mock trending tags if no data available
  const defaultTags = [
    'startup', 'tech', 'innovation', 'funding', 'entrepreneur', 
    'ai', 'fintech', 'healthtech', 'edtech', 'sustainability'
  ];

  // Handle the response format from backend
  const tags = trendingTags?.length 
    ? trendingTags.map(item => item.tag)
    : defaultTags;

  return (
    <div className="bg-background border border-border rounded-xl p-6 shadow-sm h-fit">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-primary/20 border border-primary/30">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground">Trending Tags</h3>
          <p className="text-sm text-muted-foreground">Popular topics this week</p>
        </div>
      </div>
      
      {tags.length > 0 ? (
        <div className="space-y-4">
          {/* Top Trending Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 6).map((tag: string, index: number) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : index < 3 ? "default" : "secondary"}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : index < 3 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "hover:bg-primary/20 text-primary border-primary/30"
                }`}
                onClick={() => onTagClick?.(tag)}
              >
                {index < 3 && <Sparkles className="w-3 h-3 mr-1" />}
                <Hash className="w-3 h-3 mr-1" />
                {tag.startsWith('#') ? tag : `#${tag}`}
              </Badge>
            ))}
          </div>

          {/* More Tags */}
          {tags.length > 6 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border/30">
              {tags.slice(6, 12).map((tag: string) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-muted/50 transition-colors text-xs"
                  onClick={() => onTagClick?.(tag)}
                >
                  <Hash className="w-3 h-3 mr-1" />
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </Badge>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground border-t border-border/30 mt-4">
          <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No trending tags yet</p>
          <p className="text-xs opacity-70 mt-1">Create posts with tags to see them here!</p>
        </div>
      )}
    </div>
  );
} 