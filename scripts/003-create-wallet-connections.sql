-- Create wallet connections table for crypto wallet authentication
CREATE TABLE IF NOT EXISTS wallet_connections (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    wallet_type VARCHAR(20) NOT NULL DEFAULT 'ethereum',
    is_primary BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster wallet lookups
CREATE INDEX IF NOT EXISTS idx_wallet_address ON wallet_connections(wallet_address);
CREATE INDEX IF NOT EXISTS idx_wallet_user_id ON wallet_connections(user_id);
