import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-6 flex items-center gap-3">
          <Link href="/">
            <Logo />
          </Link>
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Demo
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Impressum</h1>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Angaben gemäß § 5 TMG</h2>
            <p className="text-gray-600">
              MenuApp<br />
              Musterstraße 123<br />
              12345 Berlin<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Kontakt</h2>
            <p className="text-gray-600">
              E-Mail: <a href="mailto:support@menuapp.de" className="text-emerald-600 hover:underline">support@menuapp.de</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p className="text-gray-600">
              MenuApp<br />
              Musterstraße 123<br />
              12345 Berlin
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">EU-Streitschlichtung</h2>
            <p className="text-gray-600">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p className="text-gray-600 mt-2">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p className="text-gray-600">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          {/* Gray note box */}
          <div className="bg-gray-100 rounded-xl p-5 mt-8">
            <p className="text-sm text-gray-500">
              <strong>Hinweis:</strong> Dies ist ein Demo-Projekt. Alle Angaben sind beispielhaft.
              Bitte ersetzen Sie diese Daten durch Ihre eigenen, bevor Sie die Anwendung produktiv nutzen.
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück zur Startseite
          </Link>
        </div>
      </main>
    </div>
  );
}
