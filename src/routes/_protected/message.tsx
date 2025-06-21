import Header from "@/features/platform/Header";
import MessagingUi from "@/features/platform/message-users/MessagingUi";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/message")({
  component: MessagesIndex,
});

function MessagesIndex() {
  return (
  <div className="h-full flex flex-col p-4">
    <Header>Message</Header>
    <MessagingUi />
  </div>
  );
} 