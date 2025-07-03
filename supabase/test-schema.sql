-- 테스트용 간단한 스키마
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 기존 테이블 삭제 (있다면)
DROP TABLE IF EXISTS problem_solutions CASCADE;

-- Problem solutions table (외래 키 제약조건 없음)
CREATE TABLE IF NOT EXISTS problem_solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  problem_description TEXT NOT NULL,
  solution_process TEXT NOT NULL,
  final_solution TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  difficulty VARCHAR(50) NOT NULL DEFAULT '중급' CHECK (difficulty IN ('초급', '중급', '고급')),
  status VARCHAR(50) DEFAULT '진행중' CHECK (status IN ('진행중', '완료')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL,
  is_public BOOLEAN DEFAULT FALSE
);

-- 기본 인덱스
CREATE INDEX IF NOT EXISTS idx_problem_solutions_user_id ON problem_solutions(user_id);
CREATE INDEX IF NOT EXISTS idx_problem_solutions_created_at ON problem_solutions(created_at DESC);

-- RLS 비활성화 (테스트용)
ALTER TABLE problem_solutions DISABLE ROW LEVEL SECURITY; 