import { useProfile } from '@/features/authentication/store/authStore'
import { createFileRoute } from '@tanstack/react-router'
import { PublicProfileView } from '@/features/profile/components/PublicProfileView'
import { EditableProfileView } from '@/features/profile/components/EditableProfileView'
import { useQuery } from '@tanstack/react-query'
import supabase from '@/utils/supabase'
import type { Profile } from '@/utils/supa-types'

export const Route = createFileRoute('/_p/profile/$username')({
  component: ProfilePage,
})

function ProfilePage() {
  const { username } = Route.useParams()
  const { data: currentUserProfile } = useProfile()

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single()
      
      if (error) throw error
      return data as Profile
    },
  })

  if (isLoading) {
    return <div>Loading profile...</div>
  }

  if (!profileData) {
    return <div>Profile not found</div>
  }

  const isOwnProfile = currentUserProfile?.username === username

  return isOwnProfile ? (
    <EditableProfileView profile={profileData} />
  ) : (
    <PublicProfileView profile={profileData} />
  )
}
