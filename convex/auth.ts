import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { convexAuth} from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { getAuthenticatedUser } from "./helper";

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
    try {
      const user = await getAuthenticatedUser(ctx);

      const profile = await ctx.db
        .query("profiles")
        .withIndex("email", (q) => q.eq("email", user.email))
        .unique();

      return {
        user,
        profile: profile || null
      };
    } catch (error) {
      return null
    }
  }
});  