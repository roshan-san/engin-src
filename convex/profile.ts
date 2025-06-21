import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getUserProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    
    if (!userId) {
      return null;
    }
    
    const user = await ctx.db.get(userId);
    
    if (!user) {
      return null;
    }
    
    const profile = await ctx.db
      .query("profiles")
      .withIndex("email", (q) => q.eq("email", user.email))
      .unique();
      
    return {
      user,
      profile: profile || null
    };
  }
});

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
    const userId = await getAuthUserId(ctx)
    if (!userId) {
      throw new Error("Failed to find user Id")
    }
    const user = await ctx.db.get(userId)
    
    if (!user) {
      throw new Error("Failed to find user in database")
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
  }
}); 