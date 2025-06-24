import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function ChatList() {
  const acceptedConnections = useQuery(api.messages.queries.getMyConnectedProfiles);
  const [search, setSearch] = useState("");
  const filtered = acceptedConnections?.filter((profile) =>
    profile?.name?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <Input
        placeholder="Search messages..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-2 rounded-full px-4 py-2 bg-background border border-border focus:ring-2 focus:ring-primary"
      />
      <div className="flex-1 overflow-y-auto">
        {filtered && filtered.length > 0 ? (
          <div className="flex flex-col gap-1">
            {filtered.map((profile, index) => (
              <Link key={profile?._id} to="/message/$username" params={{ username: profile?.username! }}>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer group">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback>{profile?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-semibold truncate group-hover:text-primary">{profile?.name}</span>
                    {/* Optionally add last message preview here */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">No chats yet.</div>
        )}
      </div>
    </div>
  );
} 