import { createFileRoute } from '@tanstack/react-router'
import ViewProfile from '@/features/platform/view-profile/ViewProfile'
import { useMe } from '@/features/authentication/contexts/AuthContext'


export const Route = createFileRoute('/_protected/profile/$username')({
  component: ProfilePage
})

function ProfilePage() {
  const {profile} =useMe()
  return < ViewProfile profile={profile} />
}
