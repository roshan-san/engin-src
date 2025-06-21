import { query } from "../_generated/server";
import { v } from "convex/values";
import { getAuthenticatedProfile, getAuthenticatedUser } from "../helper";
import { getProfileByIdfn } from "./functions";
import { Id } from "../_generated/dataModel";





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

export const getConnection = query({
    args: {
        receiverId: v.id("profiles"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }
        const user = await ctx.db
            .query("profiles")
            .withIndex("email", (q) => q.eq("email", identity.email!))
            .first();
        if (!user) {
            return null;
        }
        const connection = await ctx.db
            .query("connections")
            .withIndex("by_sender", (q) =>
                q.eq("senderid", user._id)
            )
            .filter((q) => q.eq(q.field("receiverid"), args.receiverId))
            .first();
        if (connection) {
            return connection;
        }
        return await ctx.db
            .query("connections")
            .withIndex("by_receiver", (q) =>
                q.eq("receiverid", user._id)
            )
            .filter((q) => q.eq(q.field("senderid"), args.receiverId))
            .first();
    },
});
