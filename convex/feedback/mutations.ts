import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { getAuthenticatedProfile } from "../helper";

export const submit = mutation({
  args: {
    type: v.union(
      v.literal("feature-request"),
      v.literal("bug-report"),
      v.literal("improvement"),
      v.literal("general")
    ),
    title: v.string(),
    description: v.string(),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("critical")
    ),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedProfile(ctx);

    const feedbackId = await ctx.db.insert("feedback", {
      userId: user._id,
      type: args.type,
      title: args.title,
      description: args.description,
      priority: args.priority,
      status: "pending",
      createdAt: Date.now(),
    });

    return feedbackId;
  },
}); 