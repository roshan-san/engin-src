import { api } from "@/../convex/_generated/api"
import { useQuery } from "convex/react"
import StartupCard from "../search-startups/StartupCard"
import { StartupCardSkeleton } from "./StartupCardSkeleton"

export function StartupLists() {
    const myStartups = useQuery(api.startups.queries.getMyStartups)

    if (myStartups === undefined) {
        return (
            <div className="h-full min-h-[300px] p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StartupCardSkeleton />
                <StartupCardSkeleton />
                <StartupCardSkeleton />
            </div>
        )
    }

    if (myStartups.length === 0) {
        return (
            <div className="flex items-center justify-center h-full min-h-[300px] p-4">
                <span className="text-gray-500 text-lg">No startups found.</span>
            </div>
        )
    }

    const adaptedStartups = myStartups.map((startup) => ({
        ...startup,
        id: startup._id,
        created_at: startup._creationTime,
    }))

    return (
        <div className="h-full min-h-[300px] p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adaptedStartups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
            ))}
        </div>
    )
}
