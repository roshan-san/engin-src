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

export const listPositions = query({
  args: { startupId: v.id("startups") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("positions")
      .withIndex("by_startup", (q) =>
        q.eq("startupId", args.startupId).eq("status", "open")
      )
      .order("desc")
      .collect();
  },
});

export const listApplications = query({
  args: { positionId: v.id("positions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("applications")
      .withIndex("by_position", (q) =>
        q.eq("positionId", args.positionId)
      )
      .order("desc")
      .collect();
  },
});

export const getApplicationByUser = query({
  args: { 
    positionId: v.id("positions"),
    applicantId: v.id("profiles")
  },
  handler: async (ctx, args) => {
    const applications = await ctx.db
      .query("applications")
      .withIndex("by_startup_applicant", (q) =>
        q.eq("positionId", args.positionId).eq("applicantId", args.applicantId)
      )
      .collect();
    
    return applications[0] || null; // Return the first (and should be only) application
  },
});

export const getAcceptedApplications = query({
  args: { startupId: v.id("startups") },
  handler: async (ctx, args) => {
    // Get all positions for this startup
    const positions = await ctx.db
      .query("positions")
      .withIndex("by_startup", (q) =>
        q.eq("startupId", args.startupId)
      )
      .collect();
    
    // Get all accepted applications for these positions
    const acceptedApplications = [];
    for (const position of positions) {
      const applications = await ctx.db
        .query("applications")
        .withIndex("by_position", (q) =>
          q.eq("positionId", position._id).eq("status", "accepted")
        )
        .collect();
      acceptedApplications.push(...applications);
    }
    
    return acceptedApplications;
  },
});

export const getCollaborators = query({
  args: { startupId: v.id("startups") },
  handler: async (ctx, args) => {
    const startup = await ctx.db.get(args.startupId);
    if (!startup || !startup.collaborators || startup.collaborators.length === 0) return [];
    const profiles = await Promise.all(
      startup.collaborators.map((id: any) => ctx.db.get(id))
    );
    return profiles.filter(Boolean);
  },
});
