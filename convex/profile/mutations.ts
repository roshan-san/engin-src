import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { getAuthenticatedUser } from "../helper";

export const createProfile = mutation({
  args: {
    username: v.optional(v.string()),
    user_type: v.optional(v.string()),
    work_type: v.optional(v.string()),
    location: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    interests: v.optional(v.array(v.string())),
    github_url: v.optional(v.string()),
    linkedin_url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);

    if (!user) {
      throw new Error("Failed to find user in database");
    }

    const profile = await ctx.db.insert("profiles", {
      username: args.username,
      user_type: args.user_type,
      work_type: args.work_type,
      location: args.location,
      skills: args.skills,
      interests: args.interests,
      github_url: args.github_url,
      linkedin_url: args.linkedin_url,
      avatar_url: user.image,
      name: user.name,
      email: user.email,
    });

    return profile;
  },
});

export const updateProfile = mutation({
  args: {
    profileId: v.id("profiles"),
    username: v.optional(v.string()),
    user_type: v.optional(v.string()),
    work_type: v.optional(v.string()),
    location: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    interests: v.optional(v.array(v.string())),
    github_url: v.optional(v.string()),
    linkedin_url: v.optional(v.string()),
    name: v.optional(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Get the profile to check ownership
    const profile = await ctx.db.get(args.profileId);
    if (!profile) {
      throw new Error("Profile not found");
    }

    // Check if user owns this profile
    if (profile.email !== user.email) {
      throw new Error("Not authorized to edit this profile");
    }

    // Check if username is being changed and if it's already taken
    if (args.username && args.username !== profile.username) {
      const existingProfile = await ctx.db
        .query("profiles")
        .withSearchIndex("by_username", (q) => q.search("username", args.username!))
        .first();
      
      if (existingProfile && existingProfile._id !== args.profileId) {
        throw new Error("Username already taken");
      }
    }

    // Update the profile
    const updatedProfile = await ctx.db.patch(args.profileId, {
      ...(args.username && { username: args.username }),
      ...(args.user_type && { user_type: args.user_type }),
      ...(args.work_type && { work_type: args.work_type }),
      ...(args.location && { location: args.location }),
      ...(args.skills && { skills: args.skills }),
      ...(args.interests && { interests: args.interests }),
      ...(args.github_url && { github_url: args.github_url }),
      ...(args.linkedin_url && { linkedin_url: args.linkedin_url }),
      ...(args.name && { name: args.name }),
      ...(args.bio && { bio: args.bio }),
    });

    return updatedProfile;
  },
});
