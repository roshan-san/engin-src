import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/message")({
  component: MessagesIndex,
});

function MessagesIndex() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Select a chat to start messaging</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Your conversations will appear here.
        </p>
      </div>
    </div>
  );
} 