import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'MenuApp - Digitale Speisekarten für Restaurants';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Subtle gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, rgba(16, 185, 129, 0.08) 100%)',
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 60,
            padding: '0 80px',
          }}
        >
          {/* QR Code Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 200,
              height: 200,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: 40,
              boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.35)',
              flexShrink: 0,
            }}
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="3" height="3" rx="0.5" />
              <rect x="18" y="14" width="3" height="3" rx="0.5" />
              <rect x="14" y="18" width="3" height="3" rx="0.5" />
              <rect x="18" y="18" width="3" height="3" rx="0.5" />
            </svg>
          </div>

          {/* Text content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            {/* Main title */}
            <span
              style={{
                fontSize: 80,
                fontWeight: 800,
                color: '#111827',
                letterSpacing: '-3px',
                lineHeight: 1,
              }}
            >
              MenuApp
            </span>

            {/* Tagline */}
            <span
              style={{
                fontSize: 32,
                color: '#6b7280',
                fontWeight: 500,
                marginTop: 16,
              }}
            >
              Digitale Speisekarten für Restaurants
            </span>

            {/* URL */}
            <span
              style={{
                fontSize: 22,
                color: '#10b981',
                fontWeight: 600,
                marginTop: 24,
              }}
            >
              www.mymenuapp.de
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
