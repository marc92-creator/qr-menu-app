-- Add trial system fields to restaurants table
-- Simple approach: 14 days free trial, then subscription required

-- Add trial_ends_at field to track when trial expires
ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP WITH TIME ZONE;

-- Set default trial period (14 days from creation) for new restaurants
-- Existing restaurants without trial_ends_at will need to be handled in application logic

COMMENT ON COLUMN restaurants.trial_ends_at IS 'When the 14-day free trial expires. NULL means legacy restaurant (treat as expired or use created_at + 14 days)';

-- Add index for efficient querying of trial status
CREATE INDEX IF NOT EXISTS idx_restaurants_trial_ends_at ON restaurants (trial_ends_at);
