-- Create waitlist table for email collection
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(50) DEFAULT 'landing_page',
  status VARCHAR(20) DEFAULT 'pending'
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Insert some sample data (optional)
INSERT INTO waitlist (email, source) VALUES 
  ('john@example.com', 'landing_page'),
  ('sarah@example.com', 'landing_page')
ON CONFLICT (email) DO NOTHING;
