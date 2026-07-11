import { Metadata } from "next"
import { PublicProfileClient } from "@/components/profile/public-profile-client"

interface PublicProfilePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PublicProfilePageProps): Promise<Metadata> {
  const { slug } = await params
  
  // In a real application, this would fetch from an API:
  // const user = await fetchUserBySlug(slug)
  
  // For the MVP architecture, we generate a title approximation from the slug
  const nameFromSlug = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const title = `${nameFromSlug} | Trust Card | R8ESTATE`
  const description = `View ${nameFromSlug}'s professional Trust Card on R8ESTATE.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      // images: [{ url: '/api/og?slug=' + slug }] // Future architecture
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    }
  }
}

export async function generateStaticParams() {
  return [
    { slug: "user" },
    { slug: "sarah-jenkins" },
    { slug: "ahmed-hassan" }
  ]
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { slug } = await params
  return <PublicProfileClient slug={slug} />
}

