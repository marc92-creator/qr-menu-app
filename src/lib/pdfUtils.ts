import { ThemeConfig } from './themes';

export interface PDFColors {
  primary: [number, number, number];
  text: [number, number, number];
  textMuted: [number, number, number];
  background: [number, number, number];
  accent: [number, number, number];
  priceColor: [number, number, number];
}

/**
 * Convert hex color to RGB tuple for jsPDF
 */
export function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '');
  return [
    parseInt(cleanHex.substring(0, 2), 16),
    parseInt(cleanHex.substring(2, 4), 16),
    parseInt(cleanHex.substring(4, 6), 16),
  ];
}

/**
 * Extract solid color from a gradient or return the color as-is
 */
export function extractColor(colorValue: string): string {
  // If it's a gradient, extract the first hex color
  if (colorValue.includes('gradient')) {
    const match = colorValue.match(/#[a-fA-F0-9]{6}/);
    return match ? match[0] : '#10b981'; // fallback to emerald-500
  }
  // If it's already a hex color, return it
  if (colorValue.startsWith('#')) {
    return colorValue;
  }
  // If it's an rgba or rgb, try to extract values
  const rgbaMatch = colorValue.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1], 10).toString(16).padStart(2, '0');
    const g = parseInt(rgbaMatch[2], 10).toString(16).padStart(2, '0');
    const b = parseInt(rgbaMatch[3], 10).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }
  // Fallback
  return '#10b981';
}

/**
 * Get PDF-compatible colors from a ThemeConfig
 */
export function getPDFColorsFromTheme(theme: ThemeConfig): PDFColors {
  const { styles } = theme;

  return {
    primary: hexToRgb(extractColor(styles.primary)),
    text: hexToRgb(extractColor(styles.text)),
    textMuted: hexToRgb(extractColor(styles.textMuted)),
    background: hexToRgb(extractColor(styles.background)),
    accent: hexToRgb(extractColor(styles.accent)),
    priceColor: hexToRgb(extractColor(styles.priceColor)),
  };
}

/**
 * Get default PDF colors (emerald theme)
 */
export function getDefaultPDFColors(): PDFColors {
  return {
    primary: [16, 185, 129],    // emerald-500
    text: [31, 41, 55],         // gray-800
    textMuted: [107, 114, 128], // gray-500
    background: [255, 255, 255], // white
    accent: [16, 185, 129],     // emerald-500
    priceColor: [16, 185, 129], // emerald-500
  };
}
