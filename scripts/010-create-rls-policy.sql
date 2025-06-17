-- Create RLS policy to allow anonymous users to insert emails
CREATE POLICY "Allow anonymous email inserts" ON "Tweezy Email"
FOR INSERT TO anon
WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE "Tweezy Email" ENABLE ROW LEVEL SECURITY;
