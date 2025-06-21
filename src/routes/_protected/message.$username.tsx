import { useUser } from '@/features/authentication/UserContext'
import { ChatComponent } from '@/features/platform/message-users/ChatComponent'
import { createFileRoute } from '@tanstack/react-router'
import { api } from '@/../convex/_generated/api'
import { useQuery } from 'convex/react'

export const Route = createFileRoute('/_protected/message/$username')({
  component: RouteComponent,
})

function RouteComponent() {
  const {username} = Route.useParams()
  const profile = useUser().profile
  const partner = useQuery(api.profile.queries.getProfileByUsername,{
    username:username
  })
  return (
    <ChatComponent myprofile ={profile}  partner={partner}/>
  )
}
