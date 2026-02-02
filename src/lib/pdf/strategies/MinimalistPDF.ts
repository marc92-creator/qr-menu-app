import { jsPDF } from 'jspdf';
import { getTranslation, Language } from '@/lib/translations';
import { getMenuUrl } from '@/lib/utils';
import { MenuPDFOptions, TableTentPDFOptions } from '../types';
import { BasePDFStrategy } from './BasePDFStrategy';
import { drawDottedLine, drawLeaderDots, drawAccordionArrow, drawPillBadge } from '../pdfDrawingHelpers';

/**
 * Minimalist PDF Strategy
 * Ultra-clean design with generous whitespace
 * Dotted separator lines, leader dots to price
 * Philosophy quote, accordion-style categories
 */
export class MinimalistPDF extends BasePDFStrategy {
  readonly templateId = 'minimalist';

  // Minimalist uses more margin for clean look
  protected margin = 25;

  generateMenuPDF(options: MenuPDFOptions): void {
    const {
      restaurant,
      categories,
      menuItems,
      theme,
    } = options;

    // Initialize
    const doc = this.initDocument('a4', 'portrait');
    this.margin = 25;
    this.contentWidth = this.pageWidth - 2 * this.margin;

    const lang = (restaurant.menu_language || 'de') as Language;
    this.t = getTranslation(lang);
    this.colors = theme ? this.getColorsFromTheme(theme) : this.getDefaultColors();

    const centerX = this.pageWidth / 2;

    // White background (clean)
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');

    // Restaurant name - clean, light weight appearance
    this.currentY = 35;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(28);
    doc.setTextColor(...this.colors.text);
    doc.text(restaurant.name, centerX, this.currentY, { align: 'center' });

    // Philosophy quote if available
    const quote = restaurant.minimalist_quote || restaurant.philosophy;
    if (quote) {
      this.currentY += 15;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(...this.colors.textMuted);
      const quoteLines = doc.splitTextToSize(`"${quote}"`, this.contentWidth - 40);
      quoteLines.forEach((line: string) => {
        doc.text(line, centerX, this.currentY, { align: 'center' });
        this.currentY += 5;
      });
    }

    // Dotted separator
    this.currentY += 10;
    drawDottedLine(doc, this.margin + 30, this.currentY, this.pageWidth - this.margin - 30, this.currentY, this.colors.lightGray, 3);

    this.currentY += 15;

    // Get categories with items
    const categoriesWithItems = this.getCategoriesWithItems(categories, menuItems);

    // Render each category
    categoriesWithItems.forEach(({ category, items }) => {
      this.renderMinimalistCategory(doc, category, items, lang);
    });

    // Save
    const sanitizedName = this.sanitizeFilename(restaurant.name);
    this.savePDF(`speisekarte-${sanitizedName}.pdf`);
  }

  private renderMinimalistCategory(
    doc: jsPDF,
    category: { name: string; name_en?: string | null },
    items: Array<{
      name: string;
      name_en?: string | null;
      description: string | null;
      description_en?: string | null;
      price: number;
      is_vegan?: boolean;
      is_vegetarian?: boolean;
    }>,
    lang: string
  ): void {
    this.checkPageBreak(25);

    // Category header with accordion arrow
    drawAccordionArrow(doc, this.margin, this.currentY - 2, this.colors.primary, true);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...this.colors.text);
    doc.text(this.getDisplayName(category, lang).toUpperCase(), this.margin + 8, this.currentY);

    // Dotted line under category
    this.currentY += 4;
    drawDottedLine(doc, this.margin, this.currentY, this.pageWidth - this.margin, this.currentY, this.colors.lightGray, 2);

    this.currentY += 10;

    // Render items
    items.forEach((item) => {
      this.renderMinimalistItem(doc, item, lang);
    });

    this.currentY += 8;
  }

  private renderMinimalistItem(
    doc: jsPDF,
    item: {
      name: string;
      name_en?: string | null;
      description: string | null;
      description_en?: string | null;
      price: number;
      is_vegan?: boolean;
      is_vegetarian?: boolean;
    },
    lang: string
  ): void {
    const description = this.getDisplayDescription(item, lang);

    // Calculate height
    let itemHeight = 8;
    if (description) {
      const descLines = doc.splitTextToSize(description, this.contentWidth - 20);
      itemHeight += descLines.length * 4;
    }

    this.checkPageBreak(itemHeight + 5);

    // Item name
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...this.colors.text);

    const itemName = this.getDisplayName(item, lang);
    doc.text(itemName, this.margin, this.currentY);

    // Diet badges (subtle)
    let badgeX = this.margin + doc.getTextWidth(itemName) + 3;
    if (item.is_vegan) {
      const width = drawPillBadge(doc, 'V', badgeX, this.currentY, [209, 250, 229], [4, 120, 87], 6);
      badgeX += width + 2;
    } else if (item.is_vegetarian) {
      drawPillBadge(doc, 'VG', badgeX, this.currentY, [220, 252, 231], [21, 128, 61], 6);
    }

    // Price with leader dots
    const priceText = this.formatPrice(item.price);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const priceWidth = doc.getTextWidth(priceText);
    const priceX = this.pageWidth - this.margin - priceWidth;

    // Leader dots from name to price
    const dotsStartX = badgeX + 5;
    if (priceX - dotsStartX > 15) {
      drawLeaderDots(doc, dotsStartX, priceX - 3, this.currentY - 1, this.colors.lightGray, 2.5);
    }

    // Price
    doc.setTextColor(...this.colors.priceColor);
    doc.text(priceText, priceX, this.currentY);

    this.currentY += 5;

    // Description (subtle, smaller)
    if (description) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(...this.colors.textMuted);
      const descLines = doc.splitTextToSize(description, this.contentWidth - 15);
      descLines.forEach((line: string) => {
        doc.text(line, this.margin + 5, this.currentY);
        this.currentY += 4;
      });
    }

    this.currentY += 3;
  }

  generateTableTentPDF(options: TableTentPDFOptions): void {
    const { restaurantName, slug, qrCanvas, theme } = options;
    const menuUrl = getMenuUrl(slug);
    const doc = this.initDocument('a4', 'portrait');
    this.colors = theme ? this.getColorsFromTheme(theme) : this.getDefaultColors();

    const centerX = this.pageWidth / 2;

    // Pure white background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');

    // No border - just content

    // Restaurant name - light, clean
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(24);
    doc.setTextColor(...this.colors.text);
    const nameLines = doc.splitTextToSize(restaurantName, this.pageWidth - 60);
    doc.text(nameLines, centerX, 55, { align: 'center' });

    // Dotted line
    const lineY = 60 + nameLines.length * 8;
    drawDottedLine(doc, centerX - 40, lineY, centerX + 40, lineY, this.colors.lightGray, 3);

    // QR Code - clean, no border
    const qrSize = 100;
    const qrY = lineY + 20;

    const qrDataUrl = qrCanvas.toDataURL('image/png');
    doc.addImage(qrDataUrl, 'PNG', centerX - qrSize / 2, qrY, qrSize, qrSize);

    // Scan text - minimal
    const scanTextY = qrY + qrSize + 20;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...this.colors.textMuted);
    doc.text('Speisekarte', centerX, scanTextY, { align: 'center' });

    // Dotted underline
    drawDottedLine(
      doc,
      centerX - 25,
      scanTextY + 3,
      centerX + 25,
      scanTextY + 3,
      this.colors.primary,
      2
    );

    // URL - very subtle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...this.colors.lightGray);
    doc.text(menuUrl, centerX, scanTextY + 20, { align: 'center' });

    // Save
    this.savePDF(`tischaufsteller-${slug}.pdf`);
  }
}
