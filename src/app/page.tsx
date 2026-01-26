import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
        <nav className="container mx-auto px-5 py-4 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              Beta
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 font-medium text-sm sm:text-base px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Anmelden
            </Link>
            <Link href="/register">
              <Button size="sm" className="text-sm shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5">
                <span className="hidden sm:inline">Kostenlos starten</span>
                <span className="sm:hidden">Starten</span>
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-white pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-100/50 to-teal-100/50 rounded-full blur-3xl -z-10" />

          <div className="container mx-auto px-5 max-w-6xl relative">
            <div className="py-16 sm:py-24 md:py-32">
              <div className="max-w-4xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-2 rounded-full mb-6 sm:mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Jetzt in der Beta-Phase
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 sm:mb-8 leading-[1.1] tracking-tight">
                  Digitale Speisekarte
                  <span className="block mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    in 2 Minuten
                  </span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                  Erstelle deine digitale Speisekarte mit QR-Code.
                  <span className="hidden sm:inline"> Kostenlos starten, keine technischen Kenntnisse erforderlich.</span>
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
                  <Link href="/register" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full min-h-[56px] text-base sm:text-lg px-8 shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5">
                      Jetzt kostenlos testen
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Button>
                  </Link>
                  <Link href="/m/demo-doener-palace" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full min-h-[56px] text-base sm:text-lg px-8 hover:bg-gray-50 transition-all duration-200">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Demo ansehen
                    </Button>
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Keine Kreditkarte nötig
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    In 2 Minuten online
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    DSGVO-konform
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 sm:py-24 bg-[#FAFAFA]">
          <div className="container mx-auto px-5 max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Alles was du brauchst
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Erstelle professionelle digitale Menüs ohne technische Kenntnisse
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Feature 1 */}
              <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">QR-Code Generator</h3>
                <p className="text-gray-600 leading-relaxed">
                  Automatisch generierter QR-Code für jeden Tisch. Einfach ausdrucken und fertig.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">Mobile-First Design</h3>
                <p className="text-gray-600 leading-relaxed">
                  Optimiert für Smartphones. Große Schrift, einfache Navigation, schnelle Ladezeiten.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">Einfach bearbeiten</h3>
                <p className="text-gray-600 leading-relaxed">
                  Preise und Gerichte jederzeit ändern. Keine Druckkosten mehr für neue Karten.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-5 max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Einfache Preise
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Starte kostenlos und upgrade wenn du bereit bist
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white rounded-3xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🆓</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Free</h3>
                </div>
                <p className="text-4xl sm:text-5xl font-bold mb-1 tracking-tight">
                  0€
                  <span className="text-lg font-normal text-gray-500">/Monat</span>
                </p>
                <p className="text-gray-500 mb-6">Für immer kostenlos</p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Digitale Speisekarte</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">QR-Code Generator</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Allergen-Infos</span>
                  </li>
                  <li className="flex items-center gap-3 opacity-50">
                    <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-gray-500">Mit Wasserzeichen</span>
                  </li>
                </ul>

                <Link href="/register" className="block">
                  <Button variant="outline" className="w-full min-h-[52px] text-base hover:bg-gray-50 transition-all duration-200">
                    Kostenlos starten
                  </Button>
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-xl text-white overflow-hidden">
                {/* Glow effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/20 rounded-full blur-3xl" />

                {/* Popular badge */}
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  ⭐ Beliebt
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <span className="text-xl">👑</span>
                    </div>
                    <h3 className="text-xl font-bold">Pro</h3>
                  </div>
                  <p className="text-4xl sm:text-5xl font-bold mb-1 tracking-tight">
                    9,99€
                    <span className="text-lg font-normal opacity-75">/Monat</span>
                  </p>
                  <p className="opacity-75 mb-6">
                    <span className="line-through">9,99€</span> → Während Beta: <span className="font-bold">Kostenlos!</span>
                  </p>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Alles aus Free</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Kein Wasserzeichen</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Eigenes Logo</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Priority Support</span>
                    </li>
                  </ul>

                  <Link href="/register" className="block">
                    <button className="w-full min-h-[52px] text-base font-semibold bg-white text-emerald-600 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                      Beta-Zugang sichern
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-[#FAFAFA]">
          <div className="container mx-auto px-5 max-w-6xl">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
              </div>

              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6">
                  <span className="text-emerald-400">✨</span>
                  Limitierte Beta-Plätze verfügbar
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  Bereit für deine<br />digitale Speisekarte?
                </h2>
                <p className="text-gray-400 mb-8 sm:mb-10 max-w-xl mx-auto text-lg">
                  Starte jetzt kostenlos und habe dein digitales Menü in weniger als 5 Minuten online.
                </p>
                <Link href="/register">
                  <Button size="lg" className="min-h-[56px] px-10 text-lg shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5">
                    Jetzt kostenlos starten
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="container mx-auto px-5 py-10 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                Beta
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/impressum" className="hover:text-gray-900 transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="hover:text-gray-900 transition-colors">
                Datenschutz
              </Link>
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 MenuApp. Made with ❤️ in Limburg
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
