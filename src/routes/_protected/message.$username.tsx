import { createFileRoute } from "@tanstack/react-router";
import { ChatWindow } from "@/features/platform/message-users/ChatWindow";

export const Route = createFileRoute("/_protected/message/$username")({
  component: MessageRouteComponent,
});

function MessageRouteComponent() {
  const { username } = Route.useParams();
  return <ChatWindow username={username} />;
} 