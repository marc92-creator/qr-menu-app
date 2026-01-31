import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI feature not configured. Please add ANTHROPIC_API_KEY to .env.local' },
        { status: 503 }
      );
    }

    const { texts, fromLang = 'de', toLang = 'en' } = await req.json();

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json({ error: 'Texts array required' }, { status: 400 });
    }

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
