import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Doc } from "@/../convex/_generated/dataModel";

export function ChatHeader({
    chatPartner,
}: {
    chatPartner: Doc<"profiles">
}) {
    return (
        <div className="flex items-center p-4 border-b">
            <Avatar className="w-10 h-10 mr-4">
                <AvatarImage src={chatPartner?.avatar_url!} alt={chatPartner?.name!} />
                <AvatarFallback>{chatPartner?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{chatPartner?.name}</h2>
            <p className="ml-2 text-sm text-gray-500">( {chatPartner.username})</p>
        </div>
    );
}
