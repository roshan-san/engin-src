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
    stage: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    likes: v.optional(v.array(v.id("profiles"))),
  },
  handler: async (ctx, args) => {
    const profile = await getAuthenticatedProfile(ctx);

    const startup = {
      ...args,
      stage: args.stage ?? "Growth",
      ownerId: profile._id,
      collaborators: [], // Initialize empty collaborators array
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
    stage: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    likes: v.optional(v.array(v.id("profiles"))),
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
    // Always provide a stage value if missing
    if (!rest.stage && !startup.stage) {
      rest.stage = "Growth";
    }
    await ctx.db.patch(startupId, rest);
  },
});

export const createPosition = mutation({
  args: {
    startupId: v.id("startups"),
    title: v.string(),
    description: v.string(),
    requirements: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("positions", {
      startupId: args.startupId,
      title: args.title,
      description: args.description,
      requirements: args.requirements,
      status: "open",
      createdAt: Date.now(),
    });
  },
});

export const applyToPosition = mutation({
  args: {
    positionId: v.id("positions"),
    applicantId: v.id("profiles"),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Prevent duplicate applications
    const existing = await ctx.db
      .query("applications")
      .withIndex("by_startup_applicant", (q) =>
        q.eq("positionId", args.positionId).eq("applicantId", args.applicantId)
      )
      .collect();
    
    if (existing.length > 0) {
      throw new Error("You have already applied to this position.");
    }
    
    return await ctx.db.insert("applications", {
      positionId: args.positionId,
      applicantId: args.applicantId,
      message: args.message,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

export const updateApplicationStatus = mutation({
  args: {
    applicationId: v.id("applications"),
    status: v.union(v.literal("accepted"), v.literal("rejected")),
  },
  handler: async (ctx, args) => {
    const app = await ctx.db.get(args.applicationId);
    if (!app) throw new Error("Application not found");
    if (app.status !== "pending") throw new Error("Cannot update non-pending application");
    
    // Get position to get the title and startupId
    const position = await ctx.db.get(app.positionId);
    if (!position) throw new Error("Position not found");
    
    // Update application status and set accepted role
    await ctx.db.patch(args.applicationId, { 
      status: args.status,
      acceptedRole: args.status === "accepted" ? position.title : undefined
    });
    
    // If accepted, add to startup collaborators
    if (args.status === "accepted") {
      const startup = await ctx.db.get(position.startupId);
      if (!startup) throw new Error("Startup not found");
      
      // Check if already a collaborator
      const isAlreadyCollaborator = (startup.collaborators || []).includes(app.applicantId);
      
      if (!isAlreadyCollaborator) {
        // Add as collaborator
        await ctx.db.patch(position.startupId, {
          collaborators: [...(startup.collaborators || []), app.applicantId],
        });
      }
    }
    
    return true;
  },
});

export const removeCollaborator = mutation({
  args: {
    startupId: v.id("startups"),
    collaboratorId: v.id("profiles"),
  },
  handler: async (ctx, args) => {
    const startup = await ctx.db.get(args.startupId);
    if (!startup) throw new Error("Startup not found");
    const profile = await getAuthenticatedProfile(ctx);
    if (startup.ownerId !== profile._id) throw new Error("Not authorized");
    
    await ctx.db.patch(args.startupId, {
      collaborators: (startup.collaborators || []).filter((id: any) => id !== args.collaboratorId),
    });
    return true;
  },
});

export const toggleUpvoteStartup = mutation({
  args: {
    startupId: v.id("startups"),
  },
  handler: async (ctx, args) => {
    const profile = await getAuthenticatedProfile(ctx);
    if (!profile) throw new Error("Not authenticated");
    const startup = await ctx.db.get(args.startupId);
    if (!startup) throw new Error("Startup not found");
    const upvotes = startup.upvotes || [];
    const hasUpvoted = upvotes.includes(profile._id);
    let newUpvotes;
    if (hasUpvoted) {
      newUpvotes = upvotes.filter((id) => id !== profile._id);
    } else {
      newUpvotes = [...upvotes, profile._id];
    }
    await ctx.db.patch(args.startupId, { upvotes: newUpvotes });
    return { upvoted: !hasUpvoted, upvotesCount: newUpvotes.length };
  },
});
