import type { Doc } from '@/../convex/_generated/dataModel';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from '@tanstack/react-router';

export function PostCard({ post }: { post: Doc<'posts'> }) {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle className="text-base font-medium truncate">{post.title}</CardTitle>
        <div className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleString()}</div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-sm whitespace-pre-line mb-2">{post.content}</div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => navigate({ to: `/trending/${encodeURIComponent(tag)}` })}
              >
                {tag.startsWith('#') ? tag : `#${tag}`}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 