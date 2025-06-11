import { z } from "zod";


// Username Schema
export const usernameSchema = z.object({
    username: z.string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be less than 30 characters")
      .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens")
  });
  
export type UsernameFormValues = z.infer<typeof usernameSchema>;


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
    .max(10, "Maximum 10 skills allowed"),
  interests: z.array(z.string())
    .max(10, "Maximum 10 interests allowed")
});

export type SkillsFormValues = z.infer<typeof skillsSchema>;

// Interests Schema
export const interestsSchema = z.object({
  interests: z.array(z.string())
    .max(10, "Maximum 10 interests allowed")
});

export type InterestsFormValues = z.infer<typeof interestsSchema>;

// Contact Schema
export const contactSchema = z.object({
  github: z.string().url("Please enter a valid GitHub URL").optional(),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional()
});

export type ContactFormValues = z.infer<typeof contactSchema>;

// Complete Profile Schema
export const OnboardingSchema = z.object({
  username: usernameSchema.shape.username,
  user_type: userTypeSchema.shape.user_type,
  work_type: workTypeSchema.shape.work_type,
  location: locationSchema.shape.location,
  skills: skillsSchema.shape.skills,
  interests: skillsSchema.shape.interests,
  github: contactSchema.shape.github,
  linkedin: contactSchema.shape.linkedin
});

export type OnboardingFormValues = z.infer<typeof OnboardingSchema>;
