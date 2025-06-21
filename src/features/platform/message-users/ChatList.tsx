import { Link } from "@tanstack/react-router";

// Mock data for chat list
const chats = [
  { id: "1", name: "Alice", lastMessage: "Hey, how are you?" },
  { id: "2", name: "Bob", lastMessage: "See you tomorrow!" },
  { id: "3", name: "Charlie", lastMessage: "Sounds good." },
];

export function ChatList() {
  return (
    <div className="border-r border-gray-200 dark:border-gray-800 h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold">Chats</h2>
      </div>
      <nav className="flex flex-col p-2">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            to="/messages/$chatId"
            params={{ chatId: chat.id }}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            activeProps={{
              className: "bg-gray-100 dark:bg-gray-800 font-semibold",
            }}
          >
            <div className="font-semibold">{chat.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {chat.lastMessage}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
} 