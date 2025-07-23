import type { Doc } from '@/../convex/_generated/dataModel';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from '@tanstack/react-router';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import { ArrowUp, ArrowDown, CheckCircle, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface PostCardProps {
  post: Doc<'posts'>;
  onTagClick?: (tag: string) => void;
}

export function PostCard({ post, onTagClick }: PostCardProps) {
  const navigate = useNavigate();
  const author = useQuery(api.profile.queries.getProfileById, { profileId: post.authorId });
  const votes = useQuery(api.posts.queries.getPostVotes, { postId: post._id });
  const comments = useQuery(api.posts.queries.getPostComments, { postId: post._id });
  const imageUrl = post.imageUrl ? useQuery(api.posts.queries.getFileUrl, { 
    storageId: post.imageUrl as any
  }) : null;
  const upvotePost = useMutation(api.posts.mutations.upvotePost);
  const downvotePost = useMutation(api.posts.mutations.downvotePost);
  const addComment = useMutation(api.posts.mutations.addComment);
  const [comment, setComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Get comment authors
  const commentAuthorIds = comments?.map(c => c.userId) || [];
  const commentAuthors = useQuery(api.profile.queries.getProfilesByIds, { 
    ids: commentAuthorIds 
  });

  const getCommentAuthor = (userId: string) => {
    return commentAuthors?.find(author => author?._id === userId);
  };

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

  const handleCommentAuthorClick = (username: string) => {
    navigate({ to: '/profile/$username', params: { username } });
  };

  return (
    <div className="bg-background border border-border rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <Avatar className="h-10 w-10">
          {author?.avatar_url ? (
            <AvatarImage src={author.avatar_url} alt={author.name || author.username || 'User'} />
          ) : null}
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {author?.name?.charAt(0) || author?.username?.charAt(0) || '?'}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base truncate">
                {author ? author.name : <span className="bg-muted rounded w-16 h-4 animate-pulse inline-block" />}
              </span>
              <CheckCircle className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          {author?.user_type && (
            <div className="text-xs text-muted-foreground">{author.user_type}</div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <div className="text-base leading-relaxed text-foreground/90 whitespace-pre-line">
          {post.content}
        </div>
        
        {imageUrl && (
          <div className="mt-3 rounded-xl overflow-hidden border border-border/50">
            <img 
              src={imageUrl} 
              alt="Post media" 
              className="w-full max-h-96 object-cover cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => window.open(imageUrl, '_blank')}
            />
          </div>
        )}
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-primary/10 text-primary border-primary/20"
                onClick={() => onTagClick?.(tag) || navigate({ to: '/startups' })}
              >
                {tag.startsWith('#') ? tag : `#${tag}`}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
              aria-label="Upvote"
              onClick={handleUpvote}
              disabled={voteLoading}
            >
              <ArrowUp className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium min-w-[2ch] text-center">
              {votes ? votes.upvotes : <span className="inline-block w-4 h-4 bg-muted rounded animate-pulse" />}
            </span>
            <button
              className="p-2 rounded-full hover:bg-red-100 text-muted-foreground hover:text-red-600 transition-colors disabled:opacity-50"
              aria-label="Downvote"
              onClick={handleDownvote}
              disabled={voteLoading}
            >
              <ArrowDown className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium min-w-[2ch] text-center">
              {votes ? votes.downvotes : <span className="inline-block w-4 h-4 bg-muted rounded animate-pulse" />}
            </span>
          </div>
          
          <button
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">{comments?.length || 0}</span>
            {comments && comments.length > 0 && (
              showComments ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-border/30">
          <div className="flex items-center gap-2 mb-3">
            <Input
              className="flex-1 bg-muted/30 border-border focus:ring-2 focus:ring-primary/20"
              placeholder="Add a comment..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }}
              disabled={commentLoading}
            />
            <Button 
              size="sm" 
              onClick={handleAddComment} 
              disabled={commentLoading || !comment.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              {commentLoading ? 'Posting...' : 'Reply'}
            </Button>
          </div>
          
          {comments && comments.length > 0 && (
            <div className="space-y-3">
              {comments.map((c: any) => {
                const commentAuthor = getCommentAuthor(c.userId);
                return (
                  <div key={c._id} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                    <Avatar className="h-6 w-6">
                      {commentAuthor?.avatar_url ? (
                        <AvatarImage src={commentAuthor.avatar_url} alt={commentAuthor.name || commentAuthor.username || 'User'} />
                      ) : null}
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {commentAuthor?.name?.charAt(0) || commentAuthor?.username?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <button
                          className="text-xs font-medium text-primary hover:underline cursor-pointer"
                          onClick={() => commentAuthor?.username && handleCommentAuthorClick(commentAuthor.username)}
                        >
                          {commentAuthor ? (commentAuthor.name || commentAuthor.username || 'Unknown') : 'Loading...'}
                        </button>
                        <span className="text-xs text-muted-foreground">
                          {new Date(c.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="text-sm text-foreground/90">{c.content}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 