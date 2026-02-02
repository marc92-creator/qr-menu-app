import { jsPDF } from 'jspdf';
import { getTranslation, Language } from '@/lib/translations';
import { getMenuUrl } from '@/lib/utils';
import { MenuPDFOptions, TableTentPDFOptions } from '../types';
import { BasePDFStrategy } from './BasePDFStrategy';
import { drawCard, drawHeartIcon, drawImagePlaceholder, drawPillBadge } from '../pdfDrawingHelpers';

/**
 * Modern Grid PDF Strategy
 * 2-column grid layout with cards, Instagram-style
 * Large image areas, minimal text, modern look
 */
export class ModernGridPDF extends BasePDFStrategy {
  readonly templateId = 'modern-grid';

  // Grid settings
  private cardWidth = 82;
  private cardGap = 6;
  private cardPadding = 5;
  private imageHeight = 40;

  generateMenuPDF(options: MenuPDFOptions): void {
    const {
      restaurant,
      categories,
      menuItems,
      theme,
    } = options;

    // Initialize
    const doc = this.initDocument('a4', 'portrait');
    const lang = (restaurant.menu_language || 'de') as Language;
    this.t = getTranslation(lang);
    this.colors = theme ? this.getColorsFromTheme(theme) : this.getDefaultColors();

    // Calculate grid positions
    const leftCardX = this.margin;
    const rightCardX = this.margin + this.cardWidth + this.cardGap;

    // Header - modern, clean
    doc.setFillColor(...this.colors.primary);
    doc.roundedRect(this.margin, this.margin, this.contentWidth, 25, 5, 5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text(restaurant.name, this.margin + 10, this.margin + 16);

    this.currentY = this.margin + 35;

    // Get categories with items
    const categoriesWithItems = this.getCategoriesWithItems(categories, menuItems);

    // Render each category
    categoriesWithItems.forEach(({ category, items }) => {
      this.checkPageBreak(20);

      // Category header - modern pill style
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...this.colors.text);
      doc.text(this.getDisplayName(category, lang).toUpperCase(), this.margin, this.currentY);
      this.currentY += 8;

      // Render items in 2-column grid
      let columnIndex = 0;
      items.forEach((item) => {
        const cardX = columnIndex === 0 ? leftCardX : rightCardX;

        // Check if we need a new page
        if (this.currentY + 70 > this.pageHeight - this.margin) {
          doc.addPage();
          this.currentY = this.margin;
        }

        this.renderGridCard(doc, item, lang, cardX, this.currentY);

        columnIndex++;
        if (columnIndex >= 2) {
          columnIndex = 0;
          this.currentY += 70; // Card height + gap
        }
      });

      // If odd number of items, move to next row
      if (columnIndex !== 0) {
        this.currentY += 70;
      }

      this.currentY += 5;
    });

    // Save
    const sanitizedName = this.sanitizeFilename(restaurant.name);
    this.savePDF(`speisekarte-${sanitizedName}.pdf`);
  }

  private renderGridCard(
    doc: jsPDF,
    item: {
      name: string;
      name_en?: string | null;
      description: string | null;
      description_en?: string | null;
      price: number;
      is_popular?: boolean;
      is_special?: boolean;
      image_url?: string | null;
    },
    lang: string,
    x: number,
    y: number
  ): void {
    const cardHeight = 65;

    // Card background
    drawCard(
      doc,
      x,
      y,
      this.cardWidth,
      cardHeight,
      [255, 255, 255],
      [229, 231, 235], // gray-200 border
      4
    );

    // Image placeholder area
    drawImagePlaceholder(
      doc,
      x + 3,
      y + 3,
      this.cardWidth - 6,
      this.imageHeight,
      [243, 244, 246] // gray-100
    );

    // Popular badge (heart icon)
    if (item.is_popular) {
      drawHeartIcon(doc, x + this.cardWidth - 10, y + 10, 5, [239, 68, 68], true);
    }

    // Special badge
    if (item.is_special) {
      drawPillBadge(
        doc,
        'SPECIAL',
        x + 5,
        y + 8,
        [251, 191, 36],
        [120, 53, 15],
        6
      );
    }

    // Item name
    const nameY = y + this.imageHeight + 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...this.colors.text);

    const itemName = this.getDisplayName(item, lang);
    const nameLines = doc.splitTextToSize(itemName, this.cardWidth - 10);
    doc.text(nameLines[0], x + this.cardPadding, nameY);

    // Price - bottom right
    const priceY = y + cardHeight - 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...this.colors.priceColor);
    const priceText = this.formatPrice(item.price);
    const priceWidth = doc.getTextWidth(priceText);
    doc.text(priceText, x + this.cardWidth - this.cardPadding - priceWidth, priceY);

    // Short description if space allows
    const description = this.getDisplayDescription(item, lang);
    if (description && nameLines.length === 1) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...this.colors.textMuted);
      const descLines = doc.splitTextToSize(description, this.cardWidth - 10);
      if (descLines.length > 0) {
        doc.text(descLines[0], x + this.cardPadding, nameY + 5);
      }
    }
  }

  generateTableTentPDF(options: TableTentPDFOptions): void {
    const { restaurantName, slug, qrCanvas, theme } = options;
    const menuUrl = getMenuUrl(slug);
    const doc = this.initDocument('a4', 'portrait');
    this.colors = theme ? this.getColorsFromTheme(theme) : this.getDefaultColors();

    const centerX = this.pageWidth / 2;

    // White background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');

    // Large rounded card container
    const cardMargin = 20;
    const cardWidth = this.pageWidth - cardMargin * 2;
    const cardHeight = 220;
    const cardY = 40;

    drawCard(
      doc,
      cardMargin,
      cardY,
      cardWidth,
      cardHeight,
      [249, 250, 251], // gray-50
      this.colors.primary,
      10
    );

    // Restaurant name inside card
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(...this.colors.text);
    const nameLines = doc.splitTextToSize(restaurantName, cardWidth - 40);
    doc.text(nameLines, centerX, cardY + 30, { align: 'center' });

    // QR Code
    const qrSize = 100;
    const qrY = cardY + 50 + nameLines.length * 8;

    const qrDataUrl = qrCanvas.toDataURL('image/png');
    doc.addImage(qrDataUrl, 'PNG', centerX - qrSize / 2, qrY, qrSize, qrSize);

    // Scan text
    const scanTextY = qrY + qrSize + 15;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...this.colors.primary);
    doc.text('Speisekarte scannen', centerX, scanTextY, { align: 'center' });

    // Modern button-style URL display
    const urlY = cardY + cardHeight + 20;
    const urlBoxWidth = 160;
    const urlBoxHeight = 12;

    doc.setFillColor(...this.colors.primary);
    doc.roundedRect(centerX - urlBoxWidth / 2, urlY, urlBoxWidth, urlBoxHeight, 6, 6, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(menuUrl, centerX, urlY + 8, { align: 'center' });

    // Save
    this.savePDF(`tischaufsteller-${slug}.pdf`);
  }
}
