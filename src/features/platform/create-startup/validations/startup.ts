import * as z from "zod";

export const startupNameSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const startupDescriptionSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const startupLocationSchema = z.object({
  location: z.string().min(2, "Location must be at least 2 characters"),
});

export const startupProblemSchema = z.object({
  problem: z
    .string()
    .min(10, "Problem description must be at least 10 characters"),
});

export const startupSolutionSchema = z.object({
  solution: z
    .string()
    .min(10, "Solution description must be at least 10 characters"),
});

export const startupTeamSchema = z.object({
  team_size: z.coerce.number().min(1, "Team size must be at least 1"),
});

export const startupFundingSchema = z.object({
  funding: z.coerce.number().min(0, "Funding amount cannot be negative"),
});

// Combined schema for all startup fields
export const startupCreationSchema = z.object({
  name: startupNameSchema.shape.name,
  description: startupDescriptionSchema.shape.description,
  location: startupLocationSchema.shape.location,
  problem: startupProblemSchema.shape.problem,
  solution: startupSolutionSchema.shape.solution,
  team_size: startupTeamSchema.shape.team_size,
  funding: startupFundingSchema.shape.funding,
});
