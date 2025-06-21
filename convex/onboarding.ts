import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUserProfile = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity || !identity.email) {
      return null;
    }
    
    // Check if user exists in users table
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", identity.email))
      .unique();
      
    if (!user) {
      return null;
    }
    
    // Check if profile exists
    const profile = await ctx.db
      .query("profiles")
      .withIndex("email", (q) => q.eq("email", identity.email))
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
  
    const identity = await ctx.auth.getUserIdentity();
    console.log("Identity check:", identity);
    
    if (!identity) {
      throw new Error("Not authenticated - no identity found");
    }
    
    if (!identity.subject) {
      throw new Error("Not authenticated - no subject found in identity");
    }
    
    if (!identity.email) {
      throw new Error("Not authenticated - no email found in identity");
    }
    
    console.log("Identity details:", {
      subject: identity.subject,
      email: identity.email,
      name: identity.name,
      picture: identity.picture
    });
    
    let user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", identity.email))
      .unique();
    
    if (!user) {
      throw new Error("Failed to create user in database");
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