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
