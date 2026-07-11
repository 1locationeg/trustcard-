/**
 * Types for the AI CV Import feature.
 * Represents the structured data extracted from a PDF CV by the AI parser.
 */
export interface ExtractedExperience {
  jobTitle: string | null
  company: string | null
  startDate: string | null
  endDate: string | null
  description: string | null
}

export interface ExtractedAchievement {
  title: string | null
  description: string | null
}

export interface ExtractedCVData {
  fullName: string | null
  jobTitle: string | null
  company: string | null
  shortBio: string | null
  yearsOfExperience: string | null
  phone: string | null
  email: string | null
  website: string | null
  linkedIn: string | null
  specialization: string | null
  strengths: string[] | null
  experience: ExtractedExperience | null
  achievement: ExtractedAchievement | null
}

export interface CVUploadResult {
  path: string
}

export interface CVExtractResult {
  data: ExtractedCVData
}

export type CVImportStep = 'upload' | 'processing' | 'review' | 'error'
