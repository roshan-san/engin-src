import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { query } from "../_generated/server";

export const getStartups = query({
  args: {
    searchQuery: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const query = args.searchQuery
      ? ctx.db
          .query("startups")
          .withSearchIndex("by_name", (q) =>
            q.search("name", args.searchQuery!),
          )
      : ctx.db.query("startups");

    const startups = await query.paginate(args.paginationOpts);

    // Map to include upvotesCount for each startup
    return {
      ...startups,
      page: startups.page.map((startup) => ({
        ...startup,
        upvotesCount: (startup.upvotes || []).length,
        // stage, tags, likes are now part of the startup object
      })),
    };
  },
});
