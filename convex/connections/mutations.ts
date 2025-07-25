import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { getAuthenticatedProfile } from "../helper";

export const updateConnectionStatus = mutation({
  args: {
    connectionId: v.id("connections"),
    status: v.union(v.literal("accepted"), v.literal("declined")),
  },
  handler: async (ctx, args) => {
    await getAuthenticatedProfile(ctx);
    return await ctx.db.patch(args.connectionId, {
      status: args.status,
    });
  },
});

export const createConnection = mutation({
  args: {
    receiverId: v.id("profiles"),
  },
  handler: async (ctx, args) => {
    const sender = await getAuthenticatedProfile(ctx);

    const request = await ctx.db.insert("connections", {
      senderid: sender._id,
      receiverid: args.receiverId,
      status: "pending",
    });
    return request;
  },
});

export const acceptConnection = mutation({
  args: {
    id: v.id("connections"),
  },
  handler: async (ctx, args) => {
    await getAuthenticatedProfile(ctx);
    return await ctx.db.patch(args.id, {
      status: "accepted",
    });
  },
});

export const rejectConnection = mutation({
  args: {
    id: v.id("connections"),
  },
  handler: async (ctx, args) => {
    await getAuthenticatedProfile(ctx);
    return await ctx.db.delete(args.id);
  },
});
