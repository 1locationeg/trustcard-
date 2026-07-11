import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Goal = 'More Leads' | 'More Referrals' | 'More Deals' | 'More Authority' | null

export interface Experience {
  id: string
  jobTitle: string
  company: string
  startDate: string
  endDate: string // or "Present"
  description: string
}

export interface Testimonial {
  id: string
  clientName: string
  role: string
  quote: string
  rating?: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  date?: string
}

export type VerificationType = 'Identity' | 'Certification' | 'License' | 'Award' | 'Membership' | 'Document' | 'Other'

export interface VerificationEntry {
  id: string
  type: VerificationType
  title: string
  description?: string
  status: 'Pending' | 'Verified' | 'Rejected'
  metadata?: Record<string, unknown>
}

export interface TrustCardDraft {
  specialization: string
  biggestStrength: string
  profilePhoto: string
  fullName: string
  jobTitle: string
  company: string
  yearsOfExperience: string
  shortBio: string
  linkedIn: string
  website: string
  phoneNumber: string
  experiences: Experience[]
  testimonials: Testimonial[]
  achievements: Achievement[]
  verifications: VerificationEntry[]
  trustScore?: number
  profileCompletion?: number
  verificationStatus?: string
  dealsClosed?: string
  clientRating?: string
  location?: string
  responseTime?: string
  trustedByCount?: string
  showR8Badge?: boolean
  id?: string
  userId?: string
  slug?: string
}

const defaultTrustCardDraft: TrustCardDraft = {
  specialization: '',
  biggestStrength: '',
  profilePhoto: '', // Will use default avatar if empty
  fullName: '',
  jobTitle: '',
  company: '',
  yearsOfExperience: '',
  shortBio: '',
  linkedIn: '',
  website: '',
  phoneNumber: '',
  experiences: [],
  testimonials: [],
  achievements: [],
  verifications: [],
  trustScore: 0,
  profileCompletion: 0,
  verificationStatus: 'Pending',
  trustedByCount: '',
  showR8Badge: true,
  id: undefined,
  userId: undefined,
  slug: 'user',
}

export interface OnboardingState {
  selectedGoal: Goal
  trustCardDraft: TrustCardDraft
  savedTrustCard: TrustCardDraft | null
  currentStep: number // 1 to 5
  isOnboardingCompleted: boolean
  isEditMode: boolean
  isInlineEditing: boolean
  tempDraft: TrustCardDraft | null
  userMode: "preview" | "registered"
  previewExpiresAt: string | null

  setUserMode: (mode: "preview" | "registered") => void
  setGoal: (goal: Goal) => void
  setEditMode: (isEdit: boolean) => void
  setInlineEditing: (isEditing: boolean) => void
  setTempDraft: (draft: TrustCardDraft | null) => void
  updateTempDraft: (data: Partial<TrustCardDraft>) => void
  updateDraft: (data: Partial<TrustCardDraft>) => void
  nextStep: () => void
  previousStep: () => void
  skipStep: () => void
  completeOnboarding: () => void
  reset: () => void
  savePreviewToPermanent: () => void
  resetPreviewDraft: () => void
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      selectedGoal: null,
      trustCardDraft: defaultTrustCardDraft,
      savedTrustCard: null,
      currentStep: 1,
      isOnboardingCompleted: false,
      isEditMode: false,
      isInlineEditing: false,
      tempDraft: null,
      userMode: "preview",
      previewExpiresAt: null,

      setUserMode: (mode) => set({ userMode: mode }),
      setGoal: (goal) => set({ selectedGoal: goal }),
      setEditMode: (isEdit) => set({ isEditMode: isEdit }),
      setInlineEditing: (isEditing) => set({ isInlineEditing: isEditing }),
      setTempDraft: (draft) => set({ tempDraft: draft }),
      
      updateTempDraft: (data) =>
        set((state) => ({
          tempDraft: state.tempDraft ? { ...state.tempDraft, ...data } : null
        })),
      
      updateDraft: (data) => 
        set((state) => {
          const updatedData = { ...data };
          if (updatedData.fullName !== undefined) {
            const nameToSlugify = updatedData.fullName.trim();
            updatedData.slug = nameToSlugify 
              ? nameToSlugify.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') 
              : 'user';
          }
          if (state.userMode === "registered" && state.savedTrustCard) {
            return { savedTrustCard: { ...state.savedTrustCard, ...updatedData } }
          }
          return { trustCardDraft: { ...state.trustCardDraft, ...updatedData } }
        }),
        
      nextStep: () => 
        set((state) => ({ 
          currentStep: Math.min(state.currentStep + 1, 7) 
        })),
        
      previousStep: () => 
        set((state) => ({ 
          currentStep: Math.max(state.currentStep - 1, 1) 
        })),
        
      skipStep: () => 
        set((state) => {
          if (state.currentStep === 6) {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7);
            return {
              isOnboardingCompleted: true,
              previewExpiresAt: expirationDate.toISOString()
            };
          }
          return { currentStep: Math.min(state.currentStep + 1, 7) };
        }),

      completeOnboarding: () => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        
        set({ 
          isOnboardingCompleted: true,
          previewExpiresAt: expirationDate.toISOString()
          // preserve trustCardDraft, userMode, and selectedGoal
        });
      },

      savePreviewToPermanent: () => 
        set((state) => ({
          savedTrustCard: state.trustCardDraft,
          trustCardDraft: defaultTrustCardDraft,
          userMode: "registered",
          isOnboardingCompleted: true, // Should already be true, but ensure it
          previewExpiresAt: null
        })),

      resetPreviewDraft: () => 
        set({
          trustCardDraft: defaultTrustCardDraft,
          isOnboardingCompleted: false,
          currentStep: 1,
          selectedGoal: null,
          previewExpiresAt: null
        }),

      reset: () => 
        set({
          selectedGoal: null,
          trustCardDraft: defaultTrustCardDraft,
          savedTrustCard: null,
          currentStep: 1,
          isOnboardingCompleted: false,
          isEditMode: false,
          isInlineEditing: false,
          tempDraft: null,
          userMode: "preview",
          previewExpiresAt: null,
        })
    }),
    {
      name: 'onboarding-storage', // key in sessionStorage
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
