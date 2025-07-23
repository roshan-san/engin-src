import { query } from "../_generated/server";
import { getAuthenticatedProfile } from "../helper";
import { v } from "convex/values";

export const listPosts = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("posts")
      .order("desc")
      .collect();
  },
});

export const getPostVotes = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const profile = await getAuthenticatedProfile(ctx);
    const votes = await ctx.db
      .query("post_votes")
      .withIndex("by_post", q => q.eq("postId", args.postId))
      .collect();
    let upvotes = 0, downvotes = 0, userVote = 0;
    for (const v of votes) {
      if (v.vote === 1) upvotes++;
      if (v.vote === -1) downvotes++;
      if (v.userId === profile._id) userVote = v.vote;
    }
    return { upvotes, downvotes, userVote };
  },
});

export const getPostComments = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("post_comments")
      .withIndex("by_post", q => q.eq("postId", args.postId))
      .order("desc")
      .collect();
    return comments;
  },
});

export const getFileUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const getTrendingTags = query({
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").collect();
    const tagCounts: Record<string, number> = {};
    for (const post of posts) {
      if (post.tags) {
        for (const tag of post.tags) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }
      }
    }
    const trending = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
    return trending;
  },
});

export const getPostsByTag = query({
  args: { tag: v.string() },
  handler: async (ctx, args) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    return posts.filter(post => post.tags && post.tags.includes(args.tag));
  },
}); 