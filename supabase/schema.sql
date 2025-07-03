-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Problem solutions table
CREATE TABLE IF NOT EXISTS problem_solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  problem_description TEXT NOT NULL,
  solution_process TEXT NOT NULL,
  final_solution TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  difficulty VARCHAR(50) DEFAULT '중급' CHECK (difficulty IN ('초급', '중급', '고급')),
  status VARCHAR(50) DEFAULT '진행중' CHECK (status IN ('진행중', '완료')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT FALSE
);

-- Teams table (Phase 2용)
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE
);

-- Team members table (Phase 2용)
CREATE TABLE IF NOT EXISTS team_members (
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (team_id, user_id)
);

-- Shared links table (Phase 3용)
CREATE TABLE IF NOT EXISTS shared_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_solution_id UUID REFERENCES problem_solutions(id) ON DELETE CASCADE,
  share_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_problem_solutions_user_id ON problem_solutions(user_id);
CREATE INDEX IF NOT EXISTS idx_problem_solutions_created_at ON problem_solutions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_problem_solutions_is_public ON problem_solutions(is_public);
CREATE INDEX IF NOT EXISTS idx_problem_solutions_tags ON problem_solutions USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_shared_links_token ON shared_links(share_token);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE problem_solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_links ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Problem solutions policies
CREATE POLICY "Users can view their own problem solutions" ON problem_solutions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view public problem solutions" ON problem_solutions
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can insert their own problem solutions" ON problem_solutions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own problem solutions" ON problem_solutions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own problem solutions" ON problem_solutions
  FOR DELETE USING (auth.uid() = user_id);

-- Teams policies (Phase 2용)
CREATE POLICY "Team members can view team info" ON teams
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members 
      WHERE team_id = teams.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Team owners can update team info" ON teams
  FOR UPDATE USING (auth.uid() = owner_id);

-- Team members policies (Phase 2용)
CREATE POLICY "Team members can view team members" ON team_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.team_id = team_members.team_id AND tm.user_id = auth.uid()
    )
  );

-- Shared links policies (Phase 3용)
CREATE POLICY "Anyone can view shared links" ON shared_links
  FOR SELECT USING (true);

CREATE POLICY "Users can create shared links for their problem solutions" ON shared_links
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM problem_solutions 
      WHERE id = problem_solution_id AND user_id = auth.uid()
    )
  );

-- Functions for updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_problem_solutions_updated_at BEFORE UPDATE ON problem_solutions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 