import { z } from "zod";
import { VALIDATION_MESSAGES } from "@/constants/validation";

export const loginSchema = z.object({
  email: z.string().min(1, VALIDATION_MESSAGES.REQUIRED).email(VALIDATION_MESSAGES.INVALID_EMAIL),
  password: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  rememberMe: z.boolean().default(false).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().min(1, VALIDATION_MESSAGES.REQUIRED).email(VALIDATION_MESSAGES.INVALID_EMAIL),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  acceptTerms: z.literal(true, {
    message: VALIDATION_MESSAGES.TERMS_REQUIRED,
  }),
});

export type SignupFormData = z.infer<typeof signupSchema>;
