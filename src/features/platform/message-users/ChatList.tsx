import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";


export function ChatList() {
 const acceptedConnections =useQuery(api.messages.queries.getMyConnectedProfiles)
  return (
      <div>
        {acceptedConnections && acceptedConnections.length > 0 ? (
          <div className="flex flex-col">
            {acceptedConnections.map((profile, index) => (
              <div key={profile?._id}>
                <Link to="/message/$username" params={{ username: profile?.username! }}>
                  <div
                    className="flex items-center gap-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Avatar>
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback>{profile?.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{profile?.name}</div>
                  </div>
                </Link>
                {index < acceptedConnections.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">No chats yet.</div>
        )}
      </div>
)} 