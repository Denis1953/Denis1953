-- Create table for proxy requests
CREATE TABLE public.proxy_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  date_naissance DATE NOT NULL,
  lieu_naissance TEXT NOT NULL,
  adresse TEXT NOT NULL,
  telephone TEXT NOT NULL,
  email TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.proxy_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit proxy requests
CREATE POLICY "Anyone can submit proxy request"
ON public.proxy_requests
FOR INSERT
WITH CHECK (true);

-- Only backend can read responses
CREATE POLICY "Only backend can read proxy requests"
ON public.proxy_requests
FOR SELECT
USING (false);