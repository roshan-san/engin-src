import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { getProfileByIdfn } from "../connections/functions";
import { getAuthenticatedProfile } from "../helper";

export const getMyProfile = query({
  handler: async (ctx) => {
    return await getAuthenticatedProfile(ctx);
  },
});

export const getProfileByUsername = query({
  args: {
    username: v.string(),
  },
  handler: async function (ctx, args) {
    await getAuthUserId(ctx);
    const profile = ctx.db
      .query("profiles")
      .withSearchIndex("by_username",(q)=>q.search("username",args.username))
      .first()
    return profile;
  },
});

export const getProfileById = query({
  args: {
    profileId: v.id("profiles"),
  },
  handler: async (ctx, args) => {
    return await getProfileByIdfn(ctx, args.profileId);
  },
});
