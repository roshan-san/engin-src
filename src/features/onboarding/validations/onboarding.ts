import { z } from "zod";
import { checkUsernameApi } from "@/api/profile";

export const usernameSchema = z.object({
    username: z.string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be less than 30 characters")
      .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens")
      .refine(
        async (username) => {
          const isTaken = await checkUsernameApi(username);
          return !isTaken;
        },
        "This username is already taken"
      )
});

export const userTypeSchema = z.object({
  user_type: z.enum(['Creator/Collaborator', 'Mentor', 'Investor'])
});

export const workTypeSchema = z.object({
  work_type: z.enum(['Full-Time', 'Part-Time', 'Contract'])
});

export const locationSchema = z.object({
  location: z.string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters")
});

export const skillsSchema = z.object({
  skills: z.array(z.string())
    .min(1, "At least one skill is required")
    .max(10, "Maximum 10 skills allowed")
});

export const interestsSchema = z.object({
  interests: z.array(z.string())
    .max(10, "Maximum 10 interests allowed")
});

export const contactSchema = z.object({
  github_url: z.string().optional(),
  linkedin_url: z.string().optional()
});

export const OnboardingSchema = z.object({
  username: usernameSchema.shape.username,
  user_type: userTypeSchema.shape.user_type,
  work_type: workTypeSchema.shape.work_type,
  location: locationSchema.shape.location,
  skills: skillsSchema.shape.skills,
  interests: interestsSchema.shape.interests,
  github_url: contactSchema.shape.github_url,
  linkedin_url: contactSchema.shape.linkedin_url
});
