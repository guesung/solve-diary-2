import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { ProblemSolution, Inserts, Updates } from '@/types/supabase'

// 문제 해결 일지 목록 조회
export function useProblemSolutions(userId?: string, isPublic?: boolean) {
  return useQuery({
    queryKey: ['problem-solutions', userId, isPublic],
    queryFn: async () => {
      let query = supabase
        .from('problem_solutions')
        .select('*')
        .order('created_at', { ascending: false })

      if (userId) {
        query = query.eq('user_id', userId)
      }

      if (isPublic !== undefined) {
        query = query.eq('is_public', isPublic)
      }

      const { data, error } = await query

      if (error) {
        throw new Error(error.message)
      }

      return data as ProblemSolution[]
    },
    enabled: !!userId || isPublic !== undefined,
  })
}

// 단일 문제 해결 일지 조회
export function useProblemSolution(id: string) {
  return useQuery({
    queryKey: ['problem-solution', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('problem_solutions')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data as ProblemSolution
    },
    enabled: !!id,
  })
}

// 문제 해결 일지 생성
export function useCreateProblemSolution() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newSolution: Inserts<'problem_solutions'>) => {
      const { data, error } = await supabase
        .from('problem_solutions')
        .insert(newSolution)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data as ProblemSolution
    },
    onSuccess: (data) => {
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['problem-solutions'] })
      queryClient.setQueryData(['problem-solution', data.id], data)
    },
  })
}

// 문제 해결 일지 수정
export function useUpdateProblemSolution() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Updates<'problem_solutions'> }) => {
      const { data, error } = await supabase
        .from('problem_solutions')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data as ProblemSolution
    },
    onSuccess: (data) => {
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['problem-solutions'] })
      queryClient.setQueryData(['problem-solution', data.id], data)
    },
  })
}

// 문제 해결 일지 삭제
export function useDeleteProblemSolution() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('problem_solutions')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }

      return id
    },
    onSuccess: (id) => {
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['problem-solutions'] })
      queryClient.removeQueries({ queryKey: ['problem-solution', id] })
    },
  })
}

// 태그별 문제 해결 일지 조회
export function useProblemSolutionsByTag(tag: string) {
  return useQuery({
    queryKey: ['problem-solutions-by-tag', tag],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('problem_solutions')
        .select('*')
        .contains('tags', [tag])
        .eq('is_public', true)
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(error.message)
      }

      return data as ProblemSolution[]
    },
    enabled: !!tag,
  })
}

// 검색 기능
export function useSearchProblemSolutions(searchTerm: string) {
  return useQuery({
    queryKey: ['search-problem-solutions', searchTerm],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('problem_solutions')
        .select('*')
        .or(`title.ilike.%${searchTerm}%,problem_description.ilike.%${searchTerm}%,solution_process.ilike.%${searchTerm}%,final_solution.ilike.%${searchTerm}%`)
        .eq('is_public', true)
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(error.message)
      }

      return data as ProblemSolution[]
    },
    enabled: !!searchTerm && searchTerm.length > 2,
  })
}

 