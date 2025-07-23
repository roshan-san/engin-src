import { useState, useRef } from 'react';
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
import { Plus, Hash, Image, X, Upload, AlertCircle, Loader2 } from 'lucide-react';

export function CreatePostButton() {
  const createPost = useMutation(api.posts.mutations.createPost);
  const generateUploadUrl = useMutation(api.posts.mutations.generateUploadUrl);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<'title' | 'content' | 'image' | 'tags'>('title');
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreatePost = async () => {
    setLoading(true);
    await createPost({
      title,
      content,
      tags: tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      imageUrl: imageUrl || undefined,
    });
    setTitle('');
    setContent('');
    setTags('');
    setImageUrl('');
    setImagePreviewUrl('');
    setCurrentTab('title');
    setOpen(false);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: 'title' | 'content' | 'image' | 'tags') => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (field === 'title' && title.trim()) {
        setCurrentTab('content');
      } else if (field === 'content' && content.trim()) {
        setCurrentTab('image');
      } else if (field === 'image') {
        setCurrentTab('tags');
      } else if (field === 'tags' && (title.trim() && content.trim())) {
        handleCreatePost();
      }
    }
  };

  const clearImage = () => {
    setImageUrl('');
    setImagePreviewUrl('');
    setUploadError('');
  };

  const handleFileUpload = async (file: File) => {
    setUploadError('');
    setUploading(true);
    
    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      setUploading(false);
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      setUploading(false);
      return;
    }

    try {
      // Generate upload URL
      const uploadUrl = await generateUploadUrl();
      
      // Upload file to Convex storage
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error('Upload failed');
      }

      const { storageId } = await result.json();
      
      // Store the storage ID as the image URL (Convex will handle the URL generation)
      setImageUrl(storageId);
      setImagePreviewUrl(URL.createObjectURL(file));
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="fixed bottom-24 right-8 z-50 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
          variant="default"
          size="icon"
          aria-label="Create post"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full sm:max-w-xl sm:mx-auto" aria-describedby={undefined}>
        <DrawerHeader className="border-b">
          <DrawerTitle className="text-lg font-medium">Create Post</DrawerTitle>
          <DrawerDescription className="text-sm text-muted-foreground">
            Share your thoughts with the community
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-6 py-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Input
              placeholder="What's happening?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => handleKeyDown(e, 'title')}
              disabled={loading}
              autoFocus={currentTab === 'title'}
              className="text-lg font-medium border-0 p-0 focus:ring-0 placeholder:text-muted-foreground"
            />
          </div>
          
          {/* Content */}
          <div className="space-y-2">
            <Textarea
              placeholder="Share your thoughts..."
              value={content}
              onChange={e => setContent(e.target.value)}
              onKeyDown={e => handleKeyDown(e, 'content')}
              disabled={loading}
              autoFocus={currentTab === 'content'}
              className="min-h-[120px] text-base border-0 p-0 focus:ring-0 placeholder:text-muted-foreground resize-none"
            />
          </div>
          
          {/* Image Upload */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Add Image</span>
            </div>
            
            {/* File Upload */}
            <div
              className={`border border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => !uploading && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                disabled={uploading}
              />
              {uploading ? (
                <Loader2 className="w-6 h-6 mx-auto mb-2 text-muted-foreground animate-spin" />
              ) : (
                <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              )}
              <p className="text-sm text-muted-foreground mb-1">
                {uploading ? 'Uploading...' : 'Drag & drop or click to upload'}
              </p>
              <p className="text-xs text-muted-foreground">
                Max 5MB • JPG, PNG, GIF, WebP
              </p>
            </div>
            
            {uploadError && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <span className="text-sm text-destructive">{uploadError}</span>
              </div>
            )}
          </div>
          
          {/* Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Add tags (comma separated)"
                value={tags}
                onChange={e => setTags(e.target.value)}
                onKeyDown={e => handleKeyDown(e, 'tags')}
                disabled={loading}
                autoFocus={currentTab === 'tags'}
                className="border-0 p-0 focus:ring-0 placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          {/* Image Preview */}
          {imagePreviewUrl && (
            <div className="relative rounded-lg overflow-hidden border">
              <img 
                src={imagePreviewUrl} 
                alt="Preview" 
                className="w-full max-h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <Button
                size="sm"
                variant="destructive"
                onClick={clearImage}
                className="absolute top-2 right-2 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        
        <DrawerFooter className="border-t">
          <div className="flex items-center justify-between w-full">
            <DrawerClose asChild>
              <Button variant="ghost" disabled={loading}>
                Cancel
              </Button>
            </DrawerClose>
            <Button 
              onClick={handleCreatePost} 
              disabled={loading || !title || !content}
              className="px-6"
            >
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
} 