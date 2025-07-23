import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import type { Doc } from '@/../convex/_generated/dataModel';
import { PostCard } from '@/features/platform/post/PostCard';
import { CreatePostButton } from '@/features/platform/post/CreatePostButton';
import { EmergingSpotlight } from '@/features/platform/landing/EmergingSpotlight';

export const Route = createFileRoute('/_protected/home')({
  component: HomePage,
});

function HomePage() {
  const posts = useQuery(api.posts.queries.listPosts);

  return (
    <div className="relative min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 pt-6">
        {/* Main Feed */}
        <div className="flex-1 max-w-xl mx-auto space-y-4">
          {posts?.length === 0 && <div className="text-center text-muted-foreground">No posts yet.</div>}
          {posts?.map((post: Doc<'posts'>) => (
            <PostCard key={post._id} post={post} />
          ))}
          {/* Mobile: show EmergingSpotlight in feed */}
          <div className="block md:hidden">
            <EmergingSpotlight />
          </div>
        </div>
        {/* Sidebar (desktop only) */}
        <div className="hidden md:block w-full max-w-xs flex-shrink-0">
          <EmergingSpotlight />
          {/* You can add more sidebar cards here */}
        </div>
      </div>
      <CreatePostButton />
    </div>
  );
}
