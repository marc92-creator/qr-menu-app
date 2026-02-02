import { jsPDF } from 'jspdf';

/**
 * PDF Drawing Helpers
 * Utility functions for drawing ornaments, badges, and layout elements in PDFs
 */

// ============================================
// ORNAMENTS (translated from SVG)
// ============================================

/**
 * Draw a centered ornament line with diamond
 * Used for Fine Dining template category headers
 */
export function drawOrnamentLine(
  doc: jsPDF,
  centerX: number,
  y: number,
  color: [number, number, number],
  width: number = 60
): void {
  const halfWidth = width / 2;

  doc.setDrawColor(...color);
  doc.setLineWidth(0.3);

  // Left line
  doc.line(centerX - halfWidth, y, centerX - 4, y);

  // Diamond in center
  doc.setFillColor(...color);
  doc.triangle(
    centerX, y - 2,      // top
    centerX + 2, y,      // right
    centerX, y + 2,      // bottom (will draw as filled path)
    'F'
  );
  doc.triangle(
    centerX, y - 2,      // top
    centerX - 2, y,      // left
    centerX, y + 2,      // bottom
    'F'
  );

  // Right line
  doc.line(centerX + 4, y, centerX + halfWidth, y);
}

/**
 * Draw appetizer-style ornament (curved lines with dots)
 */
export function drawAppetizerOrnament(
  doc: jsPDF,
  centerX: number,
  y: number,
  color: [number, number, number]
): void {
  doc.setDrawColor(...color);
  doc.setFillColor(...color);
  doc.setLineWidth(0.3);

  // Center dot
  doc.circle(centerX, y, 1, 'F');

  // Decorative curves (simplified as short lines with dots at ends)
  const spread = 20;

  // Left decoration
  doc.circle(centerX - spread, y, 0.5, 'F');
  doc.line(centerX - spread + 2, y, centerX - 4, y);

  // Right decoration
  doc.circle(centerX + spread, y, 0.5, 'F');
  doc.line(centerX + 4, y, centerX + spread - 2, y);
}

/**
 * Draw main course ornament (bold with angular elements)
 */
export function drawMainCourseOrnament(
  doc: jsPDF,
  centerX: number,
  y: number,
  color: [number, number, number]
): void {
  doc.setDrawColor(...color);
  doc.setFillColor(...color);
  doc.setLineWidth(0.4);

  const spread = 25;

  // Left angular bracket
  doc.line(centerX - spread - 3, y - 2, centerX - spread, y);
  doc.line(centerX - spread - 3, y + 2, centerX - spread, y);
  doc.line(centerX - spread, y, centerX - 6, y);

  // Center diamond (larger)
  const diamondSize = 2.5;
  doc.triangle(centerX, y - diamondSize, centerX + diamondSize, y, centerX, y + diamondSize, 'F');
  doc.triangle(centerX, y - diamondSize, centerX - diamondSize, y, centerX, y + diamondSize, 'F');

  // Right angular bracket
  doc.line(centerX + 6, y, centerX + spread, y);
  doc.line(centerX + spread, y, centerX + spread + 3, y - 2);
  doc.line(centerX + spread, y, centerX + spread + 3, y + 2);
}

/**
 * Draw dessert ornament (elegant swirls - simplified)
 */
export function drawDessertOrnament(
  doc: jsPDF,
  centerX: number,
  y: number,
  color: [number, number, number]
): void {
  doc.setDrawColor(...color);
  doc.setFillColor(...color);
  doc.setLineWidth(0.25);

  // Center flourish (simplified as star-like pattern)
  const size = 2;
  doc.circle(centerX, y, 0.8, 'F');

  // Small circles around
  doc.circle(centerX - size * 2, y, 0.4, 'F');
  doc.circle(centerX + size * 2, y, 0.4, 'F');

  // Curved lines (simplified as straight)
  doc.line(centerX - 20, y, centerX - size * 3, y);
  doc.line(centerX + size * 3, y, centerX + 20, y);
}

/**
 * Draw drinks ornament (minimal lines)
 */
export function drawDrinksOrnament(
  doc: jsPDF,
  centerX: number,
  y: number,
  color: [number, number, number]
): void {
  doc.setDrawColor(...color);
  doc.setLineWidth(0.3);

  // Simple horizontal line with small breaks
  doc.line(centerX - 30, y, centerX - 3, y);
  doc.line(centerX + 3, y, centerX + 30, y);
}

// ============================================
// BADGES
// ============================================

/**
 * Draw a circular badge with number
 */
export function drawCircleBadge(
  doc: jsPDF,
  number: number | string,
  x: number,
  y: number,
  bgColor: [number, number, number],
  textColor: [number, number, number],
  radius: number = 4
): void {
  doc.setFillColor(...bgColor);
  doc.circle(x, y, radius, 'F');

  doc.setTextColor(...textColor);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');

  const text = String(number);
  const textWidth = doc.getTextWidth(text);
  doc.text(text, x - textWidth / 2, y + 2.5);
}

/**
 * Draw a pill-shaped badge with text
 */
export function drawPillBadge(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  bgColor: [number, number, number],
  textColor: [number, number, number],
  fontSize: number = 7
): number {
  doc.setFontSize(fontSize);
  const textWidth = doc.getTextWidth(text);
  const padding = 3;
  const height = fontSize * 0.5 + 2;
  const width = textWidth + padding * 2;

  doc.setFillColor(...bgColor);
  doc.roundedRect(x, y - height + 1, width, height, 1.5, 1.5, 'F');

  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'bold');
  doc.text(text, x + padding, y - 0.5);

  return width;
}

// ============================================
// INDICATORS
// ============================================

/**
 * Draw spice level indicator (1-5 dots or chili symbols)
 */
export function drawSpiceLevel(
  doc: jsPDF,
  level: number,
  x: number,
  y: number,
  color: [number, number, number] = [239, 68, 68] // red-500
): number {
  const maxLevel = Math.min(level, 5);
  const dotRadius = 1.5;
  const spacing = 4;

  doc.setFillColor(...color);

  for (let i = 0; i < maxLevel; i++) {
    doc.circle(x + i * spacing, y, dotRadius, 'F');
  }

  // Draw empty circles for remaining
  doc.setDrawColor(...color);
  doc.setLineWidth(0.3);
  for (let i = maxLevel; i < 5; i++) {
    doc.circle(x + i * spacing, y, dotRadius, 'S');
  }

  return 5 * spacing;
}

/**
 * Draw preparation time indicator
 */
export function drawPrepTime(
  doc: jsPDF,
  minutes: number,
  x: number,
  y: number,
  color: [number, number, number]
): number {
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...color);

  const text = `${minutes} min`;
  const width = doc.getTextWidth(text);

  // Clock icon (simplified as circle with hands)
  const iconX = x;
  const iconY = y - 1;
  doc.setDrawColor(...color);
  doc.setLineWidth(0.3);
  doc.circle(iconX, iconY, 2, 'S');
  doc.line(iconX, iconY, iconX, iconY - 1.2); // Minute hand
  doc.line(iconX, iconY, iconX + 0.8, iconY + 0.3); // Hour hand

  doc.text(text, x + 4, y);

  return width + 6;
}

// ============================================
// LAYOUT HELPERS
// ============================================

/**
 * Draw a card with background, border, and optional rounded corners
 */
export function drawCard(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  bgColor: [number, number, number],
  borderColor?: [number, number, number],
  radius: number = 3
): void {
  doc.setFillColor(...bgColor);
  doc.roundedRect(x, y, width, height, radius, radius, 'F');

  if (borderColor) {
    doc.setDrawColor(...borderColor);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y, width, height, radius, radius, 'S');
  }
}

/**
 * Draw a dotted line
 */
export function drawDottedLine(
  doc: jsPDF,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: [number, number, number],
  dotSpacing: number = 2
): void {
  doc.setDrawColor(...color);
  doc.setLineDashPattern([0.5, dotSpacing], 0);
  doc.setLineWidth(0.3);
  doc.line(x1, y1, x2, y2);
  doc.setLineDashPattern([], 0);
}

/**
 * Draw a vertical bar (accent line)
 */
export function drawVerticalBar(
  doc: jsPDF,
  x: number,
  y: number,
  height: number,
  color: [number, number, number],
  width: number = 2
): void {
  doc.setFillColor(...color);
  doc.rect(x, y, width, height, 'F');
}

/**
 * Draw leader dots (dots from text to price)
 */
export function drawLeaderDots(
  doc: jsPDF,
  x1: number,
  x2: number,
  y: number,
  color: [number, number, number],
  dotSpacing: number = 3
): void {
  doc.setFillColor(...color);

  const totalDistance = x2 - x1;
  const numDots = Math.floor(totalDistance / dotSpacing);

  for (let i = 0; i < numDots; i++) {
    const dotX = x1 + i * dotSpacing + dotSpacing / 2;
    doc.circle(dotX, y, 0.3, 'F');
  }
}

/**
 * Draw image placeholder box
 */
export function drawImagePlaceholder(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  bgColor: [number, number, number] = [229, 231, 235] // gray-200
): void {
  doc.setFillColor(...bgColor);
  doc.roundedRect(x, y, width, height, 2, 2, 'F');

  // Camera icon placeholder
  const iconSize = Math.min(width, height) * 0.3;
  const iconX = x + width / 2;
  const iconY = y + height / 2;

  doc.setDrawColor(156, 163, 175); // gray-400
  doc.setLineWidth(0.5);
  doc.circle(iconX, iconY, iconSize / 2, 'S');
}

/**
 * Draw a heart icon (for favorites)
 */
export function drawHeartIcon(
  doc: jsPDF,
  x: number,
  y: number,
  size: number,
  color: [number, number, number],
  filled: boolean = true
): void {
  // Simplified heart using triangles and circles
  const halfSize = size / 2;

  if (filled) {
    doc.setFillColor(...color);
    // Two overlapping circles for top
    doc.circle(x - halfSize * 0.5, y - halfSize * 0.3, halfSize * 0.5, 'F');
    doc.circle(x + halfSize * 0.5, y - halfSize * 0.3, halfSize * 0.5, 'F');
    // Triangle for bottom
    doc.triangle(
      x - size * 0.5, y - halfSize * 0.1,
      x + size * 0.5, y - halfSize * 0.1,
      x, y + halfSize * 0.8,
      'F'
    );
  } else {
    doc.setDrawColor(...color);
    doc.setLineWidth(0.3);
    doc.circle(x - halfSize * 0.5, y - halfSize * 0.3, halfSize * 0.5, 'S');
    doc.circle(x + halfSize * 0.5, y - halfSize * 0.3, halfSize * 0.5, 'S');
  }
}

/**
 * Draw accordion arrow indicator
 */
export function drawAccordionArrow(
  doc: jsPDF,
  x: number,
  y: number,
  color: [number, number, number],
  expanded: boolean = true
): void {
  doc.setFillColor(...color);

  if (expanded) {
    // Down arrow (▾)
    doc.triangle(x - 2, y - 1, x + 2, y - 1, x, y + 1.5, 'F');
  } else {
    // Right arrow (▸)
    doc.triangle(x - 1, y - 2, x - 1, y + 2, x + 1.5, y, 'F');
  }
}

/**
 * Draw a decorative frame/border
 */
export function drawDecorativeFrame(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  color: [number, number, number],
  style: 'simple' | 'double' | 'ornate' = 'simple'
): void {
  doc.setDrawColor(...color);

  if (style === 'simple') {
    doc.setLineWidth(0.5);
    doc.rect(x, y, width, height, 'S');
  } else if (style === 'double') {
    doc.setLineWidth(0.3);
    doc.rect(x, y, width, height, 'S');
    doc.rect(x + 2, y + 2, width - 4, height - 4, 'S');
  } else if (style === 'ornate') {
    doc.setLineWidth(0.5);
    doc.rect(x, y, width, height, 'S');

    // Corner decorations
    const cornerSize = 4;
    doc.setFillColor(...color);

    // Top-left
    doc.rect(x - 0.5, y - 0.5, cornerSize, 1, 'F');
    doc.rect(x - 0.5, y - 0.5, 1, cornerSize, 'F');

    // Top-right
    doc.rect(x + width - cornerSize + 0.5, y - 0.5, cornerSize, 1, 'F');
    doc.rect(x + width - 0.5, y - 0.5, 1, cornerSize, 'F');

    // Bottom-left
    doc.rect(x - 0.5, y + height - 0.5, cornerSize, 1, 'F');
    doc.rect(x - 0.5, y + height - cornerSize + 0.5, 1, cornerSize, 'F');

    // Bottom-right
    doc.rect(x + width - cornerSize + 0.5, y + height - 0.5, cornerSize, 1, 'F');
    doc.rect(x + width - 0.5, y + height - cornerSize + 0.5, 1, cornerSize, 'F');
  }
}
