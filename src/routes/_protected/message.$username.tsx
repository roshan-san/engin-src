import { createFileRoute } from '@tanstack/react-router'
import { ChatWindow } from '@/features/platform/message-users/ChatWindow'

export const Route = createFileRoute('/_protected/message/$username')({
  component: RouteComponent,
})

function RouteComponent({ params }: { params: { username: string } }) {
  return <ChatWindow username={params.username} />
} 