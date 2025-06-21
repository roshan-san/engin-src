import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
 
const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    // other "users" fields...
  }).index("email", ["email"]),
  profiles:defineTable({
    name:v.optional(v.string()),
    email: v.optional(v.string()),
    avatar_url:v.optional(v.string()),
    username: v.optional(v.string()),
    user_type: v.optional(v.string()),
    work_type: v.optional(v.string()),
    location: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    interests: v.optional(v.array(v.string())),
    github_url: v.optional(v.string()),
    linkedin_url: v.optional(v.string()),
  }).index("email", ["email"])
  .searchIndex("by_username", { searchField: "username" }),
  connections: defineTable({
    senderid: v.id("profiles"),
    receiverid: v.id("profiles"),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("declined"),
    ),
  })
    .index("by_sender", ["senderid", "status"])
    .index("by_receiver", ["receiverid", "status"])
    .index("by_sender_receiver", ["senderid", "receiverid"]),
});
 
export default schema;