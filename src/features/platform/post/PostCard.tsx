import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import type { Doc } from "@/../convex/_generated/dataModel";

interface PostCardProps {
  post: Doc<"posts">;
  authorProfile: Doc<"profiles"> | null;
}

export function PostCard({ post, authorProfile }: PostCardProps) {
  const votes = useQuery(api.posts.queries.getPostVotes, { postId: post._id });
  const comments = useQuery(api.posts.queries.getPostComments, { postId: post._id });

  const handleVote = async (voteType: 1 | -1) => {
    try {
      // Add vote mutation call here
      console.log(`Voting ${voteType} for post ${post._id}`);
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  const handleComment = () => {
    // Add comment functionality here
    console.log("Comment on post:", post._id);
  };

  const handleShare = () => {
    // Add share functionality here
    console.log("Share post:", post._id);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={authorProfile?.avatar_url} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {authorProfile?.name?.charAt(0) || authorProfile?.username?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              by {authorProfile?.name || authorProfile?.username || "Unknown User"}
            </p>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed">{post.content}</p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote(1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary"
            >
              <Heart className="h-4 w-4" />
              <span className="text-sm">{votes ? (votes.upvotes + votes.downvotes) : 0}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleComment}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{comments?.length || 0}</span>
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <Share2 className="h-4 w-4" />
            <span className="text-sm">Share</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 