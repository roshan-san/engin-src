import Header from '@/features/platform/Header'
import ChatList from '@/features/platform/message-users/ChatList'
import MessagingUi from '@/features/platform/message-users/MessagingUi'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/message')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-full flex flex-col p-4 gap-12">
      <Header>Message</Header>
      <MessagingUi/>
    </div>
  )
}
