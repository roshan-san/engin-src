import { getAuthUserId } from "@convex-dev/auth/server";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { query } from "../_generated/server";

export const getProfiles = query({
    args: {
      searchQuery: v.optional(v.string()),
      paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
      const userId = await getAuthUserId(ctx);
  
      let currentUserProfile = null;
      if (userId) {
        const user = await ctx.db.get(userId);
        if (user?.email) {
          currentUserProfile = await ctx.db
            .query("profiles")
            .withIndex("email", (q) => q.eq("email", user.email!))
            .unique();
        }
      }
  
      const query = args.searchQuery
        ? ctx.db
            .query("profiles")
            .withSearchIndex("by_username", (q) =>
              q.search("username", args.searchQuery!)
            )
        : ctx.db.query("profiles");
  
      const profiles = await query.paginate(args.paginationOpts);
  
      if (currentUserProfile) {
        return {
          ...profiles,
          page: profiles.page.filter(
            (profile) => profile._id !== currentUserProfile._id
          ),
        };
      }
  
      return profiles;
    },
  });