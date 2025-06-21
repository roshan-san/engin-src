import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getProfileByUsername = query({
    args: {
        username: v.optional(v.string())
    },
    handler: async function (ctx, args) {
        const profile = ctx.db.query("profiles")
            .filter((q) => q.eq(q.field("username"), args.username))
        return profile
    }
}
)

export const getUserProfile = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            return null;
        }
        const user = await ctx.db.get(userId);
        if (!user) {
            throw new Error("User not found or not authenticated");
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
