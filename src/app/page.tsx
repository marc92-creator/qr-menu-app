import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              Beta
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 font-medium text-sm sm:text-base px-2 py-2 active:opacity-70"
            >
              Anmelden
            </Link>
            <Link href="/register">
              <Button size="sm" className="text-sm">
                <span className="hidden sm:inline">Kostenlos starten</span>
                <span className="sm:hidden">Starten</span>
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="container mx-auto px-4">
        <section className="py-12 sm:py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Digitale Speisekarte
              <span className="text-emerald-500 block sm:inline"> in 2 Minuten</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 px-2">
              Erstelle deine digitale Speisekarte mit QR-Code.
              <span className="hidden sm:inline"> Kostenlos starten, keine technischen Kenntnisse erforderlich.</span>
              <span className="sm:hidden"> Kostenlos & einfach.</span>
            </p>

            {/* CTAs - Stacked on mobile, side by side on desktop */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full min-h-[52px] text-base">
                  Jetzt kostenlos testen
                </Button>
              </Link>
              <Link href="/m/demo-doener-palace" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full min-h-[52px] text-base">
                  Demo ansehen
                </Button>
              </Link>
            </div>

            {/* Trust badge */}
            <p className="mt-6 text-sm text-gray-500">
              Kostenlos während der Beta-Phase
            </p>
          </div>
        </section>

        {/* Features - Single column on mobile, 3 columns on desktop */}
        <section className="py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm active:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">QR-Code Generator</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Automatisch generierter QR-Code für jeden Tisch. Einfach ausdrucken und fertig.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm active:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Mobile-First Design</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Optimiert für Smartphones. Große Schrift, einfache Navigation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm active:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Einfach bearbeiten</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Preise und Gerichte jederzeit ändern. Keine Druckkosten mehr.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing - Stacked on mobile */}
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            Einfache Preise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border-2 border-gray-100">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Free</h3>
              <p className="text-3xl sm:text-4xl font-bold mb-4">
                0€
                <span className="text-base sm:text-lg font-normal text-gray-500">/Monat</span>
              </p>
              <ul className="space-y-3 mb-6 sm:mb-8">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base">Digitale Speisekarte</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base">QR-Code Generator</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm sm:text-base">Mit Wasserzeichen</span>
                </li>
              </ul>
              <Link href="/register" className="block">
                <Button variant="outline" className="w-full min-h-[48px]">
                  Kostenlos starten
                </Button>
              </Link>
            </div>

            {/* Basic Plan */}
            <div className="bg-emerald-500 rounded-2xl p-6 sm:p-8 shadow-lg text-white relative overflow-hidden">
              {/* Popular badge */}
              <div className="absolute top-4 right-4 bg-white/20 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Beliebt
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Basic</h3>
              <p className="text-3xl sm:text-4xl font-bold mb-1">
                9,99€
                <span className="text-base sm:text-lg font-normal opacity-75">/Monat</span>
              </p>
              <p className="text-sm opacity-75 mb-4">Während der Beta: Kostenlos!</p>
              <ul className="space-y-3 mb-6 sm:mb-8">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base">Alles aus Free</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base">Kein Wasserzeichen</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base">Priority Support</span>
                </li>
              </ul>
              <Link href="/register" className="block">
                <Button variant="secondary" className="w-full min-h-[48px] bg-white text-emerald-600 hover:bg-gray-100">
                  Jetzt upgraden
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16">
          <div className="bg-gray-900 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Bereit für deine digitale Speisekarte?
            </h2>
            <p className="text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
              Starte jetzt kostenlos und habe dein digitales Menü in weniger als 5 Minuten online.
            </p>
            <Link href="/register">
              <Button size="lg" className="min-h-[52px] px-8">
                Jetzt kostenlos starten
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-8 sm:mt-12">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                Beta
              </span>
            </div>
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2025 MenuApp. Made with in Limburg.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
