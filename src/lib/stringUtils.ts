/**
 * String Utility Functions for Smart Food Matching
 * Provides normalization, fuzzy matching, and similarity scoring
 */

/**
 * Normalize German text for better matching
 * - Removes diacritics (ä→a, ö→o, ü→u, ß→ss)
 * - Converts to lowercase
 * - Removes extra whitespace
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/é/g, 'e')
    .replace(/è/g, 'e')
    .replace(/ê/g, 'e')
    .replace(/á/g, 'a')
    .replace(/à/g, 'a')
    .replace(/â/g, 'a')
    .replace(/í/g, 'i')
    .replace(/ì/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ò/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ù/g, 'u')
    .replace(/ç/g, 'c')
    .replace(/ñ/g, 'n')
    .trim()
    .replace(/\s+/g, ' ');
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

  // Word-by-word fuzzy matching
  const textWords = normalizedText.split(' ');
  const keywordWords = normalizedKeyword.split(' ');

  for (const textWord of textWords) {
    for (const keywordWord of keywordWords) {
      const score = similarityScore(textWord, keywordWord);
      if (score >= threshold) return true;
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
