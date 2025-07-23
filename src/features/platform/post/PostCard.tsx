import type { Doc } from '@/../convex/_generated/dataModel';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from '@tanstack/react-router';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import { ArrowUp, ArrowDown, MoreHorizontal, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function PostCard({ post }: { post: Doc<'posts'> }) {
  const navigate = useNavigate();
  const author = useQuery(api.profile.queries.getProfileById, { profileId: post.authorId });
  const votes = useQuery(api.posts.queries.getPostVotes, { postId: post._id });
  const comments = useQuery(api.posts.queries.getPostComments, { postId: post._id });
  const upvotePost = useMutation(api.posts.mutations.upvotePost);
  const downvotePost = useMutation(api.posts.mutations.downvotePost);
  const addComment = useMutation(api.posts.mutations.addComment);
  const [comment, setComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);

  const handleUpvote = async () => {
    setVoteLoading(true);
    await upvotePost({ postId: post._id });
    setVoteLoading(false);
  };
  const handleDownvote = async () => {
    setVoteLoading(true);
    await downvotePost({ postId: post._id });
    setVoteLoading(false);
  };
  const handleAddComment = async () => {
    if (!comment.trim()) return;
    setCommentLoading(true);
    await addComment({ postId: post._id, content: comment });
    setComment('');
    setCommentLoading(false);
  };

  return (
    <Card className="p-0 overflow-hidden shadow-md border border-muted/40 hover:shadow-lg transition-all rounded-2xl">
      <CardHeader className="flex flex-row items-start gap-4 bg-background py-4 px-6 border-b">
        <Avatar className="h-12 w-12 text-lg font-bold bg-orange-100 text-orange-700">
          {author?.avatar_url ? (
            <AvatarImage src={author.avatar_url} alt={author.name || author.username || 'User'} />
          ) : null}
          <AvatarFallback>{author?.name?.charAt(0) || author?.username?.charAt(0) || '?'}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base truncate">{author ? author.name : <span className="bg-muted rounded w-16 h-4 animate-pulse inline-block" />}</span>
            <CheckCircle className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            {author?.user_type && <span>{author.user_type}</span>}
            {author?.user_type && <span>·</span>}
            <span>{new Date(post.createdAt).toLocaleString()}</span>
          </div>
        </div>
        <button className="ml-2 p-1 rounded-full hover:bg-muted/40 text-muted-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </CardHeader>
      <CardContent className="pt-4 pb-2 px-6">
        <div className="text-base whitespace-pre-line mb-3 text-foreground/90">{post.content}</div>
        {post.imageUrl && (
          <div className="w-full rounded-xl overflow-hidden mb-3 border border-muted/30">
            <img src={post.imageUrl} alt="Post media" className="w-full h-64 object-cover" />
          </div>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 mb-2">
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
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-1">
            <button
              className="p-1 rounded-full hover:bg-blue-100 text-blue-600 transition-colors disabled:opacity-50"
              aria-label="Upvote"
              title="Upvote"
              onClick={handleUpvote}
              disabled={voteLoading}
            >
              <ArrowUp className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium min-w-[2ch] text-center">
              {votes ? votes.upvotes : <span className="inline-block w-4 h-4 bg-muted rounded animate-pulse" />}
            </span>
            <button
              className="p-1 rounded-full hover:bg-red-100 text-red-600 transition-colors disabled:opacity-50"
              aria-label="Downvote"
              title="Downvote"
              onClick={handleDownvote}
              disabled={voteLoading}
            >
              <ArrowDown className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium min-w-[2ch] text-center">
              {votes ? votes.downvotes : <span className="inline-block w-4 h-4 bg-muted rounded animate-pulse" />}
            </span>
          </div>
        </div>
        {/* Comments Section */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2">
            <Input
              className="flex-1"
              placeholder="Add a comment..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }}
              disabled={commentLoading}
            />
            <Button size="sm" onClick={handleAddComment} disabled={commentLoading || !comment.trim()}>
              Comment
            </Button>
          </div>
          {comments && comments.length > 0 && (
            <div className="space-y-2 mt-2">
              {comments.slice(0, 2).map((c: any) => (
                <div key={c._id} className="flex items-start gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback>{author?.name?.charAt(0) || author?.username?.charAt(0) || '?'}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-0.5">{new Date(c.createdAt).toLocaleString()}</div>
                    <div className="text-sm text-foreground/90">{c.content}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 