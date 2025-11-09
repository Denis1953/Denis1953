-- Remove date_naissance and lieu_naissance columns from proxy_requests table
ALTER TABLE proxy_requests 
DROP COLUMN IF EXISTS date_naissance,
DROP COLUMN IF EXISTS lieu_naissance;