-- Create roadmap_waitlist table
CREATE TABLE IF NOT EXISTS roadmap_waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Add constraints
  CONSTRAINT unique_user_waitlist UNIQUE (user_id)
);

-- Add RLS policies
ALTER TABLE roadmap_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own data
CREATE POLICY insert_own_waitlist ON roadmap_waitlist
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow service role to read all data
CREATE POLICY read_all_waitlist ON roadmap_waitlist
  FOR SELECT TO service_role
  USING (true);
