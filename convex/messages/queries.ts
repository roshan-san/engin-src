import { query } from "../_generated/server";
import { getAuthenticatedProfile } from "../helper";
import { v } from "convex/values";

export const getMyConnectedProfiles = query({
    handler:async (ctx) => {
        const myProfile = await getAuthenticatedProfile(ctx);

        const senderConnections = await ctx.db
            .query("connections")
            .withIndex("by_sender", (q) => q.eq("senderid", myProfile._id))
            .filter((q) => q.eq(q.field("status"), "accepted"))
            .collect();

        const receiverConnections = await ctx.db
            .query("connections")
            .withIndex("by_receiver", (q) => q.eq("receiverid", myProfile._id))
            .filter((q) => q.eq(q.field("status"), "accepted"))
            .collect();

        const connectedProfileIds = [
            ...senderConnections.map((c) => c.receiverid),
            ...receiverConnections.map((c) => c.senderid),
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

        // No need to fetch sender profile, info is in the message
        return [...messages1, ...messages2].sort((a, b) => a._creationTime - b._creationTime);
    }
});

export const getConnectedProfilesById = query({
    args: {
        profileId: v.id("profiles"),
    },
    handler: async (ctx, args) => {
        const profile = await ctx.db.get(args.profileId);
        if (!profile) return [];

        const senderConnections = await ctx.db
            .query("connections")
            .withIndex("by_sender", (q) => q.eq("senderid", profile._id))
            .filter((q) => q.eq(q.field("status"), "accepted"))
            .collect();

        const receiverConnections = await ctx.db
            .query("connections")
            .withIndex("by_receiver", (q) => q.eq("receiverid", profile._id))
            .filter((q) => q.eq(q.field("status"), "accepted"))
            .collect();

        const connectedProfileIds = [
            ...senderConnections.map((c) => c.receiverid),
            ...receiverConnections.map((c) => c.senderid),
        ];

        const profiles = await Promise.all(
            connectedProfileIds.map((profileId) => ctx.db.get(profileId)),
        );

        return profiles.filter(Boolean);
    }
});

export const getUnreadMessagesCount = query({
    handler: async (ctx) => {
        const myProfile = await getAuthenticatedProfile(ctx);
        const myId = myProfile._id;

        // Get all unread messages where the current user is the receiver
        const unreadMessages = await ctx.db
            .query("messages")
            .withIndex("by_receiver", (q) => q.eq("receiverId", myId))
            .filter((q) => q.eq(q.field("read"), false))
            .collect();

        return unreadMessages.length;
    }
});

export const getOnlineStatus = query({
    args: {
        userId: v.id("profiles"),
    },
    handler: async (ctx, args) => {
        const status = await ctx.db
            .query("onlineStatus")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .first();

        if (!status) {
            return { isOnline: false, lastSeen: Date.now() };
        }

        // Consider user offline if they haven't been seen in the last 5 minutes
        const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
        const isCurrentlyOnline = status.isOnline && status.lastSeen > fiveMinutesAgo;

        return {
            isOnline: isCurrentlyOnline,
            lastSeen: status.lastSeen,
        };
    }
});

export const getChatSummaries = query({
  handler: async (ctx) => {
    const myProfile = await getAuthenticatedProfile(ctx);
    const myId = myProfile._id;

    // Get all connected profiles
    const senderConnections = await ctx.db
      .query("connections")
      .withIndex("by_sender", (q) => q.eq("senderid", myId))
      .filter((q) => q.eq(q.field("status"), "accepted"))
      .collect();
    const receiverConnections = await ctx.db
      .query("connections")
      .withIndex("by_receiver", (q) => q.eq("receiverid", myId))
      .filter((q) => q.eq(q.field("status"), "accepted"))
      .collect();
    const connectedProfileIds = [
      ...senderConnections.map((c) => c.receiverid),
      ...receiverConnections.map((c) => c.senderid),
    ];

    // For each profile, get last message and unread status
    const summaries = await Promise.all(
      connectedProfileIds.map(async (profileId) => {
        const profile = await ctx.db.get(profileId);
        if (!profile) return null;

        // Get last message between me and this profile
        const sent = await ctx.db
          .query("messages")
          .withIndex("by_sender_receiver", (q) => q.eq("senderId", myId).eq("receiverId", profileId))
          .order("desc")
          .take(1);
        const received = await ctx.db
          .query("messages")
          .withIndex("by_sender_receiver", (q) => q.eq("senderId", profileId).eq("receiverId", myId))
          .order("desc")
          .take(1);
        const lastMessage = [...sent, ...received].sort((a, b) => b._creationTime - a._creationTime)[0];

        // Unread if there is any message from them to me that is not read
        const unread = await ctx.db
          .query("messages")
          .withIndex("by_sender_receiver", (q) => q.eq("senderId", profileId).eq("receiverId", myId))
          .filter((q) => q.eq(q.field("read"), false))
          .take(1);
        const hasUnread = unread.length > 0;

        return {
          profile,
          lastMessage: lastMessage
            ? {
                content: lastMessage.content,
                senderId: lastMessage.senderId,
                read: lastMessage.read,
                _creationTime: lastMessage._creationTime,
              }
            : null,
          hasUnread,
        };
      })
    );

    // Remove nulls and sort by last message time (descending)
    const nonNullSummaries = summaries.filter((s) => s !== null);
    return nonNullSummaries.sort((a, b) => {
      if (!a.lastMessage && !b.lastMessage) return 0;
      if (!a.lastMessage) return 1;
      if (!b.lastMessage) return -1;
      return b.lastMessage._creationTime - a.lastMessage._creationTime;
    });
  },
});