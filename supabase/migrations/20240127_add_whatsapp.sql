-- Add WhatsApp number field for ordering/contact
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS whatsapp_number TEXT DEFAULT NULL;

-- Comment for documentation
COMMENT ON COLUMN restaurants.whatsapp_number IS 'WhatsApp phone number for customer orders/contact (format: +49...)';
