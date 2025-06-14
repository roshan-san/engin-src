import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { getProfileByUsername } from '@/api/profile'
import ViewProfile from '@/features/platform/view-profile/ViewProfile'
import EditProfile from '@/features/platform/edit-profile/EditProfile'


export const Route = createFileRoute('/_p/profile/$username')({
  component: ProfilePage,
  loader: async ({ params }) => {
    const profile = await getProfileByUsername(params.username)
    return profile
  }
})

function ProfilePage() {
  const data = useLoaderData({ from: '/_p/profile/$username' })
  return < ViewProfile profile={data} />
}
