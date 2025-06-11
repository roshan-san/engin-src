import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Github, Linkedin, Loader2 } from 'lucide-react'
import type { Profile } from '@/utils/supa-types'
import supabase from '@/utils/supabase'
import { useState } from 'react'

const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().optional(),
  location: z.string().optional(),
  github_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  linkedin_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  work_type: z.enum(['Full-Time', 'Part-Time', 'Contract']),
  user_type: z.enum(['Creator/Collaborator', 'Investor', 'Mentor']),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface EditableProfileViewProps {
  profile: Profile
}

export function EditableProfileView({ profile }: EditableProfileViewProps) {
  const queryClient = useQueryClient()
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile.full_name,
      bio: profile.bio || '',
      location: profile.location || '',
      github_url: profile.github_url || '',
      linkedin_url: profile.linkedin_url || '',
      skills: profile.skills || [],
      interests: profile.interests || [],
      work_type: profile.work_type as 'Full-Time' | 'Part-Time' | 'Contract',
      user_type: profile.user_type as 'Creator/Collaborator' | 'Investor' | 'Mentor',
    },
  })

  const updateProfile = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', profile.id)
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profile.id] })
      queryClient.invalidateQueries({ queryKey: ['profile-search'] })
      setNotification({ type: 'success', message: 'Profile updated successfully' })
      setTimeout(() => setNotification(null), 3000)
    },
    onError: (error) => {
      setNotification({ type: 'error', message: 'Failed to update profile' })
      console.error('Update error:', error)
      setTimeout(() => setNotification(null), 3000)
    },
  })

  const onSubmit = (data: ProfileFormData) => {
    updateProfile.mutate(data)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {notification && (
        <div className={`p-4 rounded-md ${
          notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {notification.message}
        </div>
      )}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500" />
        <CardHeader className="relative">
          <div className="absolute -top-16 left-6">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
              <AvatarFallback>{profile.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-16">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    {...register('full_name')}
                    className={errors.full_name ? 'border-red-500' : ''}
                  />
                  {errors.full_name && (
                    <p className="text-sm text-red-500">{errors.full_name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    {...register('bio')}
                    className={errors.bio ? 'border-red-500' : ''}
                  />
                  {errors.bio && (
                    <p className="text-sm text-red-500">{errors.bio.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      {...register('location')}
                      className={errors.location ? 'border-red-500' : ''}
                    />
                  </div>
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="work_type">Work Type</Label>
                  <Select
                    defaultValue={profile.work_type}
                    onValueChange={(value: 'Full-Time' | 'Part-Time' | 'Contract') => setValue('work_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-Time">Full-Time</SelectItem>
                      <SelectItem value="Part-Time">Part-Time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="user_type">User Type</Label>
                  <Select
                    defaultValue={profile.user_type}
                    onValueChange={(value: 'Creator/Collaborator' | 'Investor' | 'Mentor') => setValue('user_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Creator/Collaborator">Creator/Collaborator</SelectItem>
                      <SelectItem value="Investor">Investor</SelectItem>
                      <SelectItem value="Mentor">Mentor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="github_url"
                      {...register('github_url')}
                      className={errors.github_url ? 'border-red-500' : ''}
                    />
                  </div>
                  {errors.github_url && (
                    <p className="text-sm text-red-500">{errors.github_url.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="linkedin_url"
                      {...register('linkedin_url')}
                      className={errors.linkedin_url ? 'border-red-500' : ''}
                    />
                  </div>
                  {errors.linkedin_url && (
                    <p className="text-sm text-red-500">{errors.linkedin_url.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    {...register('skills')}
                    placeholder="e.g. React, TypeScript, Node.js"
                    onChange={(e) => {
                      const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      setValue('skills', skills)
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="interests">Interests (comma-separated)</Label>
                  <Input
                    id="interests"
                    {...register('interests')}
                    placeholder="e.g. AI, Web Development, Design"
                    onChange={(e) => {
                      const interests = e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      setValue('interests', interests)
                    }}
                  />
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </form>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
} 