# AI Features Documentation

## Setup

Add your Anthropic API key to `.env.local`:

```bash
ANTHROPIC_API_KEY=sk-ant-...
```

## API Endpoints

### 1. Dish Description Generator

**POST** `/api/ai/describe-dish`

Generates an appetizing description for a dish using AI.

**Request:**
```json
{
  "dishName": "Döner im Brot",
  "ingredients": "frischer Salat, Tomaten, Zwiebeln",
  "category": "Döner & Wraps",
  "language": "de" // or "en"
}
```

**Response:**
```json
{
  "description": "Saftiges Döner-Fleisch im knusprigen Brot, verfeinert mit frischem Salat, Tomaten und Zwiebeln."
}
```

**Usage Example:**
```typescript
const response = await fetch('/api/ai/describe-dish', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    dishName: 'Döner im Brot',
    language: 'de',
  }),
});

const { description } = await response.json();
```

### 2. Bulk Translation

**POST** `/api/ai/translate`

Translates multiple menu texts at once, maintaining culinary terminology.

**Request:**
```json
{
  "texts": [
    "Döner im Brot",
    "Mit frischem Salat und Soße",
    "Pommes Frites"
  ],
  "fromLang": "de",
  "toLang": "en"
}
```

**Response:**
```json
{
  "translations": [
    "Döner in Bread",
    "With fresh salad and sauce",
    "French Fries"
  ]
}
```

**Supported Languages:**
- German (de)
- English (en)
- French (fr)
- Italian (it)
- Spanish (es)
- Turkish (tr)
- Arabic (ar)
- Polish (pl)

## UI Integration (TODO)

### Dish Editor

Add "Generate with AI" button next to description fields:

```tsx
import { Sparkles } from 'lucide-react';

<button
  onClick={generateDescription}
  disabled={!dishName || isGenerating}
>
  <Sparkles size={16} />
  {isGenerating ? 'Generating...' : 'Generate with AI'}
</button>
```

### Settings - Bulk Translation

Add "Translate All" button in restaurant settings:

```tsx
<button onClick={translateAllToEnglish}>
  <Languages size={18} />
  Translate all to English
</button>
```

## Error Handling

Both APIs return:
- `503` if `ANTHROPIC_API_KEY` is not configured
- `400` for missing required fields
- `500` for AI processing errors

## Cost Optimization

- Description generator: ~150 tokens per request (~$0.0003)
- Bulk translation: ~100-500 tokens per request depending on text length
- Uses Claude Sonnet 4 for best quality/cost ratio

## Rate Limiting

Consider implementing rate limiting on the client side:
- Max 10 descriptions per minute
- Max 1 bulk translation per 30 seconds
