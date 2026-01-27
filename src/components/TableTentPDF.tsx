'use client';

import { jsPDF } from 'jspdf';
import { getMenuUrl } from '@/lib/utils';

interface TableTentOptions {
  restaurantName: string;
  slug: string;
  qrCanvas: HTMLCanvasElement;
}

// Color constants (RGB values)
const EMERALD_R = 16;
const EMERALD_G = 185;
const EMERALD_B = 129;

const DARK_GRAY_R = 17;
const DARK_GRAY_G = 24;
const DARK_GRAY_B = 39;

const LIGHT_GRAY_R = 107;
const LIGHT_GRAY_G = 114;
const LIGHT_GRAY_B = 128;

/**
 * Generate a print-ready PDF table tent (Tischaufsteller)
 * A4 format, portrait orientation, with QR code and restaurant branding
 */
export function generateTableTentPDF({ restaurantName, slug, qrCanvas }: TableTentOptions) {
  const menuUrl = getMenuUrl(slug);

  // Create PDF - A4 format
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const centerX = pageWidth / 2;

  // ===== PAGE 1: Main side (facing customer) =====

  // Background gradient effect (simple version with rectangles)
  pdf.setFillColor(245, 245, 245);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Header decorative bar
  pdf.setFillColor(EMERALD_R, EMERALD_G, EMERALD_B);
  pdf.rect(0, 0, pageWidth, 8, 'F');

  // Restaurant name
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(28);
  pdf.setTextColor(DARK_GRAY_R, DARK_GRAY_G, DARK_GRAY_B);

  // Handle long restaurant names
  const maxNameWidth = pageWidth - 40;
  const nameLines = pdf.splitTextToSize(restaurantName, maxNameWidth);
  const nameY = 40;
  pdf.text(nameLines, centerX, nameY, { align: 'center' });

  // QR Code section
  const qrSize = 100; // mm
  const qrY = nameY + (nameLines.length * 10) + 20;

  // White background for QR code
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(centerX - qrSize/2 - 10, qrY - 10, qrSize + 20, qrSize + 20, 5, 5, 'F');

  // Border around QR code
  pdf.setDrawColor(EMERALD_R, EMERALD_G, EMERALD_B);
  pdf.setLineWidth(1);
  pdf.roundedRect(centerX - qrSize/2 - 10, qrY - 10, qrSize + 20, qrSize + 20, 5, 5, 'S');

  // Add QR code from canvas
  const qrDataUrl = qrCanvas.toDataURL('image/png');
  pdf.addImage(qrDataUrl, 'PNG', centerX - qrSize/2, qrY, qrSize, qrSize);

  // "Scan for menu" text with icon
  const scanTextY = qrY + qrSize + 30;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(20);
  pdf.setTextColor(EMERALD_R, EMERALD_G, EMERALD_B);
  pdf.text('Speisekarte scannen', centerX, scanTextY, { align: 'center' });

  // Phone icon indicator (simple text)
  pdf.setFontSize(14);
  pdf.setTextColor(LIGHT_GRAY_R, LIGHT_GRAY_G, LIGHT_GRAY_B);
  pdf.text('Einfach mit dem Handy scannen', centerX, scanTextY + 10, { align: 'center' });

  // URL display
  const urlY = scanTextY + 28;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(LIGHT_GRAY_R, LIGHT_GRAY_G, LIGHT_GRAY_B);
  pdf.text(menuUrl, centerX, urlY, { align: 'center' });

  // Instructions box
  const instructionY = urlY + 20;
  pdf.setFillColor(240, 253, 244); // Light emerald background
  pdf.roundedRect(20, instructionY, pageWidth - 40, 35, 3, 3, 'F');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(EMERALD_R, EMERALD_G, EMERALD_B);
  pdf.text('So funktioniert\'s:', 30, instructionY + 10);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(DARK_GRAY_R, DARK_GRAY_G, DARK_GRAY_B);
  pdf.text('1. Kamera-App oder QR-Scanner öffnen', 30, instructionY + 18);
  pdf.text('2. QR-Code scannen', 30, instructionY + 25);
  pdf.text('3. Speisekarte direkt auf dem Handy ansehen', 30, instructionY + 32);

  // Footer
  const footerY = pageHeight - 15;
  pdf.setFillColor(EMERALD_R, EMERALD_G, EMERALD_B);
  pdf.rect(0, pageHeight - 8, pageWidth, 8, 'F');

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(LIGHT_GRAY_R, LIGHT_GRAY_G, LIGHT_GRAY_B);
  pdf.text('Powered by QR-Menü App', centerX, footerY - 5, { align: 'center' });

  // ===== PAGE 2: Back side (optional - folding instructions) =====
  pdf.addPage();

  // Background
  pdf.setFillColor(245, 245, 245);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Header bar
  pdf.setFillColor(EMERALD_R, EMERALD_G, EMERALD_B);
  pdf.rect(0, 0, pageWidth, 8, 'F');

  // Folding guide title
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(DARK_GRAY_R, DARK_GRAY_G, DARK_GRAY_B);
  pdf.text('Tischaufsteller - Faltanleitung', centerX, 30, { align: 'center' });

  // Instructions
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(12);
  pdf.setTextColor(LIGHT_GRAY_R, LIGHT_GRAY_G, LIGHT_GRAY_B);

  const foldInstructions = [
    '1. Seite 1 ausdrucken (Vorderseite mit QR-Code)',
    '2. Auf festem Papier oder Karton drucken (mind. 200g/m²)',
    '3. Entlang der Falzlinie in der Mitte falten',
    '4. Als Dreieck auf den Tisch stellen',
    '',
    'Tipp: Für Langlebigkeit laminieren!'
  ];

  let yPos = 55;
  foldInstructions.forEach(line => {
    pdf.text(line, centerX, yPos, { align: 'center' });
    yPos += 10;
  });

  // Folding diagram (simple representation)
  const diagramY = yPos + 20;

  // Paper outline
  pdf.setDrawColor(LIGHT_GRAY_R, LIGHT_GRAY_G, LIGHT_GRAY_B);
  pdf.setLineWidth(0.5);
  pdf.rect(centerX - 30, diagramY, 60, 80);

  // Fold line (dashed)
  pdf.setLineDashPattern([3, 3], 0);
  pdf.line(centerX - 30, diagramY + 40, centerX + 30, diagramY + 40);
  pdf.setLineDashPattern([], 0);

  // QR symbol on top half
  pdf.setFillColor(EMERALD_R, EMERALD_G, EMERALD_B);
  pdf.rect(centerX - 10, diagramY + 10, 20, 20, 'F');

  pdf.setFontSize(9);
  pdf.setTextColor(LIGHT_GRAY_R, LIGHT_GRAY_G, LIGHT_GRAY_B);
  pdf.text('Falzlinie', centerX, diagramY + 45, { align: 'center' });
  pdf.text('QR-Code', centerX, diagramY + 23, { align: 'center' });

  // Additional tip
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(10);
  pdf.setTextColor(LIGHT_GRAY_R, LIGHT_GRAY_G, LIGHT_GRAY_B);
  pdf.text('Diese Seite muss nicht gedruckt werden.', centerX, pageHeight - 30, { align: 'center' });

  // Footer
  pdf.setFillColor(EMERALD_R, EMERALD_G, EMERALD_B);
  pdf.rect(0, pageHeight - 8, pageWidth, 8, 'F');

  // Download the PDF
  pdf.save(`tischaufsteller-${slug}.pdf`);
}

/**
 * Alternative: Generate a simpler single-page table tent
 */
export function generateSimpleTableTent({ restaurantName, slug, qrCanvas }: TableTentOptions) {
  const menuUrl = getMenuUrl(slug);

  // Create PDF - A5 landscape (ideal for table tent)
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a5',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const centerX = pageWidth / 2;

  // White background
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Border
  pdf.setDrawColor(EMERALD_R, EMERALD_G, EMERALD_B);
  pdf.setLineWidth(2);
  pdf.rect(5, 5, pageWidth - 10, pageHeight - 10, 'S');

  // Restaurant name
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(22);
  pdf.setTextColor(DARK_GRAY_R, DARK_GRAY_G, DARK_GRAY_B);
  pdf.text(restaurantName, centerX, 25, { align: 'center' });

  // QR Code
  const qrSize = 70;
  const qrX = centerX - qrSize / 2;
  const qrY = 35;

  const qrDataUrl = qrCanvas.toDataURL('image/png');
  pdf.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

  // Text below QR
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.setTextColor(EMERALD_R, EMERALD_G, EMERALD_B);
  pdf.text('Speisekarte scannen', centerX, qrY + qrSize + 12, { align: 'center' });

  // URL
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(LIGHT_GRAY_R, LIGHT_GRAY_G, LIGHT_GRAY_B);
  pdf.text(menuUrl, centerX, qrY + qrSize + 20, { align: 'center' });

  pdf.save(`tischaufsteller-simple-${slug}.pdf`);
}

/**
 * Generate a compact A6 table tent (ideal for small tables)
 * A6 format: 105mm x 148mm
 */
export function generateA6TableTent({ restaurantName, slug, qrCanvas }: TableTentOptions) {
  const menuUrl = getMenuUrl(slug);

  // Create PDF - A6 portrait format
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a6',
  });

  const pageWidth = pdf.internal.pageSize.getWidth(); // 105mm
  const pageHeight = pdf.internal.pageSize.getHeight(); // 148mm
  const centerX = pageWidth / 2;

  // ===== FRONT SIDE =====

  // White background
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top accent bar
  pdf.setFillColor(EMERALD_R, EMERALD_G, EMERALD_B);
  pdf.rect(0, 0, pageWidth, 4, 'F');

  // Restaurant name
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.setTextColor(DARK_GRAY_R, DARK_GRAY_G, DARK_GRAY_B);

  // Handle long restaurant names
  const maxNameWidth = pageWidth - 16;
  const nameLines = pdf.splitTextToSize(restaurantName, maxNameWidth);
  pdf.text(nameLines, centerX, 16, { align: 'center' });

  // QR Code - prominent
  const qrSize = 65; // mm
  const qrY = 28 + (nameLines.length - 1) * 5;

  // White background with subtle shadow effect
  pdf.setFillColor(250, 250, 250);
  pdf.roundedRect(centerX - qrSize/2 - 5, qrY - 3, qrSize + 10, qrSize + 10, 3, 3, 'F');

  // Add QR code from canvas
  const qrDataUrl = qrCanvas.toDataURL('image/png');
  pdf.addImage(qrDataUrl, 'PNG', centerX - qrSize/2, qrY, qrSize, qrSize);

  // "Scan for menu" text
  const scanTextY = qrY + qrSize + 12;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(EMERALD_R, EMERALD_G, EMERALD_B);
  pdf.text('Speisekarte', centerX, scanTextY, { align: 'center' });
  pdf.text('scannen', centerX, scanTextY + 6, { align: 'center' });

  // Phone icon hint
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(LIGHT_GRAY_R, LIGHT_GRAY_G, LIGHT_GRAY_B);
  pdf.text('Mit Handy-Kamera scannen', centerX, scanTextY + 16, { align: 'center' });

  // URL display (small)
  pdf.setFontSize(6);
  pdf.text(menuUrl, centerX, pageHeight - 8, { align: 'center' });

  // Bottom accent bar
  pdf.setFillColor(EMERALD_R, EMERALD_G, EMERALD_B);
  pdf.rect(0, pageHeight - 4, pageWidth, 4, 'F');

  // ===== BACK SIDE (optional - for double-sided printing) =====
  pdf.addPage();

  // Simple back with fold line
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top accent bar
  pdf.setFillColor(EMERALD_R, EMERALD_G, EMERALD_B);
  pdf.rect(0, 0, pageWidth, 4, 'F');

  // Fold line in middle (dashed)
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineDashPattern([2, 2], 0);
  pdf.line(0, pageHeight / 2, pageWidth, pageHeight / 2);
  pdf.setLineDashPattern([], 0);

  // Fold instruction
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(180, 180, 180);
  pdf.text('Hier falten', centerX, pageHeight / 2 - 3, { align: 'center' });

  // Bottom accent bar
  pdf.setFillColor(EMERALD_R, EMERALD_G, EMERALD_B);
  pdf.rect(0, pageHeight - 4, pageWidth, 4, 'F');

  pdf.save(`tischaufsteller-a6-${slug}.pdf`);
}
