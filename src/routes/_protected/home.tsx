import { createFileRoute } from '@tanstack/react-router';
import { CreatePostButton } from '@/features/platform/post/CreatePostButton';
import { EmergingSpotlight } from '@/features/platform/post/EmergingSpotlight';
import { Feed } from '@/features/platform/post/Feed';
import { useState } from 'react';

export const Route = createFileRoute('/_protected/home')({
  component: HomePage,
});

function HomePage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === '' ? null : tag);
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="max-w-6xl w-full mx-auto">
        <div className="mb-6">
          <p className="text-muted-foreground text-lg">
            Stay updated with the latest posts and trending content
          </p>
        </div>
        
        {/* Main Feed: 3/4 width */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-[3] w-full space-y-6">
            <Feed selectedTag={selectedTag} onTagClick={handleTagClick} />
          </div>
          {/* Sidebar (desktop only): 1/4 width */}
          <div className="hidden lg:block flex-1 max-w-sm">
            <div className="sticky top-24 space-y-6 w-full">
              <EmergingSpotlight />
            </div>
          </div>
          {/* Mobile sidebar components */}
          <div className="block lg:hidden space-y-6 mt-8">
            <EmergingSpotlight />
          </div>
        </div>
      </div>
      <CreatePostButton />
    </div>
  );
}
