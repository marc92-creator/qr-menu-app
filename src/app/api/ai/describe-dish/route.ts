import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { checkRateLimit, getIdentifier, createRateLimitResponse, RateLimitPresets } from '@/lib/rateLimit';
import { aiDescribeDishSchema, validate } from '@/lib/validation';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    // Rate limiting - very strict for AI API (10 req/min)
    const identifier = getIdentifier(req);
    const rateLimit = checkRateLimit(identifier, RateLimitPresets.AI_API);

    if (!rateLimit.success) {
      return createRateLimitResponse(rateLimit);
    }

    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI feature not configured. Please add ANTHROPIC_API_KEY to .env.local' },
        { status: 503 }
      );
    }

    const body = await req.json();

    // Input validation with Zod
    const validation = validate(aiDescribeDishSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { dishName, ingredients, category, language } = validation.data;

    const prompt = language === 'de'
      ? `Erstelle eine appetitliche, kurze Beschreibung (max. 2 Sätze, ca. 20-30 Wörter) für folgendes Gericht:

Name: ${dishName}
${ingredients ? `Zutaten: ${ingredients}` : ''}
${category ? `Kategorie: ${category}` : ''}

Die Beschreibung soll:
- Appetit machen und zum Bestellen anregen
- Die wichtigsten Geschmacksrichtungen oder Besonderheiten hervorheben
- Professionell aber einladend klingen
- Keine Preise oder Allergene enthalten

Antworte NUR mit der Beschreibung, ohne Anführungszeichen oder Erklärungen.`
      : `Create an appetizing, short description (max 2 sentences, about 20-30 words) for this dish:

Name: ${dishName}
${ingredients ? `Ingredients: ${ingredients}` : ''}
${category ? `Category: ${category}` : ''}

The description should:
- Make the reader hungry and want to order
- Highlight key flavors or special features
- Sound professional but inviting
- Not include prices or allergens

Reply ONLY with the description, no quotes or explanations.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 150,
      messages: [{ role: 'user', content: prompt }],
    });

    const description = message.content[0].type === 'text'
      ? message.content[0].text.trim()
      : '';

    return NextResponse.json({ description });
  } catch (error) {
    console.error('AI description error:', error);
    return NextResponse.json(
      { error: 'Failed to generate description' },
      { status: 500 }
    );
  }
}
