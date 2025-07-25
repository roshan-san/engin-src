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
    website: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const profile = await getAuthenticatedProfile(ctx);

    const startup = {
      ...args,
      stage: args.stage ?? "Growth",
      ownerId: profile._id,
      collaborators: [], // Initialize empty collaborators array
      team_size: 1, // Always start with 1 (the founder)
      createdAt: Date.now(),
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
    website: v.optional(v.string()),
    email: v.optional(v.string()),
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
    try {
      await ctx.db.patch(startupId, rest);
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update startup');
    }
  },
});

export const toggleLikeStartup = mutation({
  args: {
    startupId: v.id("startups"),
  },
  handler: async (ctx, args) => {
    const profile = await getAuthenticatedProfile(ctx);
    if (!profile) throw new Error("Not authenticated");
    
    const startup = await ctx.db.get(args.startupId);
    if (!startup) throw new Error("Startup not found");
    
    const likes = startup.likes || [];
    const hasLiked = likes.includes(profile._id);
    
    let newLikes;
    if (hasLiked) {
      newLikes = likes.filter((id) => id !== profile._id);
    } else {
      newLikes = [...likes, profile._id];
    }
    
    await ctx.db.patch(args.startupId, { likes: newLikes });
    return { liked: !hasLiked, likesCount: newLikes.length };
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

export const updatePosition = mutation({
  args: {
    positionId: v.id("positions"),
    title: v.string(),
    description: v.string(),
    requirements: v.optional(v.string()),
    status: v.union(v.literal("open"), v.literal("closed")),
  },
  handler: async (ctx, args) => {
    // Get the position to verify it exists
    const position = await ctx.db.get(args.positionId);
    if (!position) {
      throw new Error("Position not found");
    }
    
    return await ctx.db.patch(args.positionId, {
      title: args.title,
      description: args.description,
      requirements: args.requirements,
      status: args.status,
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
        // Add as collaborator and update team size
        const newCollaborators = [...(startup.collaborators || []), app.applicantId];
        const newTeamSize = 1 + newCollaborators.length; // owner + collaborators
        
        await ctx.db.patch(position.startupId, {
          collaborators: newCollaborators,
          team_size: newTeamSize,
        });
      }
    }
    
    return true;
  },
});

export const updateTeamSize = mutation({
  args: {
    startupId: v.id("startups"),
  },
  handler: async (ctx, args) => {
    const startup = await ctx.db.get(args.startupId);
    if (!startup) throw new Error("Startup not found");
    
    // Calculate new team size: owner + collaborators
    const newTeamSize = 1 + (startup.collaborators || []).length;
    
    await ctx.db.patch(args.startupId, {
      team_size: newTeamSize,
    });
    
    return newTeamSize;
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
    
    const newCollaborators = (startup.collaborators || []).filter((id: string) => id !== args.collaboratorId);
    const newTeamSize = 1 + newCollaborators.length; // owner + collaborators
    
    await ctx.db.patch(args.startupId, {
      collaborators: newCollaborators,
      team_size: newTeamSize,
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

export const fixTeamSizes = mutation({
  args: {},
  handler: async (ctx) => {
    const allStartups = await ctx.db.query("startups").collect();
    let fixedCount = 0;
    
    for (const startup of allStartups) {
      const correctTeamSize = 1 + (startup.collaborators || []).length;
      if (startup.team_size !== correctTeamSize) {
        await ctx.db.patch(startup._id, {
          team_size: correctTeamSize,
        });
        fixedCount++;
      }
    }
    
    return { fixedCount, totalStartups: allStartups.length };
  },
});
