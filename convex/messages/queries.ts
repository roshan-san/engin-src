import { query } from "../_generated/server";
import { getAuthenticatedProfile } from "../helper";
import { v } from "convex/values";

export const getMyConnectedProfiles = query({
    handler:async (ctx) => {
        const myProfile = await getAuthenticatedProfile(ctx);

        const senderConnections = await ctx.db
            .query("connections")
            .withIndex("by_sender", (q) => q.eq("senderId", myProfile._id))
            .filter((q) => q.eq(q.field("status"), "accepted"))
            .collect();

        const receiverConnections = await ctx.db
            .query("connections")
            .withIndex("by_receiver", (q) => q.eq("receiverId", myProfile._id))
            .filter((q) => q.eq(q.field("status"), "accepted"))
            .collect();

        const connectedProfileIds = [
            ...senderConnections.map((c) => c.receiverId),
            ...receiverConnections.map((c) => c.senderId),
        ];

        const profiles = await Promise.all(
            connectedProfileIds.map((profileId) => ctx.db.get(profileId)),
        );

        return profiles.filter(Boolean);
    }
})

export const getProfileByUsername = query({
    args: {
        username: v.string(),
    },
    handler: async (ctx, args) => {
        const profile = await ctx.db
            .query("profiles")
            .filter((q) => q.eq(q.field("username"), args.username))
            .first();

        return profile;
    }
})

export const getMessages = query({
    args: {
        otherUserId: v.optional(v.id("profiles")),
    },
    handler: async (ctx, args) => {
        if (!args.otherUserId) {
            return [];
        }
        const myProfile = await getAuthenticatedProfile(ctx);
        const myId = myProfile._id;
        const otherUserId = args.otherUserId;

        const messages1 = await ctx.db
            .query("messages")
            .withIndex("by_sender_receiver", (q) => q.eq("senderId", myId).eq("receiverId", otherUserId))
            .collect();

        const messages2 = await ctx.db
            .query("messages")
            .withIndex("by_sender_receiver", (q) => q.eq("senderId", otherUserId).eq("receiverId", myId))
            .collect();

        const allMessages = [...messages1, ...messages2];

        const allMessagesWithSender = await Promise.all(
            allMessages.map(async (message) => {
                const sender = await ctx.db.get(message.senderId);
                return {
                    ...message,
                    sender,
                };
            })
        )

        return allMessagesWithSender.sort((a, b) => a._creationTime - b._creationTime);
    }
});