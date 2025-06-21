import { mutation } from "./_generated/server";
import { v } from "convex/values";

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
    // Add more fields as needed
  },
  handler: async (ctx, args) => {
    // Get the current user (if using authentication)
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.subject) {
      throw new Error("Not authenticated");
    }
    // Upsert user profile by unique id (subject)
    const existing = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", identity.email))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.username,
        // Map all fields
        ...args,
      });
      return existing._id;
    } else {
      return await ctx.db.insert("users", {
        name: args.username,
        email: identity.email,
        ...args,
      });
    }
  },
}); 