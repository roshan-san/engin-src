import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createProfile = mutation({
  args: {
    avatar_url: v.optional(v.string()),
    bio: v.optional(v.string()),
    created_at: v.optional(v.string()),
    email: v.optional(v.string()),
    full_name: v.optional(v.string()),
    github_url: v.optional(v.string()),
    id: v.optional(v.string()),
    interests: v.optional(v.array(v.string())),
    linkedin_url: v.optional(v.string()),
    location: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    user_type: v.optional(v.string()),
    username: v.optional(v.string()),
    work_type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Insert the profile into the "profiles" table
    const id = await ctx.db.insert("profiles", args);
    return id;
  },
}); 