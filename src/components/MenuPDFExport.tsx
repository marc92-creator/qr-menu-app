'use client';

import { Restaurant, Category, MenuItem } from '@/types/database';
import { ThemeConfig } from '@/lib/themes';
import { generateTemplateMenuPDF, MenuPDFOptions } from '@/lib/pdf';

// Re-export MenuPDFOptions for backwards compatibility
export type { MenuPDFOptions };

/**
 * Generate menu PDF using template-specific strategy
 *
 * @param options - Menu PDF generation options
 * @param options.restaurant - Restaurant data including template_id
 * @param options.categories - Menu categories
 * @param options.menuItems - Menu items
 * @param options.includeAllergens - Whether to include allergen information
 * @param options.includeQRCode - Whether to include QR code in header
 * @param options.qrCanvas - QR code canvas element
 * @param options.theme - Theme configuration
 * @param options.templateId - Template ID (overrides restaurant.template_id)
 */
export function generateMenuPDF(options: {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  includeAllergens?: boolean;
  includeQRCode?: boolean;
  qrCanvas?: HTMLCanvasElement | null;
  theme?: ThemeConfig;
  templateId?: string;
}): void {
  // Use templateId from options or fall back to restaurant.template_id
  const templateId = options.templateId || options.restaurant.template_id;

  generateTemplateMenuPDF({
    ...options,
    templateId,
  });
}

interface MenuPDFButtonProps {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  qrCanvas?: HTMLCanvasElement | null;
  theme?: ThemeConfig;
  className?: string;
}

export function MenuPDFButton({
  restaurant,
  categories,
  menuItems,
  qrCanvas,
  theme,
  className = '',
}: MenuPDFButtonProps) {
  const handleDownload = () => {
    generateMenuPDF({
      restaurant,
      categories,
      menuItems,
      includeAllergens: true,
      includeQRCode: !!qrCanvas,
      qrCanvas,
      theme,
      templateId: restaurant.template_id,
    });
  };

  return (
    <button
      onClick={handleDownload}
      className={`flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors ${className}`}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Speisekarte als PDF
    </button>
  );
}
