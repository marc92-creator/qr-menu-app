import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 isolate">
        <nav className="container mx-auto px-5 py-4 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              Demo
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 font-medium text-sm sm:text-base px-4 py-3 min-h-[44px] flex items-center rounded-xl hover:bg-gray-100 transition-colors active:bg-gray-200"
            >
              Anmelden
            </Link>
            <Link href="/register">
              <Button size="sm" className="text-sm min-h-[44px] shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5">
                <span className="hidden sm:inline">Kostenlos registrieren</span>
                <span className="sm:hidden">Registrieren</span>
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-100/50 to-teal-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto px-5 max-w-6xl relative">
            <div className="py-16 sm:py-24 md:py-32">
              <div className="max-w-4xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-medium px-4 py-2 rounded-full mb-6 sm:mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  Demo-Version verfügbar
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 sm:mb-8 leading-[1.1] tracking-tight">
                  Digitale Speisekarte
                  <span className="block mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    in 2 Minuten
                  </span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                  Erstelle deine digitale Speisekarte mit QR-Code.
                  <span className="hidden sm:inline"> Demo starten, keine technischen Kenntnisse erforderlich.</span>
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
                  <Link href="/dashboard" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full min-h-[56px] text-base sm:text-lg px-8 shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5">
                      Demo starten
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
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

        {/* How it Works */}
        <section className="py-16 sm:py-24 bg-[#FAFAFA]">
          <div className="container mx-auto px-5 max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-2 rounded-full mb-4">
                So einfach geht&apos;s
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                In 3 Schritten zur digitalen Speisekarte
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Keine technischen Kenntnisse erforderlich
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative text-center">
                <div className="absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-200 to-transparent hidden md:block" style={{ transform: 'translateX(50%)' }} />
                <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl shadow-xl shadow-emerald-500/30 mb-6">
                  <span className="text-4xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Menü erstellen</h3>
                <p className="text-gray-600">
                  Füge Kategorien und Gerichte mit Preisen hinzu. Dauert nur 5 Minuten.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative text-center">
                <div className="absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-200 to-transparent hidden md:block" style={{ transform: 'translateX(50%)' }} />
                <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl shadow-xl shadow-blue-500/30 mb-6">
                  <span className="text-4xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">QR-Code drucken</h3>
                <p className="text-gray-600">
                  Lade den fertigen Tischaufsteller als PDF herunter und drucke ihn aus.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl shadow-xl shadow-purple-500/30 mb-6">
                  <span className="text-4xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Gäste scannen</h3>
                <p className="text-gray-600">
                  Gäste scannen mit dem Handy und sehen sofort dein Menü. Fertig!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-5 max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Alles was du brauchst
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Professionelle Features für dein Restaurant
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ring-1 ring-gray-100 flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">QR-Code & Tischaufsteller</h3>
                <p className="text-gray-600 text-sm">
                  Druckfertiges PDF im A4 oder A6 Format. Einfach ausdrucken und auf die Tische legen.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ring-1 ring-gray-100 flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Mobile-First Design</h3>
                <p className="text-gray-600 text-sm">
                  Optimiert für Smartphones mit großer Schrift und einfacher Navigation.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ring-1 ring-gray-100 flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">100+ Profi-Illustrationen</h3>
                <p className="text-gray-600 text-sm">
                  Wähle aus über 100 professionellen Ghibli-Stil Illustrationen oder lade eigene Fotos hoch.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ring-1 ring-gray-100 flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">14 EU-Allergene</h3>
                <p className="text-gray-600 text-sm">
                  Kennzeichne Allergene nach EU-Verordnung. DSGVO-konform und rechtssicher.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ring-1 ring-gray-100 flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">WhatsApp-Kontakt</h3>
                <p className="text-gray-600 text-sm">
                  Gäste können dich direkt per WhatsApp kontaktieren oder bestellen.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ring-1 ring-gray-100 flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-rose-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Jederzeit bearbeiten</h3>
                <p className="text-gray-600 text-sm">
                  Preise und Gerichte ändern sich sofort. Keine Druckkosten mehr.
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
                Starte mit der Demo und upgrade wenn du bereit bist
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              {/* Single unified pricing */}
              <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-xl text-white overflow-hidden">
                {/* Glow effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/20 rounded-full blur-3xl" />

                {/* Trial badge */}
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  🎉 14 Tage kostenlos
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <span className="text-xl">🚀</span>
                    </div>
                    <h3 className="text-xl font-bold">Alle Features inklusive</h3>
                  </div>
                  <p className="text-4xl sm:text-5xl font-bold mb-1 tracking-tight">
                    14 Tage gratis
                  </p>
                  <p className="opacity-75 mb-6">
                    Dann nur 9,99€/Monat · Jederzeit kündbar
                  </p>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Digitale Speisekarte mit QR-Code</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>100+ Ghibli-Illustrationen</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>5 Design-Themes</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Mehrsprachig (DE/EN)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Logo & Allergen-Infos</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>TV-Modus & PDF-Export</span>
                    </li>
                  </ul>

                  <Link href="/register" className="block mb-4">
                    <button className="w-full min-h-[52px] text-base font-semibold bg-white text-emerald-600 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                      Kostenlos starten
                    </button>
                  </Link>

                  <Link href="/dashboard" className="block">
                    <button className="w-full min-h-[44px] text-sm font-medium bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20">
                      Erst Demo ausprobieren
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 sm:py-20 bg-[#FAFAFA]">
          <div className="container mx-auto px-5 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                Restaurants vertrauen uns
              </h2>
              <p className="text-gray-600">
                Perfekt für Döner-Shops, Cafés, Restaurants und mehr
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  &quot;Endlich keine gedruckten Karten mehr! Preisänderungen sind in Sekunden online. Super einfach.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Mehmet K.</div>
                    <div className="text-gray-500 text-xs">Döner Palace, Limburg</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  &quot;Meine Gäste lieben es! Sie fragen schon, wo sie den QR-Code finden können.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Sarah M.</div>
                    <div className="text-gray-500 text-xs">Café Central, Weilburg</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  &quot;Setup hat 10 Minuten gedauert. Jetzt haben alle meine Filialen digitale Menüs.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    T
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Thomas B.</div>
                    <div className="text-gray-500 text-xs">Pizza Express, 3 Filialen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-5 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Häufige Fragen
              </h2>
            </div>

            <div className="space-y-4">
              <details className="group bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-gray-900">Brauche ich technische Kenntnisse?</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Nein! Wenn du ein Smartphone bedienen kannst, kannst du auch ein Menü erstellen. Die Demo zeigt dir Schritt für Schritt, wie es geht.
                </div>
              </details>

              <details className="group bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-gray-900">Was passiert, wenn ich Preise ändere?</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Änderungen sind sofort online sichtbar. Der QR-Code bleibt gleich - du musst nichts neu drucken.
                </div>
              </details>

              <details className="group bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-gray-900">Ist das DSGVO-konform?</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Ja! Unsere Server stehen in Frankfurt am Main, Deutschland. Wir speichern keine Kundendaten und sind vollständig DSGVO-konform.
                </div>
              </details>

              <details className="group bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-gray-900">Kann ich jederzeit kündigen?</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Ja, monatlich kündbar. Keine versteckten Kosten, keine Mindestlaufzeit. Die Demo-Version ist komplett kostenlos.
                </div>
              </details>

              <details className="group bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-gray-900">Können Gäste über die App bestellen?</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Mit der WhatsApp-Funktion können Gäste dich direkt kontaktieren. Eine vollständige Bestellfunktion ist in Planung.
                </div>
              </details>
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
                  Jetzt Demo testen
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  Bereit für deine<br />digitale Speisekarte?
                </h2>
                <p className="text-gray-400 mb-8 sm:mb-10 max-w-xl mx-auto text-lg">
                  Starte jetzt die Demo und habe dein digitales Menü in weniger als 5 Minuten online.
                </p>
                <Link href="/dashboard">
                  <Button size="lg" className="min-h-[56px] px-10 text-lg shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5">
                    Demo starten
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
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                Demo
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
