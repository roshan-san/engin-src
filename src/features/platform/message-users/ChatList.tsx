import type { Profile } from "@/types/supa-types";
import { useAcceptedConnections } from "../hooks/ConnectionHooks";

export default function ChatList({ profile }: { profile: Profile }) {
  const connection = useAcceptedConnections(profile.id) 
  console.log(connection.data)
  return (
    <div>
    {connection.isLoading ? (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="p-4 border rounded-lg animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    ) : connection.isError ? (
      <div>Error loading connections</div>
    ) : (
      <div className="space-y-2">
        {connection.data?.map((conn) => (
          <div 
            key={conn.id}
            className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <div className="font-medium">
              {conn.sender_id === profile.id ? conn.receiver_id : conn.sender_id}
            </div>
          </div>
        ))}
        {connection.data?.length === 0 && (
          <div className="text-center text-gray-500">
            No connections found
          </div>
        )}
      </div>
    )}
    </div>
  )
}
