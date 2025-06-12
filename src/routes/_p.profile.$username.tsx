
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import ProfileView from '@/features/platform/profile/EditProfile'
import { getProfileByUsername } from '@/api/profile'


export const Route = createFileRoute('/_p/profile/$username')({
  component: ProfilePage,
  loader: async ({ params }) => {
    const profile = await getProfileByUsername(params.username)
    return profile
  }
})

function ProfilePage() {
  const data = useLoaderData({ from: '/_p/profile/$username' })
  return <ProfileView profile={data} />
}
