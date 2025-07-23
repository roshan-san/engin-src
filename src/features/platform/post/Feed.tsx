import { useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import type { Doc } from '@/../convex/_generated/dataModel';
import { PostCard } from './PostCard';
import { Sparkles, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface FeedProps {
  selectedTag?: string | null;
  onTagClick?: (tag: string) => void;
}

export function Feed({ selectedTag: externalSelectedTag, onTagClick }: FeedProps) {
  const [internalSelectedTag, setInternalSelectedTag] = useState<string | null>(null);
  
  // Use external tag if provided, otherwise use internal state
  const selectedTag = externalSelectedTag !== undefined ? externalSelectedTag : internalSelectedTag;
  
  const posts = useQuery(
    selectedTag 
      ? api.posts.queries.getPostsByTag 
      : api.posts.queries.listPosts,
    selectedTag ? { tag: selectedTag } : {}
  );

  const trendingTags = useQuery(api.posts.queries.getTrendingTags);

  const handleTagClick = (tag: string) => {
    if (onTagClick) {
      onTagClick(tag);
    } else {
      setInternalSelectedTag(internalSelectedTag === tag ? null : tag);
    }
  };

  const clearFilter = () => {
    if (onTagClick) {
      onTagClick('');
    } else {
      setInternalSelectedTag(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tag Filter */}
      {trendingTags && trendingTags.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-muted-foreground mr-2">Filter by:</span>
          {trendingTags.slice(0, 8).map((item) => (
            <Badge
              key={item.tag}
              variant={selectedTag === item.tag ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary/20 text-primary border-primary/30 transition-colors"
              onClick={() => handleTagClick(item.tag)}
            >
              {item.tag.startsWith('#') ? item.tag : `#${item.tag}`}
              <span className="ml-1 text-xs opacity-70">({item.count})</span>
            </Badge>
          ))}
          {selectedTag && (
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-destructive/10 text-destructive border-destructive/30"
              onClick={clearFilter}
            >
              <X className="w-3 h-3 mr-1" />
              Clear
            </Badge>
          )}
        </div>
      )}

      {/* Active Filter Display */}
      {selectedTag && (
        <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Showing posts tagged with "{selectedTag}"
          </span>
          <Badge
            variant="outline"
            className="cursor-pointer hover:bg-destructive/10 text-destructive border-destructive/30 ml-auto"
            onClick={clearFilter}
          >
            <X className="w-3 h-3 mr-1" />
            Clear
          </Badge>
        </div>
      )}

      {/* Posts */}
      {posts?.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            {selectedTag ? `No posts with tag "${selectedTag}"` : "No posts yet"}
          </h3>
          <p className="text-muted-foreground">
            {selectedTag ? "Try a different tag or create a post with this tag!" : "Be the first to share something!"}
          </p>
        </div>
      ) : (
        <div className="space-y-0">
          {posts?.map((post: Doc<'posts'>) => (
            <PostCard key={post._id} post={post} onTagClick={handleTagClick} />
          ))}
        </div>
      )}


    </div>
  );
} 