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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Impressum</h1>

        {/* Warning Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-amber-800">
                <strong>⚠️ Demo-Projekt:</strong> Die hier angezeigten Angaben sind Musterdaten und nicht rechtsverbindlich.
                Bitte verwenden Sie diese Anwendung nicht produktiv, bevor echte Unternehmensdaten eingepflegt wurden.
              </p>
            </div>
          </div>
        </div>

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
