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
      profiles: {
        Row: {
          id: string
          username: string
          user_type: 'Creator/Collaborator' | 'Mentor' | 'Investor'
          work_type: 'Full-Time' | 'Part-Time' | 'Contract'
          location: string
          skills: string[]
          interests: string[]
          github: string | null
          linkedin: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          user_type: 'Creator/Collaborator' | 'Mentor' | 'Investor'
          work_type: 'Full-Time' | 'Part-Time' | 'Contract'
          location: string
          skills: string[]
          interests: string[]
          github?: string | null
          linkedin?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          user_type?: 'Creator/Collaborator' | 'Mentor' | 'Investor'
          work_type?: 'Full-Time' | 'Part-Time' | 'Contract'
          location?: string
          skills?: string[]
          interests?: string[]
          github?: string | null
          linkedin?: string | null
          created_at?: string
          updated_at?: string
        }
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
  }
} 