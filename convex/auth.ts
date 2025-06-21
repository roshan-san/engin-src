import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
 
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});
export const getUser = query({
  args: {},
  handler: async (ctx) => {
      const userId = await getAuthUserId(ctx)
      if (!userId) {
          throw new Error("Failed to find user Id")
      }
      const user = await ctx.db.get(userId)

      if (!user) {
          throw new Error("Failed to find user in database")
      }

      const profile = await ctx.db
          .query("profiles")
          .withIndex("email", (q) => q.eq("email", user.email))
          .unique();

      return {
          user,
          profile: profile || null
      };
  }
});  