import { createFileRoute } from '@tanstack/react-router'
import ViewProfile from '@/features/platform/view-profile/ViewProfile'
import { useUser } from '@/features/auth/UserContext'


export const Route = createFileRoute('/_protected/profile/$username')({
  component: ProfilePage
})

function ProfilePage() {
  const {profile} =useUser()
  return < ViewProfile profile={profile} />
}
