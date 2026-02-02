import { jsPDF } from 'jspdf';
import { getTranslation, Language } from '@/lib/translations';
import { getMenuUrl } from '@/lib/utils';
import { MenuPDFOptions, TableTentPDFOptions } from '../types';
import { BasePDFStrategy } from './BasePDFStrategy';
import { drawCircleBadge, drawLeaderDots, drawPillBadge } from '../pdfDrawingHelpers';

/**
 * Compact Table PDF Strategy
 * Dense table-style layout with numbered items
 * Maximum information density, small fonts
 */
export class CompactTablePDF extends BasePDFStrategy {
  readonly templateId = 'compact';

  // Compact settings
  protected margin = 15;
  private lineHeight = 5;
  private itemNumber = 1;

  generateMenuPDF(options: MenuPDFOptions): void {
    const {
      restaurant,
      categories,
      menuItems,
      includeAllergens = true,
      theme,
    } = options;

    // Initialize
    const doc = this.initDocument('a4', 'portrait');
    this.margin = 15;
    this.contentWidth = this.pageWidth - 2 * this.margin;
    this.itemNumber = 1;

    const lang = (restaurant.menu_language || 'de') as Language;
    this.t = getTranslation(lang);
    this.colors = theme ? this.getColorsFromTheme(theme) : this.getDefaultColors();

    // Minimal header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...this.colors.text);
    doc.text(restaurant.name, this.margin, this.margin + 5);

    if (restaurant.address) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...this.colors.textMuted);
      doc.text(restaurant.address, this.margin, this.margin + 10);
    }

    // Thin separator line
    doc.setDrawColor(...this.colors.primary);
    doc.setLineWidth(0.5);
    doc.line(this.margin, this.margin + 14, this.pageWidth - this.margin, this.margin + 14);

    this.currentY = this.margin + 22;

    // Get categories with items
    const categoriesWithItems = this.getCategoriesWithItems(categories, menuItems);

    // Render each category
    categoriesWithItems.forEach(({ category, items }) => {
      this.checkPageBreak(15);

      // Category header (ohne Emojis - jsPDF unterstützt keine Emojis)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...this.colors.primary);
      doc.text(this.getDisplayName(category, lang).toUpperCase(), this.margin, this.currentY);

      // Separator line
      doc.setDrawColor(...this.colors.lightGray);
      doc.setLineWidth(0.2);
      doc.line(this.margin, this.currentY + 2, this.pageWidth - this.margin, this.currentY + 2);

      this.currentY += 6;

      // Render items in table format
      items.forEach((item) => {
        this.renderCompactItem(doc, item, lang, includeAllergens);
      });

      this.currentY += 4;
    });

    // Save
    const sanitizedName = this.sanitizeFilename(restaurant.name);
    this.savePDF(`speisekarte-${sanitizedName}.pdf`);
  }

  private renderCompactItem(
    doc: jsPDF,
    item: {
      name: string;
      name_en?: string | null;
      description: string | null;
      description_en?: string | null;
      price: number;
      item_number?: number | null;
      addons?: Array<{ name: string; price: number }> | null;
      sizes?: Record<string, number | undefined> | null;
      is_popular?: boolean;
      is_special?: boolean;
      allergens?: string[];
    },
    lang: string,
    includeAllergens: boolean
  ): void {
    // Calculate height needed
    let itemHeight = this.lineHeight;
    if (item.addons && item.addons.length > 0) {
      itemHeight += item.addons.length * 3.5;
    }

    this.checkPageBreak(itemHeight + 3);

    const startX = this.margin;
    const priceX = this.pageWidth - this.margin;

    // Item number badge
    const displayNumber = item.item_number || this.itemNumber;
    drawCircleBadge(
      doc,
      displayNumber,
      startX + 3,
      this.currentY - 1,
      this.colors.primary,
      [255, 255, 255],
      3
    );

    // Item name with leader dots
    const nameX = startX + 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...this.colors.text);

    const itemName = this.getDisplayName(item, lang);
    doc.text(itemName, nameX, this.currentY);

    // Special/Popular badges (Text statt Emojis)
    let badgeX = nameX + doc.getTextWidth(itemName) + 2;
    if (item.is_special) {
      const width = drawPillBadge(doc, 'TOP', badgeX, this.currentY, [251, 191, 36], [120, 53, 15], 6);
      badgeX += width + 2;
    }
    if (item.is_popular) {
      drawPillBadge(doc, 'HIT', badgeX, this.currentY, [254, 202, 202], [153, 27, 27], 6);
    }

    // Leader dots to price
    const textEndX = badgeX + 3;
    const priceText = this.formatPrice(item.price);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    const priceWidth = doc.getTextWidth(priceText);
    const priceStartX = priceX - priceWidth;

    if (priceStartX - textEndX > 10) {
      drawLeaderDots(doc, textEndX, priceStartX - 3, this.currentY - 1, this.colors.lightGray, 2);
    }

    // Price
    doc.setTextColor(...this.colors.priceColor);
    doc.text(priceText, priceStartX, this.currentY);

    this.currentY += this.lineHeight;

    // Addons (if any)
    if (item.addons && item.addons.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...this.colors.textMuted);

      item.addons.forEach((addon) => {
        const addonText = `+ ${addon.name} ${this.formatPrice(addon.price)}`;
        doc.text(addonText, nameX + 5, this.currentY);
        this.currentY += 3.5;
      });
    }

    // Sizes (if any) - ItemSize is {small?: number, medium?: number, large?: number}
    if (item.sizes && Object.keys(item.sizes).length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...this.colors.textMuted);

      const sizesText = Object.entries(item.sizes)
        .filter(([, price]) => price !== undefined)
        .map(([name, price]) => `${name}: ${this.formatPrice(price!)}`)
        .join(' | ');
      if (sizesText) {
        doc.text(sizesText, nameX + 5, this.currentY);
        this.currentY += 3.5;
      }
    }

    // Allergens (small, inline)
    if (includeAllergens && item.allergens && item.allergens.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6);
      doc.setTextColor(...this.colors.lightGray);
      doc.text(`(${item.allergens.join(', ')})`, nameX + 5, this.currentY);
      this.currentY += 3;
    }

    this.itemNumber++;
  }

  generateTableTentPDF(options: TableTentPDFOptions): void {
    const { restaurantName, slug, qrCanvas, theme } = options;
    const menuUrl = getMenuUrl(slug);
    const doc = this.initDocument('a6', 'portrait');
    this.colors = theme ? this.getColorsFromTheme(theme) : this.getDefaultColors();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const centerX = pageWidth / 2;

    // Minimal white background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Thin border
    doc.setDrawColor(...this.colors.primary);
    doc.setLineWidth(0.5);
    doc.rect(3, 3, pageWidth - 6, pageHeight - 6, 'S');

    // Restaurant name - compact
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...this.colors.text);
    const nameLines = doc.splitTextToSize(restaurantName, pageWidth - 20);
    doc.text(nameLines, centerX, 18, { align: 'center' });

    // QR Code - large relative to page
    const qrSize = 55;
    const qrY = 28 + (nameLines.length - 1) * 5;

    const qrDataUrl = qrCanvas.toDataURL('image/png');
    doc.addImage(qrDataUrl, 'PNG', centerX - qrSize / 2, qrY, qrSize, qrSize);

    // Numbered badge style label
    const labelY = qrY + qrSize + 8;
    drawCircleBadge(doc, '?', centerX - 25, labelY, this.colors.primary, [255, 255, 255], 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...this.colors.primary);
    doc.text('Speisekarte', centerX, labelY + 2, { align: 'center' });

    // URL - small
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(...this.colors.textMuted);
    doc.text(menuUrl, centerX, pageHeight - 8, { align: 'center' });

    // Save
    this.savePDF(`tischaufsteller-${slug}.pdf`);
  }
}
