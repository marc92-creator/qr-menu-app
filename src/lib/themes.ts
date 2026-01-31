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

  // Typography & Animations (NEW!)
  fontFamily?: string;
  fontHeading?: string;
  transitionSpeed?: string;
  animationStyle?: 'subtle' | 'smooth' | 'bouncy' | 'elegant';
  cardBorderRadius?: string;
  badgeBorderRadius?: string;
}

export interface ThemeConfig {
  id: MenuTheme;
  name: string;
  description: string;
  preview: string;
  previewColors: string[]; // For mini preview cards
  styles: ThemeStyles;
}

// Classic Theme - Clean, minimalist, professional (Enhanced!)
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
  cardShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  cardHoverTransform: 'translateY(-4px) scale(1.01)',
  cardHoverShadow: '0 10px 25px rgba(16, 185, 129, 0.1), 0 6px 12px rgba(0, 0, 0, 0.08)',

  pillBg: '#f3f4f6',
  pillText: '#6b7280',
  pillActiveBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  pillActiveText: '#ffffff',
  pillHoverBg: '#e5e7eb',

  badgeVeganBg: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
  badgeVeganText: '#047857',
  badgePopularBg: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
  badgePopularText: '#dc2626',
  badgeSpecialBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
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

  // Enhanced features
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontHeading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  transitionSpeed: '200ms',
  animationStyle: 'smooth',
  cardBorderRadius: '12px',
  badgeBorderRadius: '8px',
};

// Dark Theme - Elegant, modern, neon accents (Enhanced!)
const darkStyles: ThemeStyles = {
  background: '#0a0a0f',
  backgroundPattern: 'radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.06) 0%, transparent 50%), radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0a0a0f 100%)',
  surface: '#16162a',
  surfaceHover: '#1f1f3a',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  primary: '#22d3ee',
  primaryLight: '#164e63',
  accent: '#22d3ee',
  border: '#334155',

  headerBg: 'linear-gradient(180deg, rgba(22, 22, 42, 0.98) 0%, rgba(22, 22, 42, 0.95) 100%)',
  headerBorder: 'linear-gradient(90deg, transparent, #22d3ee, transparent)',

  cardBg: 'linear-gradient(135deg, rgba(31, 31, 58, 0.9) 0%, rgba(22, 22, 42, 0.95) 100%)',
  cardBorder: 'linear-gradient(135deg, #334155, #22d3ee, #334155)',
  cardShadow: '0 4px 24px rgba(0, 0, 0, 0.5), 0 0 40px rgba(34, 211, 238, 0.05)',
  cardHoverTransform: 'translateY(-6px) scale(1.02)',
  cardHoverShadow: '0 12px 40px rgba(34, 211, 238, 0.2), 0 0 60px rgba(34, 211, 238, 0.1), inset 0 1px 0 rgba(34, 211, 238, 0.2)',

  pillBg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
  pillText: '#94a3b8',
  pillActiveBg: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%)',
  pillActiveText: '#0f172a',
  pillHoverBg: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',

  badgeVeganBg: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
  badgeVeganText: '#6ee7b7',
  badgePopularBg: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)',
  badgePopularText: '#fca5a5',
  badgeSpecialBg: 'linear-gradient(135deg, #78350f 0%, #92400e 100%)',
  badgeSpecialText: '#fcd34d',
  badgeSoldOutBg: '#7f1d1d',
  badgeSoldOutText: '#fca5a5',

  allergenBg: '#1e293b',
  allergenText: '#94a3b8',
  allergenBorder: '#334155',
  allergenSelectedBg: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
  allergenSelectedText: '#0f172a',

  statusOpenBg: '#064e3b',
  statusOpenText: '#6ee7b7',
  statusClosedBg: '#7f1d1d',
  statusClosedText: '#fca5a5',

  priceColor: '#22d3ee',

  footerBg: 'linear-gradient(180deg, #0a0a0f 0%, #000000 100%)',
  footerText: '#64748b',
  footerBorder: 'linear-gradient(90deg, transparent, #334155, transparent)',

  decorativeGradient: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)',

  // Enhanced features
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  fontHeading: '"Inter", sans-serif',
  transitionSpeed: '250ms',
  animationStyle: 'elegant',
  cardBorderRadius: '16px',
  badgeBorderRadius: '10px',
};

// Rustic Theme - Warm earth tones, paper texture feel (Enhanced!)
const rusticStyles: ThemeStyles = {
  background: '#fef7ed',
  backgroundPattern: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(180, 130, 80, 0.03) 10px, rgba(180, 130, 80, 0.03) 20px), radial-gradient(circle at 30% 70%, rgba(251, 191, 36, 0.08) 0%, transparent 50%)',
  surface: '#fffbf5',
  surfaceHover: '#fef3e2',
  text: '#451a03',
  textMuted: '#92400e',
  primary: '#b45309',
  primaryLight: '#fef3c7',
  accent: '#b45309',
  border: '#fcd34d',

  headerBg: 'linear-gradient(180deg, rgba(254, 243, 199, 0.95) 0%, rgba(254, 247, 237, 0.98) 100%)',
  headerBorder: 'linear-gradient(90deg, transparent, #fcd34d, transparent)',

  cardBg: 'linear-gradient(135deg, #fffbf5 0%, #fef9f0 100%)',
  cardBorder: '#fde68a',
  cardShadow: '0 3px 12px rgba(180, 83, 9, 0.12), 0 1px 4px rgba(180, 83, 9, 0.08)',
  cardHoverTransform: 'translateY(-3px) rotate(0.5deg)',
  cardHoverShadow: '0 8px 20px rgba(180, 83, 9, 0.18), 0 3px 8px rgba(180, 83, 9, 0.12)',

  pillBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  pillText: '#92400e',
  pillActiveBg: 'linear-gradient(135deg, #b45309 0%, #92400e 100%)',
  pillActiveText: '#ffffff',
  pillHoverBg: 'linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)',

  badgeVeganBg: 'linear-gradient(135deg, #d9f99d 0%, #bef264 100%)',
  badgeVeganText: '#3f6212',
  badgePopularBg: 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)',
  badgePopularText: '#991b1b',
  badgeSpecialBg: 'linear-gradient(135deg, #fef08a 0%, #fde047 100%)',
  badgeSpecialText: '#854d0e',
  badgeSoldOutBg: '#fecaca',
  badgeSoldOutText: '#991b1b',

  allergenBg: '#fef3c7',
  allergenText: '#78350f',
  allergenBorder: '#fcd34d',
  allergenSelectedBg: 'linear-gradient(135deg, #b45309, #92400e)',
  allergenSelectedText: '#ffffff',

  statusOpenBg: '#d9f99d',
  statusOpenText: '#3f6212',
  statusClosedBg: '#fecaca',
  statusClosedText: '#991b1b',

  priceColor: '#b45309',

  footerBg: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)',
  footerText: '#a16207',
  footerBorder: 'linear-gradient(90deg, transparent, #fcd34d, transparent)',

  decorativePattern: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h20v20H0z\' fill=\'%23b45309\' fill-opacity=\'0.02\'/%3E%3C/svg%3E")',

  // Enhanced features
  fontFamily: '"Merriweather", Georgia, serif',
  fontHeading: '"Playfair Display", Georgia, serif',
  transitionSpeed: '300ms',
  animationStyle: 'bouncy',
  cardBorderRadius: '8px',
  badgeBorderRadius: '6px',
};

// Modern Theme - Bold, geometric, vibrant gradients (Enhanced!)
const modernStyles: ThemeStyles = {
  background: '#faf5ff',
  backgroundPattern: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 40%, #ede9fe 70%, #ddd6fe 100%), radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
  surface: '#ffffff',
  surfaceHover: '#faf5ff',
  text: '#1e1b4b',
  textMuted: '#6366f1',
  primary: '#8b5cf6',
  primaryLight: '#ede9fe',
  accent: '#8b5cf6',
  border: '#e9d5ff',

  headerBg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 245, 255, 0.96) 50%, rgba(243, 232, 255, 0.95) 100%)',
  headerBorder: 'linear-gradient(90deg, #e9d5ff, #c4b5fd, #e9d5ff)',

  cardBg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 245, 255, 0.9) 100%)',
  cardBorder: 'linear-gradient(135deg, #e9d5ff, #c4b5fd)',
  cardShadow: '0 4px 20px rgba(139, 92, 246, 0.12), 0 2px 8px rgba(139, 92, 246, 0.08)',
  cardHoverTransform: 'translateY(-6px) scale(1.02) rotate(-0.5deg)',
  cardHoverShadow: '0 16px 36px rgba(139, 92, 246, 0.25), 0 8px 16px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',

  pillBg: 'linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)',
  pillText: '#7c3aed',
  pillActiveBg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
  pillActiveText: '#ffffff',
  pillHoverBg: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',

  badgeVeganBg: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
  badgeVeganText: '#047857',
  badgePopularBg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
  badgePopularText: '#be185d',
  badgeSpecialBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)',
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

  footerBg: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
  footerText: '#a78bfa',
  footerBorder: 'linear-gradient(90deg, transparent, #e9d5ff, transparent)',

  decorativeGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(167, 139, 250, 0.06) 50%, transparent 100%)',

  // Enhanced features
  fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif',
  fontHeading: '"Poppins", sans-serif',
  transitionSpeed: '250ms',
  animationStyle: 'bouncy',
  cardBorderRadius: '20px',
  badgeBorderRadius: '12px',
};

// Oriental Theme - Gold accents, ornamental, luxurious (Enhanced!)
const orientalStyles: ThemeStyles = {
  background: '#fffbeb',
  backgroundPattern: 'radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.15) 0%, transparent 45%), radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.12) 0%, transparent 45%), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(217, 119, 6, 0.02) 40px, rgba(217, 119, 6, 0.02) 80px)',
  surface: '#ffffff',
  surfaceHover: '#fef3c7',
  text: '#451a03',
  textMuted: '#a16207',
  primary: '#d97706',
  primaryLight: '#fef3c7',
  accent: '#d97706',
  border: '#fbbf24',

  headerBg: 'linear-gradient(135deg, rgba(254, 243, 199, 0.98) 0%, rgba(253, 230, 138, 0.95) 50%, rgba(255, 251, 235, 0.96) 100%)',
  headerBorder: 'linear-gradient(90deg, #fcd34d, #fbbf24, #f59e0b, #fbbf24, #fcd34d)',

  cardBg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 252, 232, 0.9) 100%)',
  cardBorder: 'linear-gradient(135deg, #fcd34d, #fbbf24)',
  cardShadow: '0 4px 20px rgba(217, 119, 6, 0.15), 0 2px 8px rgba(251, 191, 36, 0.1)',
  cardHoverTransform: 'translateY(-4px) scale(1.01)',
  cardHoverShadow: '0 12px 32px rgba(217, 119, 6, 0.25), 0 6px 16px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(251, 191, 36, 0.4)',

  pillBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)',
  pillText: '#92400e',
  pillActiveBg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
  pillActiveText: '#ffffff',
  pillHoverBg: 'linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)',

  badgeVeganBg: 'linear-gradient(135deg, #d9f99d 0%, #bef264 100%)',
  badgeVeganText: '#3f6212',
  badgePopularBg: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
  badgePopularText: '#dc2626',
  badgeSpecialBg: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
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

  footerBg: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 50%, #fffbeb 100%)',
  footerText: '#b45309',
  footerBorder: 'linear-gradient(90deg, transparent, #fbbf24, transparent)',

  decorativeGradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.12) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 100%)',
  decorativePattern: 'radial-gradient(circle, rgba(251, 191, 36, 0.12) 1px, transparent 1px)',

  // Enhanced features
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontHeading: '"Cinzel", serif',
  transitionSpeed: '300ms',
  animationStyle: 'elegant',
  cardBorderRadius: '14px',
  badgeBorderRadius: '10px',
};

// Italian Theme - Tricolore (Red, Green, White) - Passion & Tradition
const italianStyles: ThemeStyles = {
  background: '#fefefe',
  backgroundPattern: 'linear-gradient(135deg, #fefefe 0%, #fff5f5 30%, #f0fdf4 60%, #fefefe 100%), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(220, 38, 38, 0.02) 60px, rgba(220, 38, 38, 0.02) 120px)',
  surface: '#ffffff',
  surfaceHover: '#fff5f5',
  text: '#1f2937',
  textMuted: '#6b7280',
  primary: '#dc2626',
  primaryLight: '#fee2e2',
  accent: '#16a34a',
  border: '#e5e7eb',

  headerBg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 226, 226, 0.3) 50%, rgba(240, 253, 244, 0.3) 100%)',
  headerBorder: 'linear-gradient(90deg, #dc2626, #ffffff, #16a34a)',

  cardBg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
  cardBorder: '#fecaca',
  cardShadow: '0 4px 16px rgba(220, 38, 38, 0.08), 0 2px 6px rgba(22, 163, 74, 0.04)',
  cardHoverTransform: 'translateY(-4px)',
  cardHoverShadow: '0 12px 28px rgba(220, 38, 38, 0.15), 0 6px 14px rgba(22, 163, 74, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',

  pillBg: '#f9fafb',
  pillText: '#6b7280',
  pillActiveBg: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
  pillActiveText: '#ffffff',
  pillHoverBg: '#fee2e2',

  badgeVeganBg: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
  badgeVeganText: '#047857',
  badgePopularBg: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
  badgePopularText: '#991b1b',
  badgeSpecialBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  badgeSpecialText: '#92400e',
  badgeSoldOutBg: '#fee2e2',
  badgeSoldOutText: '#7f1d1d',

  allergenBg: '#f9fafb',
  allergenText: '#4b5563',
  allergenBorder: '#e5e7eb',
  allergenSelectedBg: 'linear-gradient(135deg, #dc2626, #b91c1c)',
  allergenSelectedText: '#ffffff',

  statusOpenBg: '#d1fae5',
  statusOpenText: '#047857',
  statusClosedBg: '#fee2e2',
  statusClosedText: '#991b1b',

  priceColor: '#dc2626',

  footerBg: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
  footerText: '#9ca3af',
  footerBorder: 'linear-gradient(90deg, transparent, #fecaca, transparent)',

  decorativeGradient: 'linear-gradient(135deg, rgba(220, 38, 38, 0.05) 0%, rgba(22, 163, 74, 0.03) 100%)',

  fontFamily: '"Libre Baskerville", Georgia, serif',
  fontHeading: '"Playfair Display", serif',
  transitionSpeed: '250ms',
  animationStyle: 'smooth',
  cardBorderRadius: '12px',
  badgeBorderRadius: '8px',
};

// Japanese Theme - Zen Minimalism (Black, White, Red accent)
const japaneseStyles: ThemeStyles = {
  background: '#fafafa',
  backgroundPattern: 'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)',
  surface: '#ffffff',
  surfaceHover: '#f5f5f5',
  text: '#1a1a1a',
  textMuted: '#737373',
  primary: '#dc2626',
  primaryLight: '#fee2e2',
  accent: '#dc2626',
  border: '#e5e5e5',

  headerBg: 'rgba(255, 255, 255, 0.98)',
  headerBorder: '#e5e5e5',

  cardBg: '#ffffff',
  cardBorder: '#f5f5f5',
  cardShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
  cardHoverTransform: 'translateY(-2px)',
  cardHoverShadow: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',

  pillBg: '#f5f5f5',
  pillText: '#737373',
  pillActiveBg: '#1a1a1a',
  pillActiveText: '#ffffff',
  pillHoverBg: '#e5e5e5',

  badgeVeganBg: '#f0fdf4',
  badgeVeganText: '#166534',
  badgePopularBg: '#fee2e2',
  badgePopularText: '#991b1b',
  badgeSpecialBg: '#1a1a1a',
  badgeSpecialText: '#ffffff',
  badgeSoldOutBg: '#f5f5f5',
  badgeSoldOutText: '#737373',

  allergenBg: '#f5f5f5',
  allergenText: '#525252',
  allergenBorder: '#e5e5e5',
  allergenSelectedBg: '#1a1a1a',
  allergenSelectedText: '#ffffff',

  statusOpenBg: '#f0fdf4',
  statusOpenText: '#166534',
  statusClosedBg: '#fee2e2',
  statusClosedText: '#991b1b',

  priceColor: '#dc2626',

  footerBg: '#fafafa',
  footerText: '#a3a3a3',
  footerBorder: '#e5e5e5',

  decorativeGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, transparent 100%)',

  fontFamily: '"Noto Sans JP", -apple-system, sans-serif',
  fontHeading: '"Noto Serif JP", serif',
  transitionSpeed: '200ms',
  animationStyle: 'subtle',
  cardBorderRadius: '8px',
  badgeBorderRadius: '4px',
};

// Café Theme - Cozy Coffee Shop (Warm Browns & Cream)
const cafeStyles: ThemeStyles = {
  background: '#faf8f5',
  backgroundPattern: 'radial-gradient(circle at 30% 70%, rgba(120, 53, 15, 0.04) 0%, transparent 50%), linear-gradient(135deg, #faf8f5 0%, #f5f3ef 50%, #faf8f5 100%)',
  surface: '#fffcf7',
  surfaceHover: '#f5f1e8',
  text: '#3e2723',
  textMuted: '#6d4c41',
  primary: '#6d4c41',
  primaryLight: '#efebe9',
  accent: '#8d6e63',
  border: '#d7ccc8',

  headerBg: 'linear-gradient(180deg, rgba(255, 252, 247, 0.98) 0%, rgba(245, 241, 232, 0.95) 100%)',
  headerBorder: '#d7ccc8',

  cardBg: 'linear-gradient(135deg, rgba(255, 252, 247, 0.95) 0%, rgba(249, 245, 238, 0.9) 100%)',
  cardBorder: '#d7ccc8',
  cardShadow: '0 3px 12px rgba(109, 76, 65, 0.08), 0 1px 4px rgba(109, 76, 65, 0.06)',
  cardHoverTransform: 'translateY(-3px)',
  cardHoverShadow: '0 8px 20px rgba(109, 76, 65, 0.12), 0 4px 10px rgba(109, 76, 65, 0.08)',

  pillBg: '#efebe9',
  pillText: '#6d4c41',
  pillActiveBg: 'linear-gradient(135deg, #6d4c41 0%, #5d4037 100%)',
  pillActiveText: '#ffffff',
  pillHoverBg: '#d7ccc8',

  badgeVeganBg: 'linear-gradient(135deg, #d9f99d 0%, #bef264 100%)',
  badgeVeganText: '#3f6212',
  badgePopularBg: 'linear-gradient(135deg, #ffccbc 0%, #ff8a65 100%)',
  badgePopularText: '#4e342e',
  badgeSpecialBg: 'linear-gradient(135deg, #ffd54f 0%, #ffb300 100%)',
  badgeSpecialText: '#4e342e',
  badgeSoldOutBg: '#d7ccc8',
  badgeSoldOutText: '#6d4c41',

  allergenBg: '#efebe9',
  allergenText: '#5d4037',
  allergenBorder: '#d7ccc8',
  allergenSelectedBg: 'linear-gradient(135deg, #6d4c41, #5d4037)',
  allergenSelectedText: '#ffffff',

  statusOpenBg: '#d9f99d',
  statusOpenText: '#3f6212',
  statusClosedBg: '#ffccbc',
  statusClosedText: '#5d4037',

  priceColor: '#6d4c41',

  footerBg: 'linear-gradient(180deg, #faf8f5 0%, #efebe9 100%)',
  footerText: '#8d6e63',
  footerBorder: '#d7ccc8',

  decorativeGradient: 'linear-gradient(135deg, rgba(109, 76, 65, 0.04) 0%, transparent 100%)',

  fontFamily: '"Lora", Georgia, serif',
  fontHeading: '"Montserrat", sans-serif',
  transitionSpeed: '250ms',
  animationStyle: 'smooth',
  cardBorderRadius: '10px',
  badgeBorderRadius: '6px',
};

// Fine Dining Theme - Luxury (Black, Gold, Elegant)
const finediningStyles: ThemeStyles = {
  background: '#0f0f0f',
  backgroundPattern: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0f0f0f 100%), radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 40%)',
  surface: '#1a1a1a',
  surfaceHover: '#262626',
  text: '#fafafa',
  textMuted: '#a3a3a3',
  primary: '#d4af37',
  primaryLight: '#3f3f0f',
  accent: '#d4af37',
  border: '#404040',

  headerBg: 'linear-gradient(180deg, rgba(26, 26, 26, 0.98) 0%, rgba(15, 15, 15, 0.95) 100%)',
  headerBorder: 'linear-gradient(90deg, transparent, #d4af37, transparent)',

  cardBg: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(31, 31, 31, 0.9) 100%)',
  cardBorder: 'linear-gradient(135deg, #404040, #d4af37, #404040)',
  cardShadow: '0 4px 24px rgba(0, 0, 0, 0.5), 0 0 30px rgba(212, 175, 55, 0.05)',
  cardHoverTransform: 'translateY(-4px) scale(1.01)',
  cardHoverShadow: '0 12px 40px rgba(0, 0, 0, 0.6), 0 0 50px rgba(212, 175, 55, 0.15), inset 0 1px 0 rgba(212, 175, 55, 0.2)',

  pillBg: '#262626',
  pillText: '#a3a3a3',
  pillActiveBg: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
  pillActiveText: '#0f0f0f',
  pillHoverBg: '#404040',

  badgeVeganBg: 'linear-gradient(135deg, #166534 0%, #14532d 100%)',
  badgeVeganText: '#86efac',
  badgePopularBg: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
  badgePopularText: '#fecaca',
  badgeSpecialBg: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
  badgeSpecialText: '#0f0f0f',
  badgeSoldOutBg: '#404040',
  badgeSoldOutText: '#a3a3a3',

  allergenBg: '#262626',
  allergenText: '#a3a3a3',
  allergenBorder: '#404040',
  allergenSelectedBg: 'linear-gradient(135deg, #d4af37, #b8941f)',
  allergenSelectedText: '#0f0f0f',

  statusOpenBg: '#166534',
  statusOpenText: '#86efac',
  statusClosedBg: '#991b1b',
  statusClosedText: '#fecaca',

  priceColor: '#d4af37',

  footerBg: 'linear-gradient(180deg, #0f0f0f 0%, #000000 100%)',
  footerText: '#737373',
  footerBorder: 'linear-gradient(90deg, transparent, #404040, transparent)',

  decorativeGradient: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, transparent 100%)',

  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontHeading: '"Cinzel", serif',
  transitionSpeed: '300ms',
  animationStyle: 'elegant',
  cardBorderRadius: '12px',
  badgeBorderRadius: '8px',
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
  italian: {
    id: 'italian',
    name: 'Italian',
    description: 'Tricolore-Design - authentisch italienisch',
    preview: '🇮🇹',
    previewColors: ['#dc2626', '#ffffff', '#16a34a'],
    styles: italianStyles,
  },
  japanese: {
    id: 'japanese',
    name: 'Japanese',
    description: 'Zen-Minimalismus - ruhig und elegant',
    preview: '🇯🇵',
    previewColors: ['#ffffff', '#1a1a1a', '#dc2626'],
    styles: japaneseStyles,
  },
  cafe: {
    id: 'cafe',
    name: 'Café',
    description: 'Warme Kaffeehausatmosphäre - gemütlich',
    preview: '☕',
    previewColors: ['#faf8f5', '#6d4c41', '#d7ccc8'],
    styles: cafeStyles,
  },
  finedining: {
    id: 'finedining',
    name: 'Fine Dining',
    description: 'Schwarz-Gold - exklusiv und luxuriös',
    preview: '🌟',
    previewColors: ['#0f0f0f', '#d4af37', '#1a1a1a'],
    styles: finediningStyles,
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
