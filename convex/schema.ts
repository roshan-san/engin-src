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
  profiles: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    avatar_url: v.optional(v.string()),
    username: v.optional(v.string()),
    user_type: v.optional(v.string()),
    work_type: v.optional(v.string()),
    location: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    interests: v.optional(v.array(v.string())),
    bio: v.optional(v.string()),
    github_url: v.optional(v.string()),
    linkedin_url: v.optional(v.string()),
  })
    .index("email", ["email"])
    .searchIndex("by_username", { searchField: "username" })
    .searchIndex("by_name", { searchField: "name" })
    .searchIndex("by_bio", { searchField: "bio" })
    .searchIndex("by_location", { searchField: "location" })
    .searchIndex("by_user_type", { searchField: "user_type" }),
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

  messages: defineTable({
    senderId: v.id("profiles"),
    receiverId: v.id("profiles"),
    content: v.string(),
    read: v.optional(v.boolean()),
    readAt: v.optional(v.number()),
    senderName: v.optional(v.string()),
    senderAvatar: v.optional(v.string()),
    senderUsername: v.optional(v.string()),
  })
  .index("by_sender_receiver", ["senderId", "receiverId"])
  .index("by_receiver", ["receiverId"]),

  startups: defineTable({
    name: v.string(),
    description: v.string(),
    problem: v.string(),
    solution: v.string(),
    location: v.string(),
    funding: v.number(),
    team_size: v.number(),
    ownerId: v.id("profiles"),
    // Simplified collaborators - just track who's on the team
    collaborators: v.optional(v.array(v.id("profiles"))),
    upvotes: v.optional(v.array(v.id("profiles"))), // Track upvotes by user
    stage: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    likes: v.optional(v.array(v.id("profiles"))),
    // Contact information
    website: v.optional(v.string()),
    email: v.optional(v.string()),
    createdAt: v.optional(v.number()),
  })
    .index("by_owner", ["ownerId"])
    .index("by_collaborators", ["collaborators"])
    .searchIndex("by_ownerId",{
      searchField:"ownerId"
    })
    .searchIndex("by_name", {
      searchField: "name",
    }),

  positions: defineTable({
    startupId: v.id("startups"),
    title: v.string(),
    description: v.string(),
    requirements: v.optional(v.string()),
    status: v.union(v.literal("open"), v.literal("closed")),
    createdAt: v.number(),
  })
    .index("by_startup", ["startupId", "status"]),

  applications: defineTable({
    positionId: v.id("positions"),
    applicantId: v.id("profiles"),
    message: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("rejected")
    ),
    createdAt: v.number(),
    // When accepted, this becomes the role in the startup
    acceptedRole: v.optional(v.string()),
  })
    .index("by_position", ["positionId", "status"])
    .index("by_applicant", ["applicantId", "status"])
    .index("by_startup_applicant", ["positionId", "applicantId"]),

  // Track online status
  onlineStatus: defineTable({
    userId: v.id("profiles"),
    isOnline: v.boolean(),
    lastSeen: v.number(),
  })
  .index("by_user", ["userId"]),

  posts: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.id("profiles"),
    createdAt: v.number(),
    tags: v.optional(v.array(v.string())),
    imageUrl: v.optional(v.string()),
  }),
  post_votes: defineTable({
    postId: v.id("posts"),
    userId: v.id("profiles"),
    vote: v.union(v.literal(1), v.literal(-1)),
    createdAt: v.number(),
  })
    .index("by_post", ["postId"])
    .index("by_user_post", ["userId", "postId"]),
  post_comments: defineTable({
    postId: v.id("posts"),
    userId: v.id("profiles"),
    content: v.string(),
    createdAt: v.number(),
  })
    .index("by_post", ["postId"]),

  feedback: defineTable({
    userId: v.id("profiles"),
    type: v.union(
      v.literal("feature-request"),
      v.literal("bug-report"),
      v.literal("improvement"),
      v.literal("general")
    ),
    title: v.string(),
    description: v.string(),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("critical")
    ),
    status: v.union(
      v.literal("pending"),
      v.literal("in-progress"),
      v.literal("completed"),
      v.literal("declined")
    ),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_type", ["type"])
    .index("by_priority", ["priority"]),
});

export default schema;
