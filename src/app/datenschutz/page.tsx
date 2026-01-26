import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function DatenschutzPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Allgemeine Hinweise</h3>
            <p className="text-gray-600">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
              Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Datenerfassung auf dieser Website</h2>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Wer ist verantwortlich für die Datenerfassung?</h3>
            <p className="text-gray-600">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
              können Sie dem Impressum dieser Website entnehmen.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">Wie erfassen wir Ihre Daten?</h3>
            <p className="text-gray-600">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich
              z.B. um Daten handeln, die Sie bei der Registrierung eingeben.
            </p>
            <p className="text-gray-600 mt-2">
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch
              unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser,
              Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>

            <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">Wofür nutzen wir Ihre Daten?</h3>
            <p className="text-gray-600">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
              Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Hosting</h2>
            <p className="text-gray-600">
              Wir hosten die Inhalte unserer Website bei Vercel Inc. und nutzen Supabase für unsere Datenbank.
              Die Server befinden sich in Frankfurt am Main, Deutschland (EU-Region).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Ihre Rechte</h2>
            <p className="text-gray-600">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
              gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
              oder Löschung dieser Daten zu verlangen.
            </p>
            <p className="text-gray-600 mt-2">
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden:
            </p>
            <p className="text-gray-600 mt-2">
              E-Mail: <a href="mailto:support@menuapp.de" className="text-emerald-600 hover:underline">support@menuapp.de</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies</h2>
            <p className="text-gray-600">
              Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem
              Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher und effektiver
              zu gestalten.
            </p>
            <p className="text-gray-600 mt-2">
              Wir verwenden ausschließlich technisch notwendige Cookies für die Authentifizierung und
              Session-Verwaltung.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Kontaktformular und E-Mail</h2>
            <p className="text-gray-600">
              Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben inklusive der von Ihnen dort
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen
              bei uns gespeichert.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Registrierung auf dieser Website</h2>
            <p className="text-gray-600">
              Sie können sich auf dieser Website registrieren, um zusätzliche Funktionen zu nutzen.
              Die dazu eingegebenen Daten verwenden wir nur zum Zwecke der Nutzung des jeweiligen Angebotes
              oder Dienstes, für den Sie sich registriert haben.
            </p>
            <p className="text-gray-600 mt-2">
              Wir speichern:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>E-Mail-Adresse</li>
              <li>Restaurant-Informationen (Name, Adresse, Logo)</li>
              <li>Speisekarten-Daten (Kategorien, Gerichte, Preise)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Zahlungsabwicklung</h2>
            <p className="text-gray-600">
              Für die Zahlungsabwicklung nutzen wir den Dienst Stripe. Stripe verarbeitet Ihre Zahlungsdaten
              gemäß deren eigener Datenschutzbestimmungen:{' '}
              <a
                href="https://stripe.com/de/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                https://stripe.com/de/privacy
              </a>
            </p>
          </section>

          {/* Gray note box */}
          <div className="bg-gray-100 rounded-xl p-5 mt-8">
            <p className="text-sm text-gray-500">
              <strong>Hinweis:</strong> Dies ist ein Demo-Projekt. Diese Datenschutzerklärung dient als Vorlage.
              Bitte passen Sie diese an Ihre spezifischen Anforderungen an und lassen Sie sie ggf. rechtlich prüfen,
              bevor Sie die Anwendung produktiv nutzen.
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
