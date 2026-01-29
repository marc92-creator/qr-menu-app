import { MenuTheme } from '@/types/database';

export interface ThemeStyles {
  // Base colors
  background: string;
  backgroundPattern?: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryLight: string;
  accent: string;
  border: string;

  // Header
  headerBg: string;
  headerBorder: string;

  // Cards
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  cardHoverTransform: string;
  cardHoverShadow: string;

  // Category pills
  pillBg: string;
  pillText: string;
  pillActiveBg: string;
  pillActiveText: string;
  pillHoverBg: string;

  // Badges (for item badges like vegan, popular)
  badgeVeganBg: string;
  badgeVeganText: string;
  badgePopularBg: string;
  badgePopularText: string;
  badgeSpecialBg: string;
  badgeSpecialText: string;
  badgeSoldOutBg: string;
  badgeSoldOutText: string;

  // Allergen badges
  allergenBg: string;
  allergenText: string;
  allergenBorder: string;
  allergenSelectedBg: string;
  allergenSelectedText: string;

  // Status badge (open/closed)
  statusOpenBg: string;
  statusOpenText: string;
  statusClosedBg: string;
  statusClosedText: string;

  // Price
  priceColor: string;

  // Footer
  footerBg: string;
  footerText: string;
  footerBorder: string;

  // Decorative elements
  decorativeGradient?: string;
  decorativePattern?: string;
}

export interface ThemeConfig {
  id: MenuTheme;
  name: string;
  description: string;
  preview: string;
  previewColors: string[]; // For mini preview cards
  styles: ThemeStyles;
}

// Classic Theme - Clean, minimalist, professional
const classicStyles: ThemeStyles = {
  background: '#f9fafb',
  surface: '#ffffff',
  surfaceHover: '#f3f4f6',
  text: '#111827',
  textMuted: '#6b7280',
  primary: '#10b981',
  primaryLight: '#d1fae5',
  accent: '#10b981',
  border: '#e5e7eb',

  headerBg: 'rgba(255, 255, 255, 0.95)',
  headerBorder: '#e5e7eb',

  cardBg: '#ffffff',
  cardBorder: '#e5e7eb',
  cardShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  cardHoverTransform: 'translateY(-2px)',
  cardHoverShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',

  pillBg: '#f3f4f6',
  pillText: '#6b7280',
  pillActiveBg: '#10b981',
  pillActiveText: '#ffffff',
  pillHoverBg: '#e5e7eb',

  badgeVeganBg: '#d1fae5',
  badgeVeganText: '#047857',
  badgePopularBg: '#fee2e2',
  badgePopularText: '#dc2626',
  badgeSpecialBg: '#fef3c7',
  badgeSpecialText: '#d97706',
  badgeSoldOutBg: '#fee2e2',
  badgeSoldOutText: '#991b1b',

  allergenBg: '#f3f4f6',
  allergenText: '#4b5563',
  allergenBorder: '#e5e7eb',
  allergenSelectedBg: '#10b981',
  allergenSelectedText: '#ffffff',

  statusOpenBg: '#d1fae5',
  statusOpenText: '#047857',
  statusClosedBg: '#fee2e2',
  statusClosedText: '#dc2626',

  priceColor: '#10b981',

  footerBg: '#f9fafb',
  footerText: '#9ca3af',
  footerBorder: '#e5e7eb',
};

// Dark Theme - Elegant, modern, neon accents
const darkStyles: ThemeStyles = {
  background: '#0a0a0f',
  backgroundPattern: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0a0a0f 100%)',
  surface: '#16162a',
  surfaceHover: '#1f1f3a',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  primary: '#22d3ee',
  primaryLight: '#164e63',
  accent: '#22d3ee',
  border: '#334155',

  headerBg: 'rgba(22, 22, 42, 0.95)',
  headerBorder: '#334155',

  cardBg: '#16162a',
  cardBorder: '#334155',
  cardShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
  cardHoverTransform: 'translateY(-4px)',
  cardHoverShadow: '0 8px 30px rgba(34, 211, 238, 0.15)',

  pillBg: '#1e293b',
  pillText: '#94a3b8',
  pillActiveBg: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
  pillActiveText: '#0f172a',
  pillHoverBg: '#334155',

  badgeVeganBg: '#064e3b',
  badgeVeganText: '#6ee7b7',
  badgePopularBg: '#7f1d1d',
  badgePopularText: '#fca5a5',
  badgeSpecialBg: '#78350f',
  badgeSpecialText: '#fcd34d',
  badgeSoldOutBg: '#7f1d1d',
  badgeSoldOutText: '#fca5a5',

  allergenBg: '#1e293b',
  allergenText: '#94a3b8',
  allergenBorder: '#334155',
  allergenSelectedBg: '#22d3ee',
  allergenSelectedText: '#0f172a',

  statusOpenBg: '#064e3b',
  statusOpenText: '#6ee7b7',
  statusClosedBg: '#7f1d1d',
  statusClosedText: '#fca5a5',

  priceColor: '#22d3ee',

  footerBg: '#0a0a0f',
  footerText: '#64748b',
  footerBorder: '#1e293b',

  decorativeGradient: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
};

// Rustic Theme - Warm earth tones, paper texture feel
const rusticStyles: ThemeStyles = {
  background: '#fef7ed',
  backgroundPattern: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(180, 130, 80, 0.03) 10px, rgba(180, 130, 80, 0.03) 20px)',
  surface: '#fffbf5',
  surfaceHover: '#fef3e2',
  text: '#451a03',
  textMuted: '#92400e',
  primary: '#b45309',
  primaryLight: '#fef3c7',
  accent: '#b45309',
  border: '#fcd34d',

  headerBg: 'linear-gradient(180deg, #fef3c7 0%, #fef7ed 100%)',
  headerBorder: '#fcd34d',

  cardBg: '#fffbf5',
  cardBorder: '#fde68a',
  cardShadow: '0 2px 8px rgba(180, 83, 9, 0.1)',
  cardHoverTransform: 'translateY(-2px)',
  cardHoverShadow: '0 6px 16px rgba(180, 83, 9, 0.15)',

  pillBg: '#fef3c7',
  pillText: '#92400e',
  pillActiveBg: '#b45309',
  pillActiveText: '#ffffff',
  pillHoverBg: '#fde68a',

  badgeVeganBg: '#d9f99d',
  badgeVeganText: '#3f6212',
  badgePopularBg: '#fecaca',
  badgePopularText: '#991b1b',
  badgeSpecialBg: '#fef08a',
  badgeSpecialText: '#854d0e',
  badgeSoldOutBg: '#fecaca',
  badgeSoldOutText: '#991b1b',

  allergenBg: '#fef3c7',
  allergenText: '#78350f',
  allergenBorder: '#fcd34d',
  allergenSelectedBg: '#b45309',
  allergenSelectedText: '#ffffff',

  statusOpenBg: '#d9f99d',
  statusOpenText: '#3f6212',
  statusClosedBg: '#fecaca',
  statusClosedText: '#991b1b',

  priceColor: '#b45309',

  footerBg: '#fef3c7',
  footerText: '#a16207',
  footerBorder: '#fcd34d',

  decorativePattern: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h20v20H0z\' fill=\'%23b45309\' fill-opacity=\'0.02\'/%3E%3C/svg%3E")',
};

// Modern Theme - Bold, geometric, vibrant gradients
const modernStyles: ThemeStyles = {
  background: '#faf5ff',
  backgroundPattern: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
  surface: '#ffffff',
  surfaceHover: '#faf5ff',
  text: '#1e1b4b',
  textMuted: '#6366f1',
  primary: '#8b5cf6',
  primaryLight: '#ede9fe',
  accent: '#8b5cf6',
  border: '#e9d5ff',

  headerBg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(250, 245, 255, 0.95))',
  headerBorder: '#e9d5ff',

  cardBg: '#ffffff',
  cardBorder: '#e9d5ff',
  cardShadow: '0 4px 16px rgba(139, 92, 246, 0.1)',
  cardHoverTransform: 'translateY(-4px) scale(1.01)',
  cardHoverShadow: '0 12px 28px rgba(139, 92, 246, 0.2)',

  pillBg: '#f3e8ff',
  pillText: '#7c3aed',
  pillActiveBg: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
  pillActiveText: '#ffffff',
  pillHoverBg: '#ede9fe',

  badgeVeganBg: '#d1fae5',
  badgeVeganText: '#047857',
  badgePopularBg: '#fce7f3',
  badgePopularText: '#be185d',
  badgeSpecialBg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
  badgeSpecialText: '#b45309',
  badgeSoldOutBg: '#fee2e2',
  badgeSoldOutText: '#991b1b',

  allergenBg: '#f3e8ff',
  allergenText: '#6b21a8',
  allergenBorder: '#e9d5ff',
  allergenSelectedBg: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
  allergenSelectedText: '#ffffff',

  statusOpenBg: '#d1fae5',
  statusOpenText: '#047857',
  statusClosedBg: '#fee2e2',
  statusClosedText: '#dc2626',

  priceColor: '#7c3aed',

  footerBg: 'linear-gradient(180deg, #faf5ff, #f3e8ff)',
  footerText: '#a78bfa',
  footerBorder: '#e9d5ff',

  decorativeGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(167, 139, 250, 0.05) 100%)',
};

// Oriental Theme - Gold accents, ornamental, luxurious
const orientalStyles: ThemeStyles = {
  background: '#fffbeb',
  backgroundPattern: 'radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.1) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 40%)',
  surface: '#ffffff',
  surfaceHover: '#fef3c7',
  text: '#451a03',
  textMuted: '#a16207',
  primary: '#d97706',
  primaryLight: '#fef3c7',
  accent: '#d97706',
  border: '#fbbf24',

  headerBg: 'linear-gradient(135deg, rgba(254, 243, 199, 0.95), rgba(255, 251, 235, 0.95))',
  headerBorder: '#fbbf24',

  cardBg: '#ffffff',
  cardBorder: '#fcd34d',
  cardShadow: '0 4px 16px rgba(217, 119, 6, 0.1)',
  cardHoverTransform: 'translateY(-3px)',
  cardHoverShadow: '0 8px 24px rgba(217, 119, 6, 0.2), inset 0 0 0 1px rgba(251, 191, 36, 0.3)',

  pillBg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
  pillText: '#92400e',
  pillActiveBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
  pillActiveText: '#ffffff',
  pillHoverBg: '#fde68a',

  badgeVeganBg: '#d9f99d',
  badgeVeganText: '#3f6212',
  badgePopularBg: '#fee2e2',
  badgePopularText: '#dc2626',
  badgeSpecialBg: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
  badgeSpecialText: '#ffffff',
  badgeSoldOutBg: '#fee2e2',
  badgeSoldOutText: '#991b1b',

  allergenBg: '#fef3c7',
  allergenText: '#92400e',
  allergenBorder: '#fbbf24',
  allergenSelectedBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
  allergenSelectedText: '#ffffff',

  statusOpenBg: '#d9f99d',
  statusOpenText: '#3f6212',
  statusClosedBg: '#fee2e2',
  statusClosedText: '#dc2626',

  priceColor: '#d97706',

  footerBg: 'linear-gradient(180deg, #fef3c7, #fffbeb)',
  footerText: '#b45309',
  footerBorder: '#fbbf24',

  decorativeGradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 100%)',
  decorativePattern: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 1px, transparent 1px)',
};

export const THEMES: Record<MenuTheme, ThemeConfig> = {
  classic: {
    id: 'classic',
    name: 'Classic',
    description: 'Hell, sauber und minimalistisch - perfekt für jeden Anlass',
    preview: '⬜',
    previewColors: ['#ffffff', '#10b981', '#f3f4f6'],
    styles: classicStyles,
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    description: 'Elegant mit Neon-Akzenten - modern und stilvoll',
    preview: '⬛',
    previewColors: ['#0a0a0f', '#22d3ee', '#16162a'],
    styles: darkStyles,
  },
  rustic: {
    id: 'rustic',
    name: 'Rustic',
    description: 'Warme Erdtöne - gemütlich wie ein Landgasthaus',
    preview: '🟫',
    previewColors: ['#fef7ed', '#b45309', '#fef3c7'],
    styles: rusticStyles,
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Kräftige Farben und Verläufe - frisch und trendy',
    preview: '🟪',
    previewColors: ['#faf5ff', '#8b5cf6', '#f3e8ff'],
    styles: modernStyles,
  },
  oriental: {
    id: 'oriental',
    name: 'Oriental',
    description: 'Gold-Akzente und Ornamente - luxuriös und einladend',
    preview: '🟨',
    previewColors: ['#fffbeb', '#d97706', '#fef3c7'],
    styles: orientalStyles,
  },
};

export function getTheme(themeId: MenuTheme): ThemeConfig {
  return THEMES[themeId] || THEMES.classic;
}

export const THEME_LIST = Object.values(THEMES);

// Helper function to check if a value is a gradient
export function isGradient(value: string): boolean {
  return value.includes('gradient');
}

// Helper to generate CSS custom properties from theme
export function getThemeCSSVariables(theme: ThemeConfig): Record<string, string> {
  const { styles } = theme;
  return {
    '--theme-background': styles.background,
    '--theme-background-pattern': styles.backgroundPattern || 'none',
    '--theme-surface': styles.surface,
    '--theme-surface-hover': styles.surfaceHover,
    '--theme-text': styles.text,
    '--theme-text-muted': styles.textMuted,
    '--theme-primary': styles.primary,
    '--theme-primary-light': styles.primaryLight,
    '--theme-accent': styles.accent,
    '--theme-border': styles.border,
    '--theme-header-bg': styles.headerBg,
    '--theme-header-border': styles.headerBorder,
    '--theme-card-bg': styles.cardBg,
    '--theme-card-border': styles.cardBorder,
    '--theme-card-shadow': styles.cardShadow,
    '--theme-card-hover-transform': styles.cardHoverTransform,
    '--theme-card-hover-shadow': styles.cardHoverShadow,
    '--theme-price-color': styles.priceColor,
    '--theme-footer-bg': styles.footerBg,
    '--theme-footer-text': styles.footerText,
    '--theme-footer-border': styles.footerBorder,
  };
}
