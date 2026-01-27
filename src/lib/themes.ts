import { MenuTheme } from '@/types/database';

export interface ThemeConfig {
  id: MenuTheme;
  name: string;
  description: string;
  preview: string; // emoji for preview
  colors: {
    background: string;
    surface: string;
    surfaceHover: string;
    text: string;
    textMuted: string;
    primary: string;
    primaryText: string;
    accent: string;
    border: string;
    headerBg: string;
    categoryBg: string;
    cardBg: string;
    badgeBg: string;
    badgeText: string;
  };
}

export const THEMES: Record<MenuTheme, ThemeConfig> = {
  classic: {
    id: 'classic',
    name: 'Classic',
    description: 'Hell, sauber und minimalistisch',
    preview: '⬜',
    colors: {
      background: 'bg-gray-50',
      surface: 'bg-white',
      surfaceHover: 'hover:bg-gray-50',
      text: 'text-gray-900',
      textMuted: 'text-gray-500',
      primary: 'text-emerald-600',
      primaryText: 'text-white',
      accent: 'bg-emerald-500',
      border: 'border-gray-200',
      headerBg: 'bg-white/90',
      categoryBg: 'bg-gray-50/95',
      cardBg: 'bg-white',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-700',
    },
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    description: 'Elegant mit dunklem Hintergrund',
    preview: '⬛',
    colors: {
      background: 'bg-gray-950',
      surface: 'bg-gray-900',
      surfaceHover: 'hover:bg-gray-800',
      text: 'text-gray-100',
      textMuted: 'text-gray-400',
      primary: 'text-emerald-400',
      primaryText: 'text-gray-900',
      accent: 'bg-emerald-500',
      border: 'border-gray-800',
      headerBg: 'bg-gray-900/95',
      categoryBg: 'bg-gray-950/95',
      cardBg: 'bg-gray-900',
      badgeBg: 'bg-emerald-900',
      badgeText: 'text-emerald-300',
    },
  },
  rustic: {
    id: 'rustic',
    name: 'Rustic',
    description: 'Warme Erdtöne, gemütlich',
    preview: '🟫',
    colors: {
      background: 'bg-amber-50',
      surface: 'bg-white',
      surfaceHover: 'hover:bg-amber-50',
      text: 'text-amber-950',
      textMuted: 'text-amber-700',
      primary: 'text-amber-700',
      primaryText: 'text-white',
      accent: 'bg-amber-600',
      border: 'border-amber-200',
      headerBg: 'bg-amber-100/90',
      categoryBg: 'bg-amber-50/95',
      cardBg: 'bg-white',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-800',
    },
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Bunte Akzente, frisch',
    preview: '🟪',
    colors: {
      background: 'bg-slate-100',
      surface: 'bg-white',
      surfaceHover: 'hover:bg-slate-50',
      text: 'text-slate-900',
      textMuted: 'text-slate-500',
      primary: 'text-violet-600',
      primaryText: 'text-white',
      accent: 'bg-violet-500',
      border: 'border-slate-200',
      headerBg: 'bg-white/90',
      categoryBg: 'bg-slate-100/95',
      cardBg: 'bg-white',
      badgeBg: 'bg-violet-100',
      badgeText: 'text-violet-700',
    },
  },
  oriental: {
    id: 'oriental',
    name: 'Oriental',
    description: 'Gold-Akzente, warm',
    preview: '🟨',
    colors: {
      background: 'bg-stone-100',
      surface: 'bg-white',
      surfaceHover: 'hover:bg-stone-50',
      text: 'text-stone-900',
      textMuted: 'text-stone-600',
      primary: 'text-amber-600',
      primaryText: 'text-white',
      accent: 'bg-amber-500',
      border: 'border-amber-200',
      headerBg: 'bg-gradient-to-r from-amber-50 to-orange-50',
      categoryBg: 'bg-stone-100/95',
      cardBg: 'bg-white',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-800',
    },
  },
};

export function getTheme(themeId: MenuTheme): ThemeConfig {
  return THEMES[themeId] || THEMES.classic;
}

export const THEME_LIST = Object.values(THEMES);
