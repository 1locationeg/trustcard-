import { z } from "zod";

export const userUpdateSchema = z.object({
  full_name: z.string().optional(),
  avatar_url: z.string().optional(),
  preferred_locale: z.string().optional(),
  is_onboarding_completed: z.boolean().optional(),
  google_user_id: z.string().optional(),
});
