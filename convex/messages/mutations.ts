import { mutation } from "../_generated/server";
import { getAuthenticatedProfile } from "../helper";
import { v } from "convex/values";

export const sendMessage = mutation({
    args: {
        receiverId: v.id("profiles"),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            const myProfile = await getAuthenticatedProfile(ctx);
            await ctx.db.insert("messages", {
                senderId: myProfile._id,
                receiverId: args.receiverId,
                content: args.content,
                read: false,
                senderName: myProfile.name,
                senderAvatar: myProfile.avatar_url,
                senderUsername: myProfile.username,
            });
        } catch {
            throw new Error("You must be authenticated to send messages");
        }
    }
});

export const markMessagesAsRead = mutation({
    args: {
        senderId: v.id("profiles"),
    },
    handler: async (ctx, args) => {
        try {
            const myProfile = await getAuthenticatedProfile(ctx);

            // Mark all unread messages from this sender as read
            const unreadMessages = await ctx.db
                .query("messages")
                .withIndex("by_sender_receiver", (q) => 
                    q.eq("senderId", args.senderId).eq("receiverId", myProfile._id)
                )
                .filter((q) => q.eq(q.field("read"), false))
                .collect();

            // Update all unread messages
            for (const message of unreadMessages) {
                await ctx.db.patch(message._id, {
                    read: true,
                    readAt: Date.now(),
                });
            }
        } catch {
            throw new Error("You must be authenticated to mark messages as read");
        }
    }
});

export const updateOnlineStatus = mutation({
    args: {
        isOnline: v.boolean(),
    },
    handler: async (ctx, args) => {
        try {
            const myProfile = await getAuthenticatedProfile(ctx);

            // Check if online status record exists
            const existingStatus = await ctx.db
                .query("onlineStatus")
                .withIndex("by_user", (q) => q.eq("userId", myProfile._id))
                .first();

            if (existingStatus) {
                // Update existing record
                await ctx.db.patch(existingStatus._id, {
                    isOnline: args.isOnline,
                    lastSeen: Date.now(),
                });
            } else {
                // Create new record
                await ctx.db.insert("onlineStatus", {
                    userId: myProfile._id,
                    isOnline: args.isOnline,
                    lastSeen: Date.now(),
                });
            }
        } catch {
            // Silently ignore authentication errors for online status updates
            // This prevents the error from appearing in logs when users aren't authenticated
            console.log("Online status update skipped - user not authenticated");
        }
    }
});
