import { createFileRoute } from '@tanstack/react-router'
import ViewProfile from '@/features/platform/view-profile/ViewProfile'
import type { Profile } from '@/types/supa-types'


export const Route = createFileRoute('/_protected/profile/$username')({
  component: ProfilePage
})

function ProfilePage({profile}:{profile:Profile}) {
  return < ViewProfile profile={profile} />
}
