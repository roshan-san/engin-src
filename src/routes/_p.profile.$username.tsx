import { useProfile } from '@/features/authentication/store/authStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_p/profile/$username')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading, error } = useProfile()
  const { username } = Route.useParams();

  if (isLoading) {
    return <div>Loading profile...</div>
  }

  if (error) {
    return <div>Error loading profile: {error.message}</div>
  }

  if (!data) {
    return <div>No profile data found</div>
  }

  return (
    <div>
      {data.username === username ? (
        <div>This is your profile</div>
      ) : (
        <div>This is someone else's profile</div>
      )}
    </div>
  )
}
