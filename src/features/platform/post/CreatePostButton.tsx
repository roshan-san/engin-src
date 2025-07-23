import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
  DrawerDescription
} from '@/components/ui/drawer';

export function CreatePostButton() {
  const createPost = useMutation(api.posts.mutations.createPost);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCreatePost = async () => {
    setLoading(true);
    await createPost({
      title,
      content,
      tags: tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
    });
    setTitle('');
    setContent('');
    setTags('');
    setOpen(false);
    setLoading(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="fixed bottom-24 right-8 z-50 rounded-full"
          variant="default"
          size="icon"
          aria-label="Create post"
        >
          +
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full sm:max-w-xl sm:mx-auto p-0" aria-describedby={undefined}>
        <DrawerHeader>
          <DrawerTitle className="text-base font-medium">Create Post</DrawerTitle>
          <DrawerDescription>Fill in the title, content, and tags to create a new post.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4 flex flex-col gap-2">
          <Input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={loading}
          />
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={loading}
          />
          <Input
            placeholder="Tags (comma separated, e.g. #Research, #Data Science)"
            value={tags}
            onChange={e => setTags(e.target.value)}
            disabled={loading}
          />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost" disabled={loading}>Cancel</Button>
          </DrawerClose>
          <Button onClick={handleCreatePost} disabled={loading || !title || !content}>
            {loading ? 'Posting...' : 'Post'}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
} 