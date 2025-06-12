import { getConnections } from "@/api/connection"
import type { Profile } from "@/types/supa-types"
import { useQuery } from "@tanstack/react-query"

export default function Connections({ profile }: { profile: Profile }) {
    const { data: connections, isLoading: isLoadingConnections } = useQuery({
        queryKey: ['connections', profile.id],
        queryFn: () => getConnections(profile.id),
        enabled: !!profile.id
    })
  return (
    <div>
        {isLoadingConnections ? (
            [...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-24 bg-gray-200 rounded-lg"></div>
                </div>
              ))
        ) : connections && connections.length === 0 ? (
            <div>No connections yet</div>
        ) : (
            <div>
                {connections?.map((connection) => 
                    connection.status === 'accepted' && (
                      <div key={connection.id}>
                        {connection.sender_id === profile.id 
                          ? connection.receiver_id 
                          : connection.sender_id}
                      </div>
                    )
                )}     
            </div>
        )}
    </div>
  )
}
