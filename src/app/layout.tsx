import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'MenuApp - Digitale Speisekarten für Restaurants',
  description: 'Erstelle deine digitale Speisekarte in Minuten. QR-Codes, automatische Übersetzung, Analytics.',
  metadataBase: new URL('https://www.mymenuapp.de'),
  openGraph: {
    title: 'MenuApp - Digitale Speisekarten für Restaurants',
    description: 'Erstelle deine digitale Speisekarte in Minuten. QR-Codes, automatische Übersetzung, Analytics.',
    url: 'https://www.mymenuapp.de',
    siteName: 'MenuApp',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: 'https://www.mymenuapp.de/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'MenuApp - Digitale Speisekarten für Restaurants',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MenuApp - Digitale Speisekarten für Restaurants',
    description: 'Erstelle deine digitale Speisekarte in Minuten.',
    images: ['https://www.mymenuapp.de/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
