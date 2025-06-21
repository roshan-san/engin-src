import { query } from "../_generated/server";
import { v } from "convex/values";
import { getAuthenticatedProfile, getAuthenticatedUser } from "../helper";
import { getProfileByIdfn } from "./functions";


export const getMyAcceptedConnections = query({
    handler: async (ctx) => {
        const profile = await getAuthenticatedProfile(ctx)
        const connections = await ctx.db
            .query("connections")
            .withIndex("by_sender", (q) => q.eq("senderid", profile._id))
            .filter((q) => q.eq(q.field("status"), "accepted"))
            .collect();

        const connections2 = await ctx.db
            .query("connections")
            .withIndex("by_receiver", (q) => q.eq("receiverid", profile._id))
            .filter((q) => q.eq(q.field("status"), "accepted"))
            .collect();
        return [...connections, ...connections2];
    },
});

export const getAcceptedConnectionsById = query({
    args:{
        profileId:v.id("profiles")
    },
    handler: async (ctx, args) => {
        const profile = await getProfileByIdfn(ctx,args.profileId)

        if(!profile) return []

        const connections = await ctx.db
            .query("connections")
            .withIndex("by_sender", (q) => q.eq("senderid", profile._id))
            .filter((q) => q.eq(q.field("status"), "accepted"))
            .collect();

        const connections2 = await ctx.db
            .query("connections")
            .withIndex("by_receiver", (q) => q.eq("receiverid", profile._id))
            .filter((q) => q.eq(q.field("status"), "accepted"))
            .collect();
        return [...connections, ...connections2];
    },
});

export const getConnectionStatus = query({
    args:{
        receiverId: v.id("profiles")
    },
    handler: async (ctx, args) => {
        const sender = await getAuthenticatedProfile(ctx)

        const connection = await ctx.db
            .query("connections")
            .withIndex("by_sender_receiver", q => q.eq("senderid", sender._id).eq("receiverid", args.receiverId))
            .first()
        
        if (connection) {
            return connection;
        }

        const connection2 = await ctx.db
            .query("connections")
            .withIndex("by_sender_receiver", q => q.eq("senderid", args.receiverId).eq("receiverid", sender._id))
            .first()

        return connection2;
    }
})

export const getMyPendingConnections = query({
    handler: async (ctx) => {
        const profile = await getAuthenticatedProfile(ctx)
        const connections = await ctx.db
            .query("connections")
            .withIndex("by_receiver", (q) => q.eq("receiverid", profile._id))
            .filter((q) => q.eq(q.field("status"), "pending"))
            .collect();
        return connections;
    },
});
