import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { getAuthenticatedUser } from "../helper";

export const createConnection = mutation({
  args: {
    receiverId: v.id("profiles"),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx)
    const sender = await ctx.db
      .query("profiles")
      .withIndex("email", (q) => q.eq("email", user.email))
      .first();
    if (!sender) {
      throw new Error("Sender profile not found");
    }

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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    return await ctx.db.delete(args.id);
  },
});
