import { jsPDF } from 'jspdf';
import { getTranslation, getAllergenName, Language } from '@/lib/translations';
import { getAllergenById } from '@/lib/allergens';
import { getMenuUrl } from '@/lib/utils';
import { MenuPDFOptions, TableTentPDFOptions } from '../types';
import { BasePDFStrategy } from './BasePDFStrategy';
import { drawVerticalBar, drawPillBadge, drawSpiceLevel, drawPrepTime } from '../pdfDrawingHelpers';

/**
 * Traditional PDF Strategy
 * Single column layout with item images and full details
 * Similar to the original PDF export style
 */
export class TraditionalPDF extends BasePDFStrategy {
  readonly templateId = 'traditional';

  generateMenuPDF(options: MenuPDFOptions): void {
    const {
      restaurant,
      categories,
      menuItems,
      includeAllergens = true,
      includeQRCode = false,
      qrCanvas,
      theme,
    } = options;

    // Initialize
    const doc = this.initDocument('a4', 'portrait');
    const lang = (restaurant.menu_language || 'de') as Language;
    this.t = getTranslation(lang);
    this.colors = theme ? this.getColorsFromTheme(theme) : this.getDefaultColors();

    // Header with colored bar
    doc.setFillColor(...this.colors.primary);
    doc.rect(0, 0, this.pageWidth, 35, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(restaurant.name, this.margin, 20);

    if (restaurant.address) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(restaurant.address, this.margin, 28);
    }

    // QR Code in header
    if (includeQRCode && qrCanvas) {
      try {
        const qrDataUrl = qrCanvas.toDataURL('image/png');
        doc.addImage(qrDataUrl, 'PNG', this.pageWidth - this.margin - 25, 5, 25, 25);
      } catch (e) {
        console.error('Error adding QR code to PDF:', e);
      }
    }

    this.currentY = 45;

    // Get categories with items
    const categoriesWithItems = this.getCategoriesWithItems(categories, menuItems);

    // Render each category
    categoriesWithItems.forEach(({ category, items }) => {
      // Category header
      this.checkPageBreak(15);

      // Vertical bar accent
      drawVerticalBar(doc, this.margin - 3, this.currentY - 5, 10, this.colors.primary, 2);

      // Category name
      doc.setTextColor(...this.colors.primary);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(this.getDisplayName(category, lang), this.margin + 2, this.currentY);

      // Line after category name
      const categoryNameWidth = doc.getTextWidth(this.getDisplayName(category, lang));
      doc.setDrawColor(...this.colors.primary);
      doc.setLineWidth(0.5);
      doc.line(
        this.margin + categoryNameWidth + 7,
        this.currentY - 2,
        this.pageWidth - this.margin,
        this.currentY - 2
      );

      this.currentY += 8;

      // Render items
      items.forEach((item) => {
        this.renderTraditionalItem(doc, item, lang, includeAllergens);
      });

      this.currentY += 5;
    });

    // Footer with allergen legend
    if (includeAllergens) {
      this.renderAllergenLegend(doc);
    }

    // Save
    const sanitizedName = this.sanitizeFilename(restaurant.name);
    this.savePDF(`speisekarte-${sanitizedName}.pdf`);
  }

  private renderTraditionalItem(
    doc: jsPDF,
    item: {
      name: string;
      name_en?: string | null;
      description: string | null;
      description_en?: string | null;
      price: number;
      is_vegetarian?: boolean;
      is_vegan?: boolean;
      is_special?: boolean;
      is_popular?: boolean;
      allergens?: string[];
      spice_level?: number | null;
      preparation_time?: number | null;
    },
    lang: string,
    includeAllergens: boolean
  ): void {
    // Calculate item height
    let itemHeight = 10;
    const description = this.getDisplayDescription(item, lang);
    if (description) {
      const descLines = doc.splitTextToSize(description, this.contentWidth - 30);
      itemHeight += descLines.length * 4;
    }
    if (includeAllergens && item.allergens && item.allergens.length > 0) {
      itemHeight += 5;
    }
    if (item.is_vegetarian || item.is_vegan || item.is_special || item.is_popular) {
      itemHeight += 5;
    }

    this.checkPageBreak(itemHeight + 5);

    // Item name and price
    doc.setTextColor(...this.colors.text);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');

    const itemName = this.getDisplayName(item, lang);
    const priceText = this.formatPrice(item.price);
    const priceWidth = doc.getTextWidth(priceText);

    // Badges before name
    let nameX = this.margin;
    if (item.is_special) {
      const badgeWidth = drawPillBadge(
        doc,
        this.t.dailySpecial.toUpperCase(),
        nameX,
        this.currentY,
        [251, 191, 36], // amber-400
        [120, 53, 15]   // amber-900
      );
      nameX += badgeWidth + 3;
    }
    if (item.is_popular) {
      const badgeWidth = drawPillBadge(
        doc,
        this.t.popular.toUpperCase(),
        nameX,
        this.currentY,
        [254, 202, 202], // red-200
        [153, 27, 27]    // red-800
      );
      nameX += badgeWidth + 3;
    }

    // Item name
    doc.setTextColor(...this.colors.text);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(itemName, nameX, this.currentY);

    // Spice level and prep time indicators
    let indicatorX = nameX + doc.getTextWidth(itemName) + 5;
    if (item.spice_level && item.spice_level > 0) {
      const spiceWidth = drawSpiceLevel(doc, item.spice_level, indicatorX, this.currentY - 1);
      indicatorX += spiceWidth + 5;
    }
    if (item.preparation_time) {
      drawPrepTime(doc, item.preparation_time, indicatorX, this.currentY, this.colors.textMuted);
    }

    // Price aligned right
    doc.setTextColor(...this.colors.priceColor);
    doc.text(priceText, this.pageWidth - this.margin - priceWidth, this.currentY);

    this.currentY += 5;

    // Diet badges
    if (item.is_vegan || item.is_vegetarian) {
      doc.setFontSize(8);
      if (item.is_vegan) {
        doc.setFillColor(209, 250, 229); // emerald-100
        doc.setTextColor(4, 120, 87);    // emerald-700
        const badge = this.t.vegan;
        const badgeWidth = doc.getTextWidth(badge) + 4;
        doc.roundedRect(this.margin, this.currentY - 3, badgeWidth, 4.5, 1, 1, 'F');
        doc.text(badge, this.margin + 2, this.currentY);
      } else if (item.is_vegetarian) {
        doc.setFillColor(220, 252, 231); // green-100
        doc.setTextColor(21, 128, 61);   // green-700
        const badge = this.t.vegetarian;
        const badgeWidth = doc.getTextWidth(badge) + 4;
        doc.roundedRect(this.margin, this.currentY - 3, badgeWidth, 4.5, 1, 1, 'F');
        doc.text(badge, this.margin + 2, this.currentY);
      }
      this.currentY += 4;
    }

    // Description
    if (description) {
      doc.setTextColor(...this.colors.textMuted);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const descLines = doc.splitTextToSize(description, this.contentWidth - 10);
      descLines.forEach((line: string) => {
        doc.text(line, this.margin, this.currentY);
        this.currentY += 4;
      });
    }

    // Allergens
    if (includeAllergens && item.allergens && item.allergens.length > 0) {
      doc.setTextColor(...this.colors.textMuted);
      doc.setFontSize(7);
      const allergenText = item.allergens
        .map((a) => {
          const allergen = getAllergenById(a);
          return allergen ? `${allergen.icon} ${getAllergenName(a, lang as Language)}` : a;
        })
        .join('  ');
      const allergenLines = doc.splitTextToSize(`${this.t.allergens}: ${allergenText}`, this.contentWidth - 10);
      allergenLines.forEach((line: string) => {
        doc.text(line, this.margin, this.currentY);
        this.currentY += 3;
      });
    }

    this.currentY += 3;
  }

  private renderAllergenLegend(doc: jsPDF): void {
    this.checkPageBreak(25);
    this.currentY += 5;
    doc.setDrawColor(...this.colors.textMuted);
    doc.setLineWidth(0.2);
    doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 5;

    doc.setTextColor(...this.colors.textMuted);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(`${this.t.allergens}: ${this.t.allergenInfo}`, this.margin, this.currentY);
  }

  generateTableTentPDF(options: TableTentPDFOptions): void {
    const { restaurantName, slug, qrCanvas, theme } = options;
    const menuUrl = getMenuUrl(slug);
    const doc = this.initDocument('a4', 'portrait');
    this.colors = theme ? this.getColorsFromTheme(theme) : this.getDefaultColors();

    const centerX = this.pageWidth / 2;

    // Background
    doc.setFillColor(245, 245, 245);
    doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');

    // Header bar with primary color
    doc.setFillColor(...this.colors.primary);
    doc.rect(0, 0, this.pageWidth, 8, 'F');

    // Restaurant name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(...this.colors.darkGray);
    const nameLines = doc.splitTextToSize(restaurantName, this.pageWidth - 40);
    doc.text(nameLines, centerX, 40, { align: 'center' });

    // QR Code
    const qrSize = 100;
    const qrY = 40 + nameLines.length * 10 + 20;

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(centerX - qrSize / 2 - 10, qrY - 10, qrSize + 20, qrSize + 20, 5, 5, 'F');

    // Colored border
    doc.setDrawColor(...this.colors.primary);
    doc.setLineWidth(2);
    doc.roundedRect(centerX - qrSize / 2 - 10, qrY - 10, qrSize + 20, qrSize + 20, 5, 5, 'S');

    const qrDataUrl = qrCanvas.toDataURL('image/png');
    doc.addImage(qrDataUrl, 'PNG', centerX - qrSize / 2, qrY, qrSize, qrSize);

    // Scan text
    const scanTextY = qrY + qrSize + 30;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(...this.colors.primary);
    doc.text('Speisekarte scannen', centerX, scanTextY, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(...this.colors.lightGray);
    doc.text('Einfach mit dem Handy scannen', centerX, scanTextY + 10, { align: 'center' });

    // URL
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(menuUrl, centerX, scanTextY + 28, { align: 'center' });

    // Footer bar
    doc.setFillColor(...this.colors.primary);
    doc.rect(0, this.pageHeight - 8, this.pageWidth, 8, 'F');

    // Save
    this.savePDF(`tischaufsteller-${slug}.pdf`);
  }
}
