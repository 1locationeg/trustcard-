export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string | null
          email: string
          avatar_url: string | null
          auth_provider: string | null
          google_user_id: string | null
          is_onboarding_completed: boolean
          preferred_locale: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email: string
          avatar_url?: string | null
          auth_provider?: string | null
          google_user_id?: string | null
          is_onboarding_completed?: boolean
          preferred_locale?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          avatar_url?: string | null
          auth_provider?: string | null
          google_user_id?: string | null
          is_onboarding_completed?: boolean
          preferred_locale?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      trust_cards: {
        Row: {
          id: string
          user_id: string
          slug: string | null
          selected_goal: string | null
          full_name: string | null
          job_title: string | null
          company: string | null
          profile_photo: string | null
          specialization: string | null
          strengths: string | null
          years_of_experience: string | null
          short_bio: string | null
          experience: Json | null
          achievement: Json | null
          phone: string | null
          linkedin: string | null
          website: string | null
          trust_score: number
          profile_completion: number
          verification_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          slug?: string | null
          selected_goal?: string | null
          full_name?: string | null
          job_title?: string | null
          company?: string | null
          profile_photo?: string | null
          specialization?: string | null
          strengths?: string | null
          years_of_experience?: string | null
          short_bio?: string | null
          experience?: Json | null
          achievement?: Json | null
          phone?: string | null
          linkedin?: string | null
          website?: string | null
          trust_score?: number
          profile_completion?: number
          verification_status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          slug?: string | null
          selected_goal?: string | null
          full_name?: string | null
          job_title?: string | null
          company?: string | null
          profile_photo?: string | null
          specialization?: string | null
          strengths?: string | null
          years_of_experience?: string | null
          short_bio?: string | null
          experience?: Json | null
          achievement?: Json | null
          phone?: string | null
          linkedin?: string | null
          website?: string | null
          trust_score?: number
          profile_completion?: number
          verification_status?: string
          created_at?: string
          updated_at?: string
        }

        Relationships: [
          {
            foreignKeyName: "trust_cards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      analytics_events: {
        Row: {
          id: string
          owner_user_id: string
          visitor_id: string | null
          event_type: string
          source: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          owner_user_id: string
          visitor_id?: string | null
          event_type: string
          source?: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          owner_user_id?: string
          visitor_id?: string | null
          event_type?: string
          source?: string
          metadata?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
