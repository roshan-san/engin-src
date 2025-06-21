import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getProfileByUsername = query({
    args: {
        username: v.optional(v.string())
    },
    handler: async function (ctx, args) {
        await getAuthUserId(ctx)
        const profile = ctx.db.query("profiles")
            .filter((q) => q.eq(q.field("username"), args.username))
        return profile
    }
}
)

