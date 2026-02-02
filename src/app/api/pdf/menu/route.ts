import { NextRequest, NextResponse } from 'next/server';

// Configure for Vercel Serverless
export const maxDuration = 30; // 30 seconds timeout
export const dynamic = 'force-dynamic';

/**
 * Generate PDF from menu page using Puppeteer
 * GET /api/pdf/menu?slug=restaurant-slug&type=menu|tent
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');
  const type = searchParams.get('type') || 'menu'; // 'menu' or 'tent'
  const format = searchParams.get('format') || 'a4'; // 'a4' or 'a6'

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
  }

  try {
    // Get the base URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ||
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
                    'http://localhost:3000');

    // Use the dedicated print page
    const pageUrl = `${baseUrl}/m/${slug}/print?type=${type}&format=${format}`;

    // Check if running on Vercel
    const isVercel = !!process.env.VERCEL;

    let browser;

    if (isVercel) {
      // Vercel: use puppeteer-core with @sparticuz/chromium
      const puppeteerCore = await import('puppeteer-core');
      const chromium = await import('@sparticuz/chromium');

      browser = await puppeteerCore.default.launch({
        args: chromium.default.args,
        defaultViewport: { width: 794, height: 1123 },
        executablePath: await chromium.default.executablePath(),
        headless: true,
      });
    } else {
      // Local: use puppeteer with bundled Chromium
      const puppeteer = await import('puppeteer');

      browser = await puppeteer.default.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        defaultViewport: { width: 794, height: 1123 },
        headless: true,
      });
    }

    const page = await browser.newPage();

    // Set viewport for better rendering
    await page.setViewport({
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
      deviceScaleFactor: 2, // High DPI for better quality
    });

    // Navigate to the page
    await page.goto(pageUrl, {
      waitUntil: 'networkidle0', // Wait for all resources to load
      timeout: 20000,
    });

    // Wait a bit for fonts and images to fully load
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate PDF - full page without margins
    const pdfOptions: Parameters<typeof page.pdf>[0] = {
      format: format === 'a6' ? 'A6' : 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
    };

    const pdfBuffer = await page.pdf(pdfOptions);

    await browser.close();

    // Generate filename
    const filename = type === 'tent'
      ? `tischaufsteller-${slug}.pdf`
      : `speisekarte-${slug}.pdf`;

    // Return PDF (convert Uint8Array to Buffer for NextResponse)
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: String(error) },
      { status: 500 }
    );
  }
}
