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

export const updateStartup = mutation({
  args: {
    startupId: v.id("startups"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    problem: v.optional(v.string()),
    solution: v.optional(v.string()),
    location: v.optional(v.string()),
    funding: v.optional(v.number()),
    team_size: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const profile = await getAuthenticatedProfile(ctx);
    const startup = await ctx.db.get(args.startupId);

    if (!startup) {
      throw new Error("Startup not found");
    }

    if (startup.ownerId !== profile._id) {
      throw new Error("You are not the owner of this startup");
    }

    const { startupId, ...rest } = args;
    await ctx.db.patch(startupId, rest);
  },
});
