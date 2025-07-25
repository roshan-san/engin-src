import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { getAuthenticatedUser } from "./helper";

// Check if environment variables are available
const hasGitHubConfig = process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET;
const hasGoogleConfig = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;

// Create providers array based on available config
const providers = [];

if (hasGitHubConfig) {
  providers.push(
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    })
  );
}

if (hasGoogleConfig) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  );
}

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers,
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
        profile: profile || null,
      };
    } catch {
      return null;
    }
  },
});
