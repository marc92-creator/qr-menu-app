'use client';

import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from './Button';
import { getMenuUrl } from '@/lib/utils';

interface QRCodeGeneratorProps {
  slug: string;
  restaurantName: string;
  size?: number;
}

export function QRCodeGenerator({ slug, restaurantName, size = 256 }: QRCodeGeneratorProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const menuUrl = getMenuUrl(slug);

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    // Create a new canvas with padding and text
    const exportCanvas = document.createElement('canvas');
    const padding = 40;
    const textHeight = 60;
    exportCanvas.width = canvas.width + padding * 2;
    exportCanvas.height = canvas.height + padding * 2 + textHeight;

    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Draw QR code
    ctx.drawImage(canvas, padding, padding);

    // Add restaurant name below
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      restaurantName,
      exportCanvas.width / 2,
      canvas.height + padding + 35
    );

    // Add URL below name
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#666666';
    ctx.fillText(
      menuUrl,
      exportCanvas.width / 2,
      canvas.height + padding + 55
    );

    // Download
    const link = document.createElement('a');
    link.download = `qr-code-${slug}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={qrRef}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <QRCodeCanvas
          value={menuUrl}
          size={size}
          level="H"
          includeMargin={true}
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-1">Scanne für Speisekarte:</p>
        <p className="font-medium text-gray-900">{menuUrl}</p>
      </div>

      <Button onClick={handleDownload}>
        QR-Code herunterladen (PNG)
      </Button>
    </div>
  );
}
