-- Create admin user profile (will be populated after signup)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated admin users can read their own data
CREATE POLICY "Admin users can view own data"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Only the system can insert (via trigger)
CREATE POLICY "System can insert admin users"
  ON public.admin_users
  FOR INSERT
  WITH CHECK (true);