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
    const user = await getAuthenticatedUser(ctx);
    
    let profiles;
    
    if (args.searchQuery && args.searchQuery.trim() !== "") {
      const searchTerm = args.searchQuery.trim();
      
      // Simple approach: get all profiles and filter
      const allProfiles = await ctx.db.query("profiles").collect();
      
      // Filter profiles by various fields (case-insensitive)
      const filteredProfiles = allProfiles.filter(profile => {
        const searchLower = searchTerm.toLowerCase();
        const username = profile.username?.toLowerCase() || "";
        const name = profile.name?.toLowerCase() || "";
        const bio = profile.bio?.toLowerCase() || "";
        const location = profile.location?.toLowerCase() || "";
        const userType = profile.user_type?.toLowerCase() || "";
        
        return username.includes(searchLower) || 
               name.includes(searchLower) || 
               bio.includes(searchLower) || 
               location.includes(searchLower) || 
               userType.includes(searchLower);
      });
      
      // Apply pagination manually
      const startIndex = args.paginationOpts.numItems * (args.paginationOpts.cursor ? 1 : 0);
      const endIndex = startIndex + args.paginationOpts.numItems;
      const paginatedResults = filteredProfiles.slice(startIndex, endIndex);
      
      profiles = {
        page: paginatedResults,
        isDone: endIndex >= filteredProfiles.length,
        continueCursor: endIndex < filteredProfiles.length ? endIndex.toString() : undefined
      };
    } else {
      // No search query, use regular pagination
      profiles = await ctx.db.query("profiles").paginate(args.paginationOpts);
    }

    if (user) {
      return {
        ...profiles,
        page: profiles.page.filter((profile) => profile.email !== user.email),
      };
    }

    return profiles;
  },
});
