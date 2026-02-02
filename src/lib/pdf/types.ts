import { jsPDF } from 'jspdf';
import { Restaurant, Category, MenuItem } from '@/types/database';
import { ThemeConfig } from '@/lib/themes';

/**
 * PDF Colors interface - RGB tuples for jsPDF
 */
export interface PDFColors {
  primary: [number, number, number];
  text: [number, number, number];
  textMuted: [number, number, number];
  background: [number, number, number];
  accent: [number, number, number];
  priceColor: [number, number, number];
  darkGray: [number, number, number];
  lightGray: [number, number, number];
}

/**
 * Menu PDF generation options
 */
export interface MenuPDFOptions {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  includeAllergens?: boolean;
  includeQRCode?: boolean;
  qrCanvas?: HTMLCanvasElement | null;
  theme?: ThemeConfig;
  templateId?: string;
}

/**
 * Table tent PDF generation options
 */
export interface TableTentPDFOptions {
  restaurantName: string;
  slug: string;
  qrCanvas: HTMLCanvasElement;
  theme?: ThemeConfig;
  templateId?: string;
}

/**
 * Category with items for PDF rendering
 */
export interface CategoryWithItems {
  category: Category;
  items: MenuItem[];
}

/**
 * PDF page dimensions
 */
export interface PDFDimensions {
  pageWidth: number;
  pageHeight: number;
  margin: number;
  contentWidth: number;
}

/**
 * PDF rendering context passed to strategy methods
 */
export interface PDFRenderContext {
  doc: jsPDF;
  colors: PDFColors;
  dimensions: PDFDimensions;
  currentY: number;
  language: string;
}

/**
 * Interface for PDF generation strategies
 */
export interface PDFStrategy {
  /**
   * Template ID this strategy handles
   */
  readonly templateId: string;

  /**
   * Generate the complete menu PDF
   */
  generateMenuPDF(options: MenuPDFOptions): void;

  /**
   * Generate table tent PDF
   */
  generateTableTentPDF(options: TableTentPDFOptions): void;
}

/**
 * Course type groupings for fine dining
 */
export type CourseGroup = 'appetizer' | 'main' | 'dessert' | 'drinks' | 'other';

/**
 * Item size configuration (for compact template)
 */
export interface ItemSizeConfig {
  name: string;
  price: number;
}

/**
 * Addon configuration (for compact template)
 */
export interface AddonConfig {
  name: string;
  price: number;
}
