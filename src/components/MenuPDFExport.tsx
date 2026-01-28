'use client';

import { jsPDF } from 'jspdf';
import { Restaurant, Category, MenuItem } from '@/types/database';
import { formatPrice } from '@/lib/utils';
import { getAllergenById } from '@/lib/allergens';
import { getTranslation, getAllergenName, Language } from '@/lib/translations';

interface MenuPDFOptions {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  includeAllergens?: boolean;
  includeQRCode?: boolean;
  qrCanvas?: HTMLCanvasElement | null;
}

export function generateMenuPDF({
  restaurant,
  categories,
  menuItems,
  includeAllergens = true,
  includeQRCode = false,
  qrCanvas,
}: MenuPDFOptions): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Get translations
  const lang = (restaurant.menu_language || 'de') as Language;
  const t = getTranslation(lang);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let currentY = margin;

  // Colors
  const primaryColor: [number, number, number] = [16, 185, 129]; // emerald-500
  const textColor: [number, number, number] = [31, 41, 55]; // gray-800
  const mutedColor: [number, number, number] = [107, 114, 128]; // gray-500

  // Helper function to check page break
  const checkPageBreak = (neededHeight: number): void => {
    if (currentY + neededHeight > pageHeight - margin) {
      doc.addPage();
      currentY = margin;
    }
  };

  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(restaurant.name, margin, 20);

  if (restaurant.address) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(restaurant.address, margin, 28);
  }

  // QR Code in header if provided
  if (includeQRCode && qrCanvas) {
    try {
      const qrDataUrl = qrCanvas.toDataURL('image/png');
      doc.addImage(qrDataUrl, 'PNG', pageWidth - margin - 25, 5, 25, 25);
    } catch (e) {
      console.error('Error adding QR code to PDF:', e);
    }
  }

  currentY = 45;

  // Sort categories by position
  const sortedCategories = [...categories].sort((a, b) => a.position - b.position);

  // Render each category
  sortedCategories.forEach((category) => {
    const items = menuItems
      .filter((item) => item.category_id === category.id && item.is_available !== false)
      .sort((a, b) => {
        if (a.is_special && !b.is_special) return -1;
        if (!a.is_special && b.is_special) return 1;
        return a.position - b.position;
      });

    if (items.length === 0) return;

    // Category header (needs ~12mm)
    checkPageBreak(15);

    // Category name with line
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(category.name, margin, currentY);

    const categoryNameWidth = doc.getTextWidth(category.name);
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(margin + categoryNameWidth + 5, currentY - 2, pageWidth - margin, currentY - 2);

    currentY += 8;

    // Render items
    items.forEach((item) => {
      // Estimate item height
      let itemHeight = 10; // Base height for name + price
      if (item.description) {
        const descLines = doc.splitTextToSize(item.description, contentWidth - 30);
        itemHeight += descLines.length * 4;
      }
      if (includeAllergens && item.allergens && item.allergens.length > 0) {
        itemHeight += 5;
      }
      if (item.is_vegetarian || item.is_vegan || item.is_special || item.is_popular) {
        itemHeight += 5;
      }

      checkPageBreak(itemHeight + 5);

      // Item name and price on same line
      doc.setTextColor(...textColor);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');

      const itemName = item.name;
      const priceText = formatPrice(item.price);
      const priceWidth = doc.getTextWidth(priceText);

      // Badges before name
      let nameX = margin;
      if (item.is_special) {
        doc.setFillColor(251, 191, 36); // amber-400
        doc.setTextColor(120, 53, 15); // amber-900
        doc.setFontSize(7);
        const badgeText = t.dailySpecial.toUpperCase();
        const badgeWidth = doc.getTextWidth(badgeText) + 4;
        doc.roundedRect(nameX, currentY - 4, badgeWidth, 5, 1, 1, 'F');
        doc.text(badgeText, nameX + 2, currentY - 0.5);
        nameX += badgeWidth + 3;
      }
      if (item.is_popular) {
        doc.setFillColor(254, 202, 202); // red-200
        doc.setTextColor(153, 27, 27); // red-800
        doc.setFontSize(7);
        const badgeText = t.popular.toUpperCase();
        const badgeWidth = doc.getTextWidth(badgeText) + 4;
        doc.roundedRect(nameX, currentY - 4, badgeWidth, 5, 1, 1, 'F');
        doc.text(badgeText, nameX + 2, currentY - 0.5);
        nameX += badgeWidth + 3;
      }

      // Item name
      doc.setTextColor(...textColor);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(itemName, nameX, currentY);

      // Price aligned right
      doc.setTextColor(...primaryColor);
      doc.text(priceText, pageWidth - margin - priceWidth, currentY);

      currentY += 5;

      // Diet badges
      if (item.is_vegan || item.is_vegetarian) {
        doc.setFontSize(8);
        if (item.is_vegan) {
          doc.setFillColor(209, 250, 229); // emerald-100
          doc.setTextColor(4, 120, 87); // emerald-700
          const badge = t.vegan;
          const badgeWidth = doc.getTextWidth(badge) + 4;
          doc.roundedRect(margin, currentY - 3, badgeWidth, 4.5, 1, 1, 'F');
          doc.text(badge, margin + 2, currentY);
        } else if (item.is_vegetarian) {
          doc.setFillColor(220, 252, 231); // green-100
          doc.setTextColor(21, 128, 61); // green-700
          const badge = t.vegetarian;
          const badgeWidth = doc.getTextWidth(badge) + 4;
          doc.roundedRect(margin, currentY - 3, badgeWidth, 4.5, 1, 1, 'F');
          doc.text(badge, margin + 2, currentY);
        }
        currentY += 4;
      }

      // Description
      if (item.description) {
        doc.setTextColor(...mutedColor);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const descLines = doc.splitTextToSize(item.description, contentWidth - 10);
        descLines.forEach((line: string) => {
          doc.text(line, margin, currentY);
          currentY += 4;
        });
      }

      // Allergens
      if (includeAllergens && item.allergens && item.allergens.length > 0) {
        doc.setTextColor(...mutedColor);
        doc.setFontSize(7);
        const allergenText = item.allergens
          .map((a) => {
            const allergen = getAllergenById(a);
            return allergen ? `${allergen.icon} ${getAllergenName(a, lang)}` : a;
          })
          .join('  ');
        const allergenLines = doc.splitTextToSize(`${t.allergens}: ${allergenText}`, contentWidth - 10);
        allergenLines.forEach((line: string) => {
          doc.text(line, margin, currentY);
          currentY += 3;
        });
      }

      currentY += 3; // Space between items
    });

    currentY += 5; // Extra space after category
  });

  // Footer with allergen legend
  if (includeAllergens) {
    checkPageBreak(25);
    currentY += 5;
    doc.setDrawColor(...mutedColor);
    doc.setLineWidth(0.2);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 5;

    doc.setTextColor(...mutedColor);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(`${t.allergens}: ${t.allergenInfo}`, margin, currentY);
  }

  // Save PDF
  const sanitizedName = restaurant.name.replace(/[^a-zA-Z0-9äöüÄÖÜß\s]/g, '').replace(/\s+/g, '-');
  doc.save(`speisekarte-${sanitizedName}.pdf`);
}

interface MenuPDFButtonProps {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  qrCanvas?: HTMLCanvasElement | null;
  className?: string;
}

export function MenuPDFButton({
  restaurant,
  categories,
  menuItems,
  qrCanvas,
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
