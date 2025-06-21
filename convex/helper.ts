import { getAuthUserId } from "@convex-dev/auth/server";
import { MutationCtx, QueryCtx } from "./_generated/server";

export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
  const userId = await getAuthUserId(ctx);

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const user = await ctx.db.get(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function getAuthenticatedProfile(ctx: QueryCtx | MutationCtx) {
  const user = await getAuthenticatedUser(ctx);
  const profile = await ctx.db
    .query("profiles")
    .withIndex("email", (q) => q.eq("email", user.email))
    .first();

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile;
}
