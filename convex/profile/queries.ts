import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getProfileByUsername = query({
    args: {
        username: v.optional(v.string())
    },
    handler: async function (ctx, args) {
        const userId = await getAuthUserId(ctx)
        if (!userId) {
            throw new Error("Failed to find user Id")
        }
        const user = await ctx.db.get(userId)

        if (!user) {
            throw new Error("Failed to find user in database")
        }
        const profile = ctx.db.query("profiles")
            .filter((q) => q.eq(q.field("username"), args.username))
        return profile
    }
}
)

