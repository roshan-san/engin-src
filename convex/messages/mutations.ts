import { mutation } from "../_generated/server";
import { getAuthenticatedProfile } from "../helper";
import { v } from "convex/values";

export const sendMessage = mutation({
    args: {
        receiverId: v.id("profiles"),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        const myProfile = await getAuthenticatedProfile(ctx);

        await ctx.db.insert("messages", {
            senderId: myProfile._id,
            receiverId: args.receiverId,
            content: args.content,
        });
    }
})
