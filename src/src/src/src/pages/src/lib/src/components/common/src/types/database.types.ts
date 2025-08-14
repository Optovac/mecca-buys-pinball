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
      submissions: {
        Row: {
          id: string
          created_at: string
          contact_info: Json
          machine_details: Json
          status: 'new' | 'contacted' | 'completed'
        }
        Insert: {
          id?: string
          created_at?: string
          contact_info: Json
          machine_details: Json
          status?: 'new' | 'contacted' | 'completed'
        }
        Update: {
          id?: string
          created_at?: string
          contact_info?: Json
          machine_details?: Json
          status?: 'new' | 'contacted' | 'completed'
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
