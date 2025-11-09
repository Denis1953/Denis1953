-- Create table for volunteer responses
CREATE TABLE public.volunteer_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  activities TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.volunteer_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form)
CREATE POLICY "Anyone can submit volunteer form" 
ON public.volunteer_responses 
FOR INSERT 
WITH CHECK (true);

-- Create policy to prevent reading (only backend should read)
CREATE POLICY "Only backend can read responses" 
ON public.volunteer_responses 
FOR SELECT 
USING (false);