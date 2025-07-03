import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      problem_solutions: {
        Row: {
          id: string
          title: string
          problem_description: string
          solution_process: string
          final_solution: string
          tags: string[]
          difficulty: '초급' | '중급' | '고급'
          status: '진행중' | '완료'
          created_at: string
          updated_at: string
          user_id: string
          is_public: boolean
        }
        Insert: {
          id?: string
          title: string
          problem_description: string
          solution_process: string
          final_solution: string
          tags?: string[]
          difficulty: '초급' | '중급' | '고급'
          status?: '진행중' | '완료'
          created_at?: string
          updated_at?: string
          user_id: string
          is_public?: boolean
        }
        Update: {
          id?: string
          title?: string
          problem_description?: string
          solution_process?: string
          final_solution?: string
          tags?: string[]
          difficulty?: '초급' | '중급' | '고급'
          status?: '진행중' | '완료'
          created_at?: string
          updated_at?: string
          user_id?: string
          is_public?: boolean
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          owner_id: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          owner_id: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          owner_id?: string
        }
      }
      team_members: {
        Row: {
          team_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member'
          joined_at: string
        }
        Insert: {
          team_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'member'
          joined_at?: string
        }
        Update: {
          team_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'member'
          joined_at?: string
        }
      }
      shared_links: {
        Row: {
          id: string
          problem_solution_id: string
          share_token: string
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          problem_solution_id: string
          share_token: string
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          problem_solution_id?: string
          share_token?: string
          expires_at?: string | null
          created_at?: string
        }
      }
    }
  }
} 