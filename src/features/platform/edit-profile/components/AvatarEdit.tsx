import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Camera, Loader2 } from 'lucide-react'
import type { Profile } from '@/types/supa-types'
import { useProfileAvatar } from '../hooks/useProfileAvatar'

export function AvatarEditor({ profile }: { profile: Profile }) {
  const { selectedFile, previewUrl, isUploading, handleFileChange, handleAvatarUpload } = useProfileAvatar(profile)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="relative group cursor-pointer border-4 border-background shadow-xl">
          <CardContent className="p-0">
            <Avatar className="h-40 w-40">
              <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
              <AvatarFallback className="text-2xl">{profile.full_name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-10 w-10 text-white" />
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
        </DialogHeader>
        <CardContent className="space-y-6 py-4">
          <div className="flex flex-col items-center gap-6">
            {previewUrl ? (
              <Avatar className="h-32 w-32">
                <AvatarImage src={previewUrl} alt="Preview" />
              </Avatar>
            ) : (
              <Avatar className="h-32 w-32">
                <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                <AvatarFallback>{profile.full_name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full max-w-xs cursor-pointer"
            />
          </div>
          <Button
            onClick={handleAvatarUpload}
            disabled={!selectedFile || isUploading}
            variant="default"
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              'Upload Avatar'
            )}
          </Button>
        </CardContent>
      </DialogContent>
    </Dialog>
  )
} 