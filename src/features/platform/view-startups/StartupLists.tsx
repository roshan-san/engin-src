import { api } from "@/../convex/_generated/api"
import { useQuery } from "convex/react"
import StartupCard from "../search-startups/StartupCard"
import { StartupCardSkeleton } from "./StartupCardSkeleton"

export function StartupLists() {
    const myStartups = useQuery(api.startups.queries.getMyStartups)

    if (myStartups === undefined) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StartupCardSkeleton />
                <StartupCardSkeleton />
                <StartupCardSkeleton />
            </div>
        )
    }

    if (myStartups.length === 0) {
        return <div>No startups found.</div>
    }

    const adaptedStartups = myStartups.map((startup) => ({
        ...startup,
        id: startup._id,
        created_at: startup._creationTime,
    }))

    return (
        <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adaptedStartups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
            ))}
        </div>
    )
}
