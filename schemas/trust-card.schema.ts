import { z } from "zod";

export const experienceSchema = z.object({
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export const achievementSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export const trustCardDraftSchema = z.object({
  specialization: z.string().optional(),
  biggestStrength: z.string().optional(),
  profilePhoto: z.string().optional(),
  fullName: z.string().optional(),
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  shortBio: z.string().optional(),
  linkedIn: z.string().optional(),
  website: z.string().optional(),
  phoneNumber: z.string().optional(),
  experience: experienceSchema.nullable().optional(),
  achievement: achievementSchema.nullable().optional(),
  trustScore: z.number().optional(),
  profileCompletion: z.number().optional(),
  verificationStatus: z.string().optional(),
  id: z.string().optional(),
  userId: z.string().optional(),
  slug: z.string().optional(),
});
