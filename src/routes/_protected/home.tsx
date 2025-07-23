import { createFileRoute } from '@tanstack/react-router';
import { CreatePostButton } from '@/features/platform/post/CreatePostButton';
import { EmergingSpotlight } from '@/features/platform/post/EmergingSpotlight';
import { Feed } from '@/features/platform/post/Feed';

export const Route = createFileRoute('/_protected/home')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="relative min-h-screen bg-background p-5">
      {/* Main Feed: 3/4 width */}
      <div className="container mx-auto flex flex-col md:flex-row gap-8 ">
        <div className="flex-[3] w-full space-y-6">
          <Feed />
        </div>
        {/* Sidebar (desktop only): 1/4 width */}
        <div className="hidden md:block flex-1">
          <div className="sticky top-24 space-y-6">
            <EmergingSpotlight />
          </div>
        </div>
      </div>
      <CreatePostButton />
    </div>
  );
}
