-- Insert sample users for testing
INSERT INTO users (email, username, full_name, email_verified, password_hash) VALUES
('john.doe@example.com', 'johndoe', 'John Doe', true, '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK'),
('jane.smith@example.com', 'janesmith', 'Jane Smith', true, '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK'),
('demo@tweezy.ai', 'demouser', 'Demo User', true, '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK')
ON CONFLICT (email) DO NOTHING;

-- Insert sample wallet connections
INSERT INTO wallet_connections (user_id, wallet_address, wallet_type, is_primary, verified_at) VALUES
(1, '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d4d4', 'ethereum', true, CURRENT_TIMESTAMP),
(2, '0x8ba1f109551bD432803012645Hac136c22C177ec', 'ethereum', true, CURRENT_TIMESTAMP)
ON CONFLICT (wallet_address) DO NOTHING;

-- Insert sample OAuth accounts
INSERT INTO oauth_accounts (user_id, provider, provider_account_id, token_type) VALUES
(1, 'github', '12345678', 'bearer'),
(2, 'twitter', '87654321', 'bearer'),
(3, 'github', '11223344', 'bearer')
ON CONFLICT (provider, provider_account_id) DO NOTHING;
