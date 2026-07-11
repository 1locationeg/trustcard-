import { useState } from 'react'
import type { ExtractedCVData, CVImportStep } from '@/types/cv-import.types'

interface UseCVImportReturn {
  step: CVImportStep
  error: string | null
  extractedData: ExtractedCVData | null
  isLoading: boolean
  uploadAndExtract: (file: File) => Promise<void>
  reset: () => void
}

export function useCVImport(): UseCVImportReturn {
  const [step, setStep] = useState<CVImportStep>('upload')
  const [error, setError] = useState<string | null>(null)
  const [extractedData, setExtractedData] = useState<ExtractedCVData | null>(null)

  const isLoading = step === 'processing'

  const uploadAndExtract = async (file: File) => {
    console.log("Extracting", file.name);
    setStep('processing')
    setError(null)

    try {
      // Simulate network request and AI processing (2-3 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2500))

      // Generate realistic mock data
      const mockData: ExtractedCVData = {
        fullName: "Sarah Jenkins",
        jobTitle: "Senior Real Estate Consultant",
        company: "Prestige Properties",
        shortBio: "Dedicated real estate professional with over 8 years of experience specializing in luxury properties and off-plan sales. Proven track record of exceeding sales targets and delivering exceptional client experiences.",
        yearsOfExperience: "8",
        phone: "+1 555 123 4567",
        email: "sarah.jenkins@prestigeproperties.com",
        website: "https://sarahjenkins.realestate",
        linkedIn: "https://linkedin.com/in/sarahjenkins-re",
        specialization: "Luxury Property",
        strengths: ["Negotiation", "Client Relations"],
        experience: {
          jobTitle: "Senior Real Estate Consultant",
          company: "Prestige Properties",
          startDate: "05/2018",
          endDate: "Present",
          description: "Managed a portfolio of luxury properties, negotiating multi-million dollar deals and consistently ranking in the top 5% of agents nationwide."
        },
        achievement: {
          title: "Top Sales Agent 2023",
          description: "Closed over $45M in residential property sales, achieving the highest gross commission in the region."
        }
      }

      setExtractedData(mockData)
      setStep('review')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(message)
      setStep('error')
    }
  }

  const reset = () => {
    setStep('upload')
    setError(null)
    setExtractedData(null)
  }

  return { step, error, extractedData, isLoading, uploadAndExtract, reset }
}
