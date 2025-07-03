import { Database } from '@/lib/supabase'

// 테이블 타입 추출
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// 구체적인 타입 정의
export type User = Tables<'users'>
export type ProblemSolution = Tables<'problem_solutions'>
export type Team = Tables<'teams'>
export type TeamMember = Tables<'team_members'>
export type SharedLink = Tables<'shared_links'>

// 인증 관련 타입
export type AuthUser = {
  id: string
  email: string
  name?: string
  avatar_url?: string
}

// API 응답 타입
export type ApiResponse<T> = {
  data: T | null
  error: string | null
}

// 페이지네이션 타입
export type PaginationParams = {
  page: number
  limit: number
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
} 