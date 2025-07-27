import { query } from "../_generated/server";
import { v } from "convex/values";
import { getAuthenticatedProfile } from "../helper";

export const getUserFeedback = query({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthenticatedProfile(ctx);

    const feedback = await ctx.db
      .query("feedback")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    return feedback;
  },
});

export const getAllFeedback = query({
  args: {
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("in-progress"),
      v.literal("completed"),
      v.literal("declined")
    )),
    type: v.optional(v.union(
      v.literal("feature-request"),
      v.literal("bug-report"),
      v.literal("improvement"),
      v.literal("general")
    )),
  },
  handler: async (ctx, args) => {
    await getAuthenticatedProfile(ctx);

    // For now, return all feedback. In production, you might want to restrict this to admins
    let feedback = await ctx.db.query("feedback").order("desc").collect();

    // Filter by status if provided
    if (args.status) {
      feedback = feedback.filter(item => item.status === args.status);
    }

    // Filter by type if provided
    if (args.type) {
      feedback = feedback.filter(item => item.type === args.type);
    }

    // Join with user profiles to get user information
    const feedbackWithUsers = await Promise.all(
      feedback.map(async (item) => {
        const user = await ctx.db.get(item.userId);
        return {
          ...item,
          user: user ? {
            name: user.name,
            username: user.username,
            avatar_url: user.avatar_url,
          } : null,
        };
      })
    );

    return feedbackWithUsers;
  },
}); 