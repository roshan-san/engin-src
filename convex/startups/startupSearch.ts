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

    const profiles = await query.paginate(args.paginationOpts);

    return profiles;
  },
});
