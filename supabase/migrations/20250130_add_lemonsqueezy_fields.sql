-- Add Lemon Squeezy fields to subscriptions table
-- These fields store the Lemon Squeezy IDs for subscription management

-- Add lemon_squeezy_customer_id column
ALTER TABLE subscriptions
ADD COLUMN IF NOT EXISTS lemon_squeezy_customer_id VARCHAR(255);

-- Add lemon_squeezy_subscription_id column
ALTER TABLE subscriptions
ADD COLUMN IF NOT EXISTS lemon_squeezy_subscription_id VARCHAR(255);

-- Add index for faster lookups by Lemon Squeezy IDs
CREATE INDEX IF NOT EXISTS idx_subscriptions_ls_customer_id
ON subscriptions (lemon_squeezy_customer_id);

CREATE INDEX IF NOT EXISTS idx_subscriptions_ls_subscription_id
ON subscriptions (lemon_squeezy_subscription_id);

-- Add comment for documentation
COMMENT ON COLUMN subscriptions.lemon_squeezy_customer_id IS 'Lemon Squeezy customer ID for payment management';
COMMENT ON COLUMN subscriptions.lemon_squeezy_subscription_id IS 'Lemon Squeezy subscription ID for recurring billing';
