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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
          }}
        />

        {/* Logo icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 24,
            background: 'white',
            marginBottom: 32,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          <span style={{ fontSize: 64 }}>🍽️</span>
        </div>

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-2px',
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            MenuApp
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.95)',
            fontWeight: 500,
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Digitale Speisekarten für Restaurants
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: 32,
            marginTop: 48,
          }}
        >
          {['QR-Codes', 'Übersetzung', 'Analytics'].map((feature) => (
            <div
              key={feature}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 100,
                fontSize: 20,
                color: 'white',
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: 20 }}>✓</span>
              {feature}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 22,
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: 500,
          }}
        >
          www.mymenuapp.de
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
