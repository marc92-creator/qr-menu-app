import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { checkRateLimit, getIdentifier, createRateLimitResponse, RateLimitPresets } from '@/lib/rateLimit';
import { aiTranslateSchema, validate } from '@/lib/validation';

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
    const validation = validate(aiTranslateSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { texts, fromLang, toLang } = validation.data;

    const langNames: Record<string, string> = {
      de: 'German',
      en: 'English',
      fr: 'French',
      it: 'Italian',
      es: 'Spanish',
      tr: 'Turkish',
      ar: 'Arabic',
      pl: 'Polish',
    };

    const prompt = `Translate the following restaurant menu texts from ${langNames[fromLang]} to ${langNames[toLang]}.

Keep translations:
- Natural and appetizing (restaurant/menu context)
- Accurate to original meaning
- Using appropriate culinary terminology
- Professional and inviting tone

Texts to translate (JSON array):
${JSON.stringify(texts, null, 2)}

Reply ONLY with a JSON array of translated texts in the same order. No explanations, no markdown code blocks, just the pure JSON array.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0].type === 'text' ? message.content[0].text.trim() : '[]';

    // Remove markdown code blocks if present
    const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();

    let translations;
    try {
      translations = JSON.parse(cleanContent);
    } catch {
      console.error('Failed to parse AI response:', cleanContent);
      return NextResponse.json(
        { error: 'Invalid response from AI' },
        { status: 500 }
      );
    }

    if (!Array.isArray(translations)) {
      return NextResponse.json(
        { error: 'AI response was not an array' },
        { status: 500 }
      );
    }

    return NextResponse.json({ translations });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Failed to translate' },
      { status: 500 }
    );
  }
}
