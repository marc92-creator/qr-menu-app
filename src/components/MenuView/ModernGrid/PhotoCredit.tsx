'use client';

import { ThemeConfig } from '@/lib/themes';

interface PhotoCreditProps {
  credit: string;
  theme: ThemeConfig; // eslint-disable-line @typescript-eslint/no-unused-vars
}

export function PhotoCredit({ credit }: PhotoCreditProps) {
  return (
    <div className="absolute bottom-2 right-2 z-10">
      <span
        className="text-[10px] px-2 py-1 rounded backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
        }}
      >
        📸 {credit}
      </span>
    </div>
  );
}
