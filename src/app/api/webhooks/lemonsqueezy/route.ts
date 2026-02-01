import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Lemon Squeezy webhook event types
interface LemonSqueezyWebhookEvent {
  meta: {
    event_name: string;
    custom_data?: {
      restaurant_id?: string;
      user_id?: string;
    };
  };
  data: {
    id: string;
    type: string;
    attributes: {
      store_id: number;
      customer_id: number;
      order_id: number;
      product_id: number;
      variant_id: number;
      user_name: string;
      user_email: string;
      status: string;
      status_formatted: string;
      card_brand: string | null;
      card_last_four: string | null;
      pause: null | object;
      cancelled: boolean;
      trial_ends_at: string | null;
      billing_anchor: number;
      first_subscription_item: {
        id: number;
        subscription_id: number;
        price_id: number;
        quantity: number;
        created_at: string;
        updated_at: string;
      } | null;
      urls: {
        update_payment_method: string;
        customer_portal: string;
      };
      renews_at: string | null;
      ends_at: string | null;
      created_at: string;
      updated_at: string;
      test_mode: boolean;
    };
  };
}

// Verify webhook signature
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('x-signature');

  // Use service role for webhook (no user session)
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Verify webhook signature (REQUIRED)
  const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('[LemonSqueezy Webhook] CRITICAL: LEMON_SQUEEZY_WEBHOOK_SECRET not configured!');
    return NextResponse.json(
      { error: 'Webhook not configured' },
      { status: 500 }
    );
  }

  if (!signature) {
    console.error('[LemonSqueezy Webhook] Missing signature header');
    return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
  }

  try {
    const isValid = verifySignature(body, signature, webhookSecret);
    if (!isValid) {
      console.error('[LemonSqueezy Webhook] Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  } catch (err) {
    console.error('[LemonSqueezy Webhook] Signature verification error:', err);
    return NextResponse.json({ error: 'Signature verification failed' }, { status: 401 });
  }

  let event: LemonSqueezyWebhookEvent;
  try {
    event = JSON.parse(body);
  } catch (err) {
    console.error('[LemonSqueezy Webhook] Invalid JSON:', err);
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const eventName = event.meta.event_name;
  const customData = event.meta.custom_data || {};
  const attributes = event.data.attributes;

  console.log(`[LemonSqueezy Webhook] Event: ${eventName}`, {
    customer_id: attributes.customer_id,
    subscription_id: event.data.id,
    user_email: attributes.user_email,
    status: attributes.status,
    custom_data: customData,
  });

  try {
    // Get user_id from custom data or find by email
    let userId = customData.user_id;
    const restaurantId = customData.restaurant_id;

    // If no user_id in custom data, try to find user by email
    if (!userId && attributes.user_email) {
      // First try to find a restaurant owner with this email
      const { data: authUser } = await supabaseAdmin.auth.admin.listUsers();
      const matchingUser = authUser.users.find(u => u.email === attributes.user_email);

      if (matchingUser) {
        userId = matchingUser.id;
        console.log(`[LemonSqueezy Webhook] Found user by email: ${userId}`);
      }
    }

    // If still no user and we have restaurant_id, get owner from restaurant
    if (!userId && restaurantId) {
      const { data: restaurant } = await supabaseAdmin
        .from('restaurants')
        .select('owner_id')
        .eq('id', restaurantId)
        .single();

      if (restaurant?.owner_id) {
        userId = restaurant.owner_id;
        console.log(`[LemonSqueezy Webhook] Found user by restaurant: ${userId}`);
      }
    }

    if (!userId) {
      console.error('[LemonSqueezy Webhook] Could not determine user_id', {
        custom_data: customData,
        email: attributes.user_email,
      });
      // Still return 200 to acknowledge receipt
      return NextResponse.json({ received: true, warning: 'User not found' });
    }

    switch (eventName) {
      case 'subscription_created':
      case 'subscription_updated':
      case 'subscription_resumed': {
        const isActive = attributes.status === 'active' || attributes.status === 'on_trial';

        // Check if subscription exists
        const { data: existingSub } = await supabaseAdmin
          .from('subscriptions')
          .select('id')
          .eq('user_id', userId)
          .single();

        const subscriptionData = {
          plan: 'basic', // Pro plan in our system
          status: isActive ? 'active' : attributes.status,
          lemon_squeezy_customer_id: String(attributes.customer_id),
          lemon_squeezy_subscription_id: String(event.data.id),
          current_period_end: attributes.renews_at || attributes.ends_at,
          updated_at: new Date().toISOString(),
        };

        if (existingSub) {
          // Update existing subscription
          await supabaseAdmin
            .from('subscriptions')
            .update(subscriptionData)
            .eq('user_id', userId);

          console.log(`[LemonSqueezy Webhook] Updated subscription for user: ${userId}`);
        } else {
          // Create new subscription
          await supabaseAdmin
            .from('subscriptions')
            .insert({
              user_id: userId,
              ...subscriptionData,
              created_at: new Date().toISOString(),
            });

          console.log(`[LemonSqueezy Webhook] Created subscription for user: ${userId}`);
        }
        break;
      }

      case 'subscription_cancelled':
      case 'subscription_expired': {
        await supabaseAdmin
          .from('subscriptions')
          .update({
            status: 'canceled',
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        console.log(`[LemonSqueezy Webhook] Cancelled subscription for user: ${userId}`);
        break;
      }

      case 'subscription_paused': {
        await supabaseAdmin
          .from('subscriptions')
          .update({
            status: 'paused',
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        console.log(`[LemonSqueezy Webhook] Paused subscription for user: ${userId}`);
        break;
      }

      case 'subscription_payment_success': {
        // Just log - subscription_updated should handle status
        console.log(`[LemonSqueezy Webhook] Payment success for user: ${userId}`);
        break;
      }

      case 'subscription_payment_failed': {
        await supabaseAdmin
          .from('subscriptions')
          .update({
            status: 'past_due',
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        console.log(`[LemonSqueezy Webhook] Payment failed for user: ${userId}`);
        break;
      }

      case 'order_created': {
        // For one-time purchases (if we ever use them)
        console.log(`[LemonSqueezy Webhook] Order created for user: ${userId}`);
        break;
      }

      default:
        console.log(`[LemonSqueezy Webhook] Unhandled event: ${eventName}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[LemonSqueezy Webhook] Error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Lemon Squeezy sends GET requests to verify the endpoint
export async function GET() {
  return NextResponse.json({ status: 'Lemon Squeezy webhook endpoint active' });
}
