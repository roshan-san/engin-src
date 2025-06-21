import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { getAuthenticatedProfile } from "../helper";

export const createStartup = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    problem: v.string(),
    solution: v.string(),
    location: v.string(),
    funding: v.number(),
    team_size: v.number(),
  },
  handler: async (ctx, args) => {
    const profile = await getAuthenticatedProfile(ctx);

    const startup = {
      ...args,
      ownerId: profile._id,
    };

    const startupId = await ctx.db.insert("startups", startup);

    return startupId;
  },
});
