import { v } from "convex/values";
import { getAuthenticatedProfile } from "../helper";
import { query } from "../_generated/server";

export const getMyStartups = query({
  args: {},
  handler: async (ctx) => {
    const profile = await getAuthenticatedProfile(ctx);
    if (!profile) {
      throw new Error("No Profile Found");
    }
    return await ctx.db
      .query("startups")
      .withIndex("by_owner", (q) => q.eq("ownerId", profile._id))
      .collect();
  },
});

export const getStartup = query({
  args: { startupId: v.id("startups") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.startupId);
  },
});
