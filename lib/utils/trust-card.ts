import { TrustCardDraft } from '@/stores/onboarding-store'

/**
 * Generates a URL-friendly, permanent slug from a full name.
 */
export function generateSlug(name: string): string {
  if (!name) return ''
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Calculates a profile completion percentage based on filled fields.
 */
export function calculateCompletion(draft: Partial<TrustCardDraft>): number {
  const fields = [
    draft.fullName,
    draft.jobTitle,
    draft.company,
    draft.profilePhoto,
    draft.specialization,
    draft.biggestStrength,
    draft.shortBio,
    draft.yearsOfExperience,
    draft.linkedIn,
    draft.website,
    draft.phoneNumber,
    draft.experiences,
    draft.testimonials,
    draft.verifications
  ]
  const filled = fields.filter(f => {
    if (f === undefined || f === null) return false
    if (typeof f === 'string') return f.trim() !== ''
    if (Array.isArray(f)) return f.length > 0
    if (typeof f === 'object') {
      return Object.values(f).some(val => val && String(val).trim() !== '')
    }
    return true
  }).length
  return Math.round((filled / fields.length) * 100)
}

/**
 * Calculates a trust score dynamically.
 */
export function calculateTrustScore(draft: Partial<TrustCardDraft>): number {
  let score = 40 // Base score
  if (draft.fullName) score += 5
  if (draft.profilePhoto) score += 5
  if (draft.jobTitle && draft.company) score += 10
  if (draft.specialization && draft.biggestStrength) score += 10
  if (draft.experiences && draft.experiences.length > 0) score += 5
  if (draft.verifications && draft.verifications.length > 0) score += 5
  if (draft.testimonials && draft.testimonials.length > 0) score += 5
  return Math.min(score, 100)
}
