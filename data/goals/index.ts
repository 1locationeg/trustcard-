import type { GoalConfig } from "@/types/dashboard"
import { moreLeadsConfig } from "./more-leads"
import { moreAuthorityConfig } from "./more-authority"
import { moreReferralsConfig } from "./more-referrals"

/**
 * Registry of all goal configurations keyed by their goal ID.
 * Add new goals here — no changes needed in page.tsx or any component.
 */
export const goalConfigs: Record<string, GoalConfig> = {
  "More Leads":     moreLeadsConfig,
  "More Authority": moreAuthorityConfig,
  "More Referrals": moreReferralsConfig,
}

/**
 * Returns the GoalConfig for the given goal string.
 * Falls back to "More Leads" when the value is null or unrecognised.
 */
export function getGoalConfig(goal: string | null): GoalConfig {
  return goalConfigs[goal ?? ""] ?? moreLeadsConfig
}
