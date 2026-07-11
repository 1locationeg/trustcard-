import { z } from "zod";

export const analyticsEventSchema = z.object({
  ownerUserId: z.string(),
  eventType: z.enum([
    'profile_view',
    'phone_click',
    'whatsapp_click',
    'email_click',
    'website_click',
    'linkedin_click',
    'profile_share',
    'qr_scan'
  ]),
  source: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  visitorId: z.string().optional(),
});
