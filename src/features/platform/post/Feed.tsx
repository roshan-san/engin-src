import { useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import type { Doc } from '@/../convex/_generated/dataModel';
import { PostCard } from './PostCard';
import { EmergingSpotlight } from '@/features/platform/post/EmergingSpotlight';

export function Feed() {
  const posts = useQuery(api.posts.queries.listPosts);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground mb-4">Latest Posts</h2>
      {posts?.length === 0 && <div className="text-center text-muted-foreground">No posts yet.</div>}
      {posts?.map((post: Doc<'posts'>) => (
        <PostCard key={post._id} post={post} />
      ))}
      {/* Mobile: show EmergingSpotlight in feed */}
      <div className="block md:hidden mt-8">
        <EmergingSpotlight />
      </div>
    </div>
  );
} 