/**
 * String Utility Functions for Smart Food Matching
 * Provides normalization, fuzzy matching, and similarity scoring
 */

/**
 * Common typos and character confusions in German food names
 */
const COMMON_TYPO_CORRECTIONS: [RegExp, string][] = [
  // Double letter issues
  [/nn/g, 'n'],
  [/mm/g, 'm'],
  [/ll/g, 'l'],
  [/ss/g, 's'],
  [/tt/g, 't'],
  [/pp/g, 'p'],
  [/ff/g, 'f'],
  // Common misspellings
  [/ck/g, 'k'],
  [/ph/g, 'f'],
  [/th/g, 't'],
  // German/English confusions
  [/sch/g, 'sh'],
  [/tsch/g, 'ch'],
];

/**
 * Normalize German text for better matching
 * - Removes diacritics (ä→ae, ö→oe, ü→ue, ß→ss)
 * - Converts to lowercase
 * - Removes extra whitespace
 * - Handles various special characters
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    // German umlauts
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    // French accents
    .replace(/é/g, 'e')
    .replace(/è/g, 'e')
    .replace(/ê/g, 'e')
    .replace(/ë/g, 'e')
    .replace(/á/g, 'a')
    .replace(/à/g, 'a')
    .replace(/â/g, 'a')
    .replace(/ã/g, 'a')
    .replace(/í/g, 'i')
    .replace(/ì/g, 'i')
    .replace(/î/g, 'i')
    .replace(/ï/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ò/g, 'o')
    .replace(/ô/g, 'o')
    .replace(/õ/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ù/g, 'u')
    .replace(/û/g, 'u')
    // Other special characters
    .replace(/ç/g, 'c')
    .replace(/ñ/g, 'n')
    .replace(/ý/g, 'y')
    .replace(/ÿ/g, 'y')
    // Turkish characters
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    // Remove punctuation that's not meaningful
    .replace(/[''`´]/g, '')
    .replace(/[-–—]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Apply common typo corrections for fuzzy matching
 */
export function applyTypoCorrections(text: string): string {
  let result = text.toLowerCase();
  for (const [pattern, replacement] of COMMON_TYPO_CORRECTIONS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

/**
 * Levenshtein distance for fuzzy string matching
 * Returns the minimum number of single-character edits needed
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  // Initialize matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[len1][len2];
}

/**
 * Calculate similarity score (0-1) between two strings
 * 1.0 = identical, 0.0 = completely different
 */
export function similarityScore(str1: string, str2: string): number {
  const distance = levenshteinDistance(str1, str2);
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return 1.0;
  return 1.0 - distance / maxLen;
}

/**
 * Check if a string fuzzy-matches a keyword
 * Allows for typos and similar spellings
 *
 * Enhanced matching:
 * - Normalization (umlauts, accents)
 * - Typo correction
 * - Word-by-word matching
 * - Prefix matching for longer words
 * - Substring matching for compound words
 */
export function fuzzyMatch(
  text: string,
  keyword: string,
  threshold: number = 0.85
): boolean {
  const normalizedText = normalizeText(text);
  const normalizedKeyword = normalizeText(keyword);

  // Exact match after normalization
  if (normalizedText.includes(normalizedKeyword)) return true;
  if (normalizedKeyword.includes(normalizedText)) return true;

  // Try with typo corrections applied
  const correctedText = applyTypoCorrections(normalizedText);
  const correctedKeyword = applyTypoCorrections(normalizedKeyword);
  if (correctedText.includes(correctedKeyword)) return true;
  if (correctedKeyword.includes(correctedText)) return true;

  // Word-by-word fuzzy matching
  const textWords = normalizedText.split(' ');
  const keywordWords = normalizedKeyword.split(' ');

  for (const textWord of textWords) {
    for (const keywordWord of keywordWords) {
      // Skip very short words (less likely to be meaningful matches)
      if (textWord.length < 3 || keywordWord.length < 3) continue;

      // Exact word match
      if (textWord === keywordWord) return true;

      // Similarity score
      const score = similarityScore(textWord, keywordWord);
      if (score >= threshold) return true;

      // Prefix matching for longer words (helpful for German compounds)
      const minPrefixLength = Math.min(textWord.length, keywordWord.length, 4);
      if (minPrefixLength >= 4) {
        const textPrefix = textWord.substring(0, minPrefixLength);
        const keywordPrefix = keywordWord.substring(0, minPrefixLength);
        if (textPrefix === keywordPrefix) {
          // Matching prefix - check overall similarity with lower threshold
          if (score >= 0.7) return true;
        }
      }

      // One word contains the other (for compound words)
      if (textWord.length >= 5 && keywordWord.length >= 5) {
        if (textWord.includes(keywordWord) || keywordWord.includes(textWord)) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Calculate match quality score for ranking
 * Higher score = better match
 */
export function calculateMatchScore(
  dishName: string,
  keyword: string,
  isExactMatch: boolean = false
): number {
  const normalizedDish = normalizeText(dishName);
  const normalizedKeyword = normalizeText(keyword);

  // Exact match = highest score
  if (isExactMatch || normalizedDish === normalizedKeyword) {
    return 100 + keyword.length;
  }

  // Contains exact keyword
  if (normalizedDish.includes(normalizedKeyword)) {
    // Longer keywords = better match
    // Keywords at start = bonus
    const keywordLength = normalizedKeyword.length;
    const startsWithKeyword = normalizedDish.startsWith(normalizedKeyword) ? 20 : 0;
    return 50 + keywordLength + startsWithKeyword;
  }

  // Fuzzy match - calculate similarity
  const similarity = similarityScore(normalizedDish, normalizedKeyword);
  if (similarity >= 0.85) {
    return 30 + Math.floor(similarity * 20);
  }

  return 0;
}

/**
 * Extract words from text for word-level matching
 */
export function extractWords(text: string): string[] {
  return normalizeText(text).split(' ').filter(w => w.length > 0);
}
