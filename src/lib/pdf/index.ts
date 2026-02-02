/**
 * PDF Generation Module
 * Template-specific PDF exports using Strategy Pattern
 */

import { PDFStrategy, MenuPDFOptions, TableTentPDFOptions } from './types';
import { TraditionalPDF } from './strategies/TraditionalPDF';
import { FineDiningPDF } from './strategies/FineDiningPDF';
import { ModernGridPDF } from './strategies/ModernGridPDF';
import { CompactTablePDF } from './strategies/CompactTablePDF';
import { MinimalistPDF } from './strategies/MinimalistPDF';

// Strategy instances (singleton pattern)
const strategies: Record<string, PDFStrategy> = {
  'traditional': new TraditionalPDF(),
  'fine-dining': new FineDiningPDF(),
  'modern-grid': new ModernGridPDF(),
  'compact': new CompactTablePDF(),
  'minimalist': new MinimalistPDF(),
};

// Default strategy
const defaultStrategy = strategies['traditional'];

/**
 * Get PDF strategy for a given template ID
 */
export function getPDFStrategy(templateId?: string): PDFStrategy {
  if (!templateId) {
    return defaultStrategy;
  }
  return strategies[templateId] || defaultStrategy;
}

/**
 * Generate menu PDF using the appropriate template strategy
 */
export function generateTemplateMenuPDF(options: MenuPDFOptions): void {
  const strategy = getPDFStrategy(options.templateId);
  strategy.generateMenuPDF(options);
}

/**
 * Generate table tent PDF using the appropriate template strategy
 */
export function generateTemplateTableTentPDF(options: TableTentPDFOptions): void {
  const strategy = getPDFStrategy(options.templateId);
  strategy.generateTableTentPDF(options);
}

/**
 * Get list of all available template IDs for PDF generation
 */
export function getAvailablePDFTemplates(): string[] {
  return Object.keys(strategies);
}

// Re-export types
export type { PDFStrategy, MenuPDFOptions, TableTentPDFOptions } from './types';
