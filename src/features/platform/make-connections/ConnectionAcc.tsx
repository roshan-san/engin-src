import { api } from "@/../convex/_generated/api"
import { useQuery } from "convex/react"

export  function ConnectionAcc() {
    const connections =useQuery(api.connections.queries.getMyAcceptedConnections) 
    console.log(connections)
  return (
    <div>
        {connections?.map((connection) => (
            <div key={connection._id}>{JSON.stringify(connection)}</div>
        ))}
    </div>
  )
}
