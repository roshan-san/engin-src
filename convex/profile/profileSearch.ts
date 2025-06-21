import { getAuthUserId } from "@convex-dev/auth/server";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthenticatedUser } from "../helper";

export const getProfiles = query({
    args: {
      searchQuery: v.optional(v.string()),
      paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
      const user = await getAuthenticatedUser(ctx)
      const query = args.searchQuery
        ? ctx.db
            .query("profiles")
            .withSearchIndex("by_username", (q) =>
              q.search("username", args.searchQuery!)
            )
        : ctx.db.query("profiles");
  
      const profiles = await query.paginate(args.paginationOpts);
  
      if (user) {
        return {
          ...profiles,
          page: profiles.page.filter(
            (profile) => profile.email !== user.email
          ),
        };
      }
  
      return profiles;
    },
  });