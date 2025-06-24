import Header from "@/features/platform/Header";
import MessagingUi from "@/features/platform/message-users/MessagingUi";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/message")({
  component: MessagesIndex,
});

function MessagesIndex() {
  return (
    <div className="flex-1 flex flex-col h-full min-h-0">
      <Header>Message</Header>
      <MessagingUi />
    </div>
  );
} 