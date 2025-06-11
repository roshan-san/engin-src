import { z } from "zod";

// User Type Schema
export const userTypeSchema = z.object({
  user_type: z.enum(['Creator/Collaborator', 'Mentor', 'Investor'])
});

export type UserTypeFormValues = z.infer<typeof userTypeSchema>;

// Work Type Schema
export const workTypeSchema = z.object({
  work_type: z.enum(['Full-Time', 'Part-Time', 'Contract'])
});

export type WorkTypeFormValues = z.infer<typeof workTypeSchema>;

// Location Schema
export const locationSchema = z.object({
  location: z.string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters")
});

export type LocationFormValues = z.infer<typeof locationSchema>;

// Skills Schema
export const skillsSchema = z.object({
  skills: z.array(z.string())
    .min(1, "At least one skill is required")
    .max(10, "Maximum 10 skills allowed")
});

export type SkillsFormValues = z.infer<typeof skillsSchema>;

// Contact Schema
export const contactSchema = z.object({
  github: z.string().url("Please enter a valid GitHub URL").optional(),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional()
});

export type ContactFormValues = z.infer<typeof contactSchema>;

// Username Schema
export const usernameSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens")
});
