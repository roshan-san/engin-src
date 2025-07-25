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

    // Check if username is provided and validate it's not already taken
    if (args.username) {
      const existingProfile = await ctx.db
        .query("profiles")
        .withSearchIndex("by_username", (q) => q.search("username", args.username!))
        .first();
      
      if (existingProfile) {
        throw new Error("Username already taken");
      }
    }

    // Debug logging
    console.log('Creating profile with user data:', {
      userImage: user.image,
      userName: user.name,
      userEmail: user.email
    });

    // Validate avatar URL
    const isValidAvatarUrl = (url: string | null | undefined) => {
      return url && url.trim() !== '' && url !== 'null' && url !== 'undefined';
    };

    const avatarUrl = isValidAvatarUrl(user.image) ? user.image : undefined;

    const profile = await ctx.db.insert("profiles", {
      username: args.username,
      user_type: args.user_type,
      work_type: args.work_type,
      location: args.location,
      skills: args.skills,
      interests: args.interests,
      github_url: args.github_url,
      linkedin_url: args.linkedin_url,
      avatar_url: avatarUrl,
      name: user.name,
      email: user.email,
    });

    console.log('Profile created with avatar_url:', avatarUrl);

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

export const updateAvatarUrl = mutation({
  args: {
    profileId: v.id("profiles"),
    avatar_url: v.string(),
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

    // Update the avatar URL
    const updatedProfile = await ctx.db.patch(args.profileId, {
      avatar_url: args.avatar_url,
    });

    console.log('Avatar URL updated:', args.avatar_url);

    return updatedProfile;
  },
});
