import { createFileRoute } from "@tanstack/react-router";
import MessagingUi from "@/features/platform/message-users/MessagingUi";

export const Route = createFileRoute("/_protected/messages")({
  component: MessagingUi,
}); 