import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { getAuthenticatedProfile } from "../helper";

export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    tags: v.optional(v.array(v.string())),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const profile = await getAuthenticatedProfile(ctx);
    return await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      authorId: profile._id,
      createdAt: Date.now(),
      tags: args.tags ?? [],
      imageUrl: args.imageUrl,
    });
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await getAuthenticatedProfile(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

export const upvotePost = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const profile = await getAuthenticatedProfile(ctx);
    const existing = await ctx.db
      .query("post_votes")
      .withIndex("by_user_post", q => q.eq("userId", profile._id).eq("postId", args.postId))
      .first();
    if (existing) {
      if (existing.vote === 1) {
        // Remove upvote (toggle off)
        await ctx.db.delete(existing._id);
        return 0;
      } else {
        // Change downvote to upvote
        await ctx.db.patch(existing._id, { vote: 1 });
        return 1;
      }
    } else {
      await ctx.db.insert("post_votes", {
        postId: args.postId,
        userId: profile._id,
        vote: 1,
        createdAt: Date.now(),
      });
      return 1;
    }
  },
});

export const downvotePost = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const profile = await getAuthenticatedProfile(ctx);
    const existing = await ctx.db
      .query("post_votes")
      .withIndex("by_user_post", q => q.eq("userId", profile._id).eq("postId", args.postId))
      .first();
    if (existing) {
      if (existing.vote === -1) {
        // Remove downvote (toggle off)
        await ctx.db.delete(existing._id);
        return 0;
      } else {
        // Change upvote to downvote
        await ctx.db.patch(existing._id, { vote: -1 });
        return -1;
      }
    } else {
      await ctx.db.insert("post_votes", {
        postId: args.postId,
        userId: profile._id,
        vote: -1,
        createdAt: Date.now(),
      });
      return -1;
    }
  },
});

export const addComment = mutation({
  args: { postId: v.id("posts"), content: v.string() },
  handler: async (ctx, args) => {
    const profile = await getAuthenticatedProfile(ctx);
    return await ctx.db.insert("post_comments", {
      postId: args.postId,
      userId: profile._id,
      content: args.content,
      createdAt: Date.now(),
    });
  },
}); 