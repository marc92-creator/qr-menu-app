'use client';

import { Restaurant } from '@/types/database';
import { Button } from '@/components/Button';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';

interface QRCodeTabProps {
  restaurant: Restaurant;
}

export function QRCodeTab({ restaurant }: QRCodeTabProps) {
  const menuUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/m/${restaurant.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(menuUrl);
    alert('Link kopiert!');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">QR-Code</h1>

      <div className="bg-white rounded-2xl p-8">
        <QRCodeGenerator
          slug={restaurant.slug}
          restaurantName={restaurant.name}
          size={256}
        />

        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={handleCopyLink}>
            Link kopieren
          </Button>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <h3 className="font-semibold mb-2">Tipp</h3>
          <p className="text-gray-600 text-sm">
            Drucke den QR-Code aus und lege ihn auf jeden Tisch. Deine Gäste können
            dann einfach mit ihrem Handy scannen und sehen sofort dein Menü.
          </p>
        </div>
      </div>
    </div>
  );
}
