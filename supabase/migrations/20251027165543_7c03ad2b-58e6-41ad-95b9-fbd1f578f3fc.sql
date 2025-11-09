-- Add column to store selected voting rounds
ALTER TABLE public.proxy_requests 
ADD COLUMN tours text[] DEFAULT '{}' NOT NULL;