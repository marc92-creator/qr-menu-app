import { jsPDF } from 'jspdf';
import { getTranslation, Language } from '@/lib/translations';
import { getMenuUrl } from '@/lib/utils';
import { MenuItem } from '@/types/database';
import { MenuPDFOptions, TableTentPDFOptions, CourseGroup, CategoryWithItems } from '../types';
import { BasePDFStrategy } from './BasePDFStrategy';
import {
  drawOrnamentLine,
  drawAppetizerOrnament,
  drawMainCourseOrnament,
  drawDessertOrnament,
  drawDrinksOrnament,
  drawDecorativeFrame,
} from '../pdfDrawingHelpers';

/**
 * Fine Dining PDF Strategy
 * Elegant serif typography, centered layout, decorative ornaments
 * Course-based grouping, generous spacing
 */
export class FineDiningPDF extends BasePDFStrategy {
  readonly templateId = 'fine-dining';

  // Fine Dining uses more margin for elegance
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

    // Elegant cream background
    doc.setFillColor(252, 251, 248); // warm white
    doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');

    const centerX = this.pageWidth / 2;

    // Restaurant name - centered, elegant
    this.currentY = 35;
    doc.setFont('times', 'bold');
    doc.setFontSize(32);
    doc.setTextColor(...this.colors.text);
    doc.text(restaurant.name.toUpperCase(), centerX, this.currentY, { align: 'center' });

    // Decorative line under name
    this.currentY += 8;
    drawOrnamentLine(doc, centerX, this.currentY, this.colors.primary, 80);

    // Subtitle/tagline if available
    if (restaurant.philosophy) {
      this.currentY += 15;
      doc.setFont('times', 'italic');
      doc.setFontSize(11);
      doc.setTextColor(...this.colors.textMuted);
      const philosophyLines = doc.splitTextToSize(restaurant.philosophy, this.contentWidth - 40);
      philosophyLines.forEach((line: string) => {
        doc.text(line, centerX, this.currentY, { align: 'center' });
        this.currentY += 5;
      });
    }

    this.currentY += 15;

    // Get categories with items
    const categoriesWithItems = this.getCategoriesWithItems(categories, menuItems);

    // Group by course type
    const courseGroups = this.groupByCourse(categoriesWithItems);

    // Render each course group
    Object.entries(courseGroups).forEach(([courseType, cats]) => {
      if (cats.length === 0) return;

      cats.forEach(({ category, items }) => {
        this.renderFineDiningCategory(doc, category, items, lang, courseType as CourseGroup, centerX);
      });
    });

    // Save
    const sanitizedName = this.sanitizeFilename(restaurant.name);
    this.savePDF(`speisekarte-${sanitizedName}.pdf`);
  }

  private groupByCourse(
    categoriesWithItems: CategoryWithItems[]
  ): Record<CourseGroup, CategoryWithItems[]> {
    const groups: Record<CourseGroup, CategoryWithItems[]> = {
      appetizer: [],
      main: [],
      dessert: [],
      drinks: [],
      other: [],
    };

    categoriesWithItems.forEach((cat) => {
      const name = cat.category.name.toLowerCase();

      if (name.includes('vorspeis') || name.includes('starter') || name.includes('appetizer') || name.includes('suppe')) {
        groups.appetizer.push(cat);
      } else if (name.includes('hauptg') || name.includes('main') || name.includes('fleisch') || name.includes('fisch')) {
        groups.main.push(cat);
      } else if (name.includes('dessert') || name.includes('nachspeis') || name.includes('süß')) {
        groups.dessert.push(cat);
      } else if (name.includes('getränk') || name.includes('drink') || name.includes('wein') || name.includes('cocktail')) {
        groups.drinks.push(cat);
      } else {
        groups.other.push(cat);
      }
    });

    return groups;
  }

  private renderFineDiningCategory(
    doc: jsPDF,
    category: { name: string; name_en?: string | null },
    items: MenuItem[],
    lang: string,
    courseType: CourseGroup,
    centerX: number
  ): void {
    // Category header with ornament
    this.checkPageBreak(40);

    // Top ornament
    this.currentY += 10;
    this.drawCourseOrnament(doc, courseType, centerX, this.currentY);
    this.currentY += 8;

    // Category name - centered, uppercase
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...this.colors.primary);
    doc.text(this.getDisplayName(category, lang).toUpperCase(), centerX, this.currentY, { align: 'center' });

    // Bottom ornament (mirrored)
    this.currentY += 6;
    this.drawCourseOrnament(doc, courseType, centerX, this.currentY);
    this.currentY += 12;

    // Render items
    items.forEach((item) => {
      this.renderFineDiningItem(doc, item, lang, centerX);
    });

    this.currentY += 10;
  }

  private drawCourseOrnament(doc: jsPDF, courseType: CourseGroup, centerX: number, y: number): void {
    switch (courseType) {
      case 'appetizer':
        drawAppetizerOrnament(doc, centerX, y, this.colors.primary);
        break;
      case 'main':
        drawMainCourseOrnament(doc, centerX, y, this.colors.primary);
        break;
      case 'dessert':
        drawDessertOrnament(doc, centerX, y, this.colors.primary);
        break;
      case 'drinks':
        drawDrinksOrnament(doc, centerX, y, this.colors.primary);
        break;
      default:
        drawOrnamentLine(doc, centerX, y, this.colors.primary, 60);
    }
  }

  private renderFineDiningItem(
    doc: jsPDF,
    item: MenuItem,
    lang: string,
    centerX: number
  ): void {
    const description = this.getDisplayDescription(item, lang);

    // Calculate height
    let itemHeight = 12;
    if (description) {
      const descLines = doc.splitTextToSize(description, this.contentWidth - 20);
      itemHeight += descLines.length * 4;
    }
    if (item.wine_pairings && item.wine_pairings.length > 0) {
      itemHeight += 6;
    }
    if (item.chef_note) {
      itemHeight += 6;
    }

    this.checkPageBreak(itemHeight + 10);

    // Item name - centered, elegant
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...this.colors.text);
    doc.text(this.getDisplayName(item, lang), centerX, this.currentY, { align: 'center' });

    this.currentY += 5;

    // Description - centered, italic
    if (description) {
      doc.setFont('times', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(...this.colors.textMuted);
      const descLines = doc.splitTextToSize(description, this.contentWidth - 20);
      descLines.forEach((line: string) => {
        doc.text(line, centerX, this.currentY, { align: 'center' });
        this.currentY += 4;
      });
    }

    // Origin region if available
    if (item.origin_region) {
      doc.setFont('times', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...this.colors.textMuted);
      doc.text(`— ${item.origin_region} —`, centerX, this.currentY, { align: 'center' });
      this.currentY += 4;
    }

    // Wine pairing
    if (item.wine_pairings && item.wine_pairings.length > 0) {
      doc.setFont('times', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(...this.colors.primary);
      doc.text(`Weinempfehlung: ${item.wine_pairings.join(', ')}`, centerX, this.currentY, { align: 'center' });
      this.currentY += 4;
    }

    // Price - centered, elegant
    this.currentY += 2;
    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...this.colors.priceColor);
    doc.text(this.formatPrice(item.price), centerX, this.currentY, { align: 'center' });

    this.currentY += 8;
  }

  generateTableTentPDF(options: TableTentPDFOptions): void {
    const { restaurantName, slug, qrCanvas, theme } = options;
    const menuUrl = getMenuUrl(slug);
    const doc = this.initDocument('a4', 'portrait');
    this.colors = theme ? this.getColorsFromTheme(theme) : this.getDefaultColors();

    const centerX = this.pageWidth / 2;

    // Elegant cream background
    doc.setFillColor(252, 251, 248);
    doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');

    // Golden decorative frame
    drawDecorativeFrame(
      doc,
      15,
      15,
      this.pageWidth - 30,
      this.pageHeight - 30,
      this.colors.primary,
      'ornate'
    );

    // Restaurant name - elegant serif
    doc.setFont('times', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(...this.colors.text);
    const nameLines = doc.splitTextToSize(restaurantName.toUpperCase(), this.pageWidth - 60);
    doc.text(nameLines, centerX, 55, { align: 'center' });

    // Ornament below name
    const nameY = 55 + nameLines.length * 10;
    drawOrnamentLine(doc, centerX, nameY, this.colors.primary, 80);

    // QR Code with elegant frame
    const qrSize = 90;
    const qrY = nameY + 25;

    // Double border around QR
    doc.setDrawColor(...this.colors.primary);
    doc.setLineWidth(0.3);
    doc.rect(centerX - qrSize / 2 - 8, qrY - 8, qrSize + 16, qrSize + 16, 'S');
    doc.rect(centerX - qrSize / 2 - 5, qrY - 5, qrSize + 10, qrSize + 10, 'S');

    const qrDataUrl = qrCanvas.toDataURL('image/png');
    doc.addImage(qrDataUrl, 'PNG', centerX - qrSize / 2, qrY, qrSize, qrSize);

    // Scan text - elegant
    const scanTextY = qrY + qrSize + 20;
    doc.setFont('times', 'italic');
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Scannen Sie für unsere Speisekarte', centerX, scanTextY, { align: 'center' });

    // Ornament below scan text
    drawOrnamentLine(doc, centerX, scanTextY + 10, this.colors.primary, 60);

    // URL - small, elegant
    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...this.colors.textMuted);
    doc.text(menuUrl, centerX, scanTextY + 25, { align: 'center' });

    // Save
    this.savePDF(`tischaufsteller-${slug}.pdf`);
  }
}
