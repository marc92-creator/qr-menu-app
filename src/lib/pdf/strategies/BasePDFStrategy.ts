import { jsPDF } from 'jspdf';
import { Category, MenuItem } from '@/types/database';
import { ThemeConfig } from '@/lib/themes';
import { formatPrice } from '@/lib/utils';
import { getTranslation } from '@/lib/translations';
import {
  PDFColors,
  PDFDimensions,
  MenuPDFOptions,
  TableTentPDFOptions,
  CategoryWithItems,
  PDFStrategy,
} from '../types';
import { hexToRgb, extractColor } from '@/lib/pdfUtils';

/**
 * Abstract base class for PDF generation strategies
 * Provides common functionality for all template-specific PDF generators
 */
export abstract class BasePDFStrategy implements PDFStrategy {
  abstract readonly templateId: string;

  // Page settings
  protected pageWidth: number = 210;
  protected pageHeight: number = 297;
  protected margin: number = 20;
  protected contentWidth: number = 170;

  // Current position
  protected currentY: number = 0;

  // Document reference
  protected doc: jsPDF | null = null;

  // Colors
  protected colors: PDFColors = this.getDefaultColors();

  // Translation function
  protected t: ReturnType<typeof getTranslation> = getTranslation('de');

  /**
   * Get default colors (emerald theme)
   */
  protected getDefaultColors(): PDFColors {
    return {
      primary: [16, 185, 129],      // emerald-500
      text: [31, 41, 55],           // gray-800
      textMuted: [107, 114, 128],   // gray-500
      background: [255, 255, 255],  // white
      accent: [16, 185, 129],       // emerald-500
      priceColor: [16, 185, 129],   // emerald-500
      darkGray: [17, 24, 39],       // gray-900
      lightGray: [156, 163, 175],   // gray-400
    };
  }

  /**
   * Extract colors from theme config
   */
  protected getColorsFromTheme(theme: ThemeConfig): PDFColors {
    const { styles } = theme;

    return {
      primary: hexToRgb(extractColor(styles.primary)),
      text: hexToRgb(extractColor(styles.text)),
      textMuted: hexToRgb(extractColor(styles.textMuted)),
      background: hexToRgb(extractColor(styles.background)),
      accent: hexToRgb(extractColor(styles.accent)),
      priceColor: hexToRgb(extractColor(styles.priceColor)),
      darkGray: [17, 24, 39],
      lightGray: [156, 163, 175],
    };
  }

  /**
   * Initialize PDF document
   */
  protected initDocument(format: 'a4' | 'a5' | 'a6' = 'a4', orientation: 'portrait' | 'landscape' = 'portrait'): jsPDF {
    this.doc = new jsPDF({
      orientation,
      unit: 'mm',
      format,
    });

    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.contentWidth = this.pageWidth - 2 * this.margin;
    this.currentY = this.margin;

    return this.doc;
  }

  /**
   * Check if page break is needed and add new page if necessary
   */
  protected checkPageBreak(neededHeight: number): boolean {
    if (!this.doc) return false;

    if (this.currentY + neededHeight > this.pageHeight - this.margin) {
      this.doc.addPage();
      this.currentY = this.margin;
      return true;
    }
    return false;
  }

  /**
   * Get categories with their items, sorted and filtered
   */
  protected getCategoriesWithItems(categories: Category[], menuItems: MenuItem[]): CategoryWithItems[] {
    const sortedCategories = [...categories].sort((a, b) => a.position - b.position);

    return sortedCategories
      .map((category) => ({
        category,
        items: menuItems
          .filter((item) => item.category_id === category.id && item.is_available !== false)
          .sort((a, b) => {
            // Special items first
            if (a.is_special && !b.is_special) return -1;
            if (!a.is_special && b.is_special) return 1;
            return a.position - b.position;
          }),
      }))
      .filter((c) => c.items.length > 0);
  }

  /**
   * Format price with currency
   */
  protected formatPrice(price: number): string {
    return formatPrice(price);
  }

  /**
   * Calculate text height based on content
   */
  protected calculateTextHeight(text: string, maxWidth: number, fontSize: number): number {
    if (!this.doc) return 0;

    this.doc.setFontSize(fontSize);
    const lines = this.doc.splitTextToSize(text, maxWidth);
    return lines.length * (fontSize * 0.35);
  }

  /**
   * Get the name to display (primary or English based on language)
   */
  protected getDisplayName(item: { name: string; name_en?: string | null }, language: string): string {
    if (language === 'en' && item.name_en) {
      return item.name_en;
    }
    return item.name;
  }

  /**
   * Get the description to display (primary or English based on language)
   */
  protected getDisplayDescription(
    item: { description: string | null; description_en?: string | null },
    language: string
  ): string | null {
    if (language === 'en' && item.description_en) {
      return item.description_en;
    }
    return item.description;
  }

  /**
   * Save the PDF with appropriate filename
   */
  protected savePDF(filename: string): void {
    if (!this.doc) return;
    this.doc.save(filename);
  }

  /**
   * Sanitize name for filename
   */
  protected sanitizeFilename(name: string): string {
    return name.replace(/[^a-zA-Z0-9äöüÄÖÜß\s]/g, '').replace(/\s+/g, '-');
  }

  /**
   * Get dimensions object
   */
  protected getDimensions(): PDFDimensions {
    return {
      pageWidth: this.pageWidth,
      pageHeight: this.pageHeight,
      margin: this.margin,
      contentWidth: this.contentWidth,
    };
  }

  /**
   * Abstract method to generate menu PDF - must be implemented by subclasses
   */
  abstract generateMenuPDF(options: MenuPDFOptions): void;

  /**
   * Abstract method to generate table tent PDF - must be implemented by subclasses
   */
  abstract generateTableTentPDF(options: TableTentPDFOptions): void;
}
