import Link from 'next/link';
import { Logo } from '@/components/Logo';

export const metadata = {
  title: 'AGB - Allgemeine Geschäftsbedingungen',
  description: 'Allgemeine Geschäftsbedingungen für die Nutzung von MenuApp',
};

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center gap-3">
          <Link href="/">
            <Logo />
          </Link>
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Demo
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>

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
                <strong>⚠️ Demo-Projekt:</strong> Diese AGB sind eine Mustervorlage und noch nicht rechtsverbindlich.
                Es fehlen wichtige Klauseln (z.B. Widerrufsrecht). Bitte lassen Sie diese von einem Fachanwalt prüfen.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">§1 Geltungsbereich</h2>
            <p className="text-gray-600 leading-relaxed">
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen MenuApp
              (nachfolgend &quot;Anbieter&quot;) und dem Kunden (nachfolgend &quot;Nutzer&quot;) über die Nutzung
              der digitalen Speisekarten-Plattform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">§2 Leistungsbeschreibung</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Der Anbieter stellt dem Nutzer eine webbasierte Plattform zur Erstellung und
              Verwaltung digitaler Speisekarten zur Verfügung. Die Leistungen umfassen:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Erstellung und Bearbeitung von digitalen Speisekarten</li>
              <li>Generierung von QR-Codes für den Zugriff auf die Speisekarten</li>
              <li>Hosting und Bereitstellung der Speisekarten im Internet</li>
              <li>Verschiedene Design-Themes zur Gestaltung</li>
              <li>Mehrsprachige Unterstützung (Deutsch/Englisch)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">§3 Vertragsabschluss</h2>
            <p className="text-gray-600 leading-relaxed">
              Der Vertrag kommt durch die Registrierung des Nutzers auf der Plattform und
              die Bestätigung der Registrierung durch den Anbieter zustande. Mit der
              Registrierung akzeptiert der Nutzer diese AGB.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">§4 Kostenlose Testphase (Trial)</h2>
            <p className="text-gray-600 leading-relaxed">
              Jeder neue Nutzer erhält eine kostenlose Testphase von 14 Tagen mit vollem
              Funktionsumfang. Nach Ablauf der Testphase ist ein kostenpflichtiges Abonnement
              erforderlich, um die Plattform weiter nutzen zu können.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">§5 Preise und Zahlung</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Das Pro-Abonnement kostet 9,99€ pro Monat. Die Zahlung erfolgt monatlich im
              Voraus über die angebotenen Zahlungsmethoden (Kreditkarte, PayPal, etc.).
            </p>
            <p className="text-gray-600 leading-relaxed">
              Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">§6 Kündigung</h2>
            <p className="text-gray-600 leading-relaxed">
              Das Abonnement kann jederzeit zum Ende des aktuellen Abrechnungszeitraums
              gekündigt werden. Die Kündigung kann über das Nutzer-Dashboard erfolgen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">§7 Pflichten des Nutzers</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Der Nutzer ist für die Richtigkeit seiner Angaben verantwortlich</li>
              <li>Der Nutzer darf keine rechtswidrigen Inhalte veröffentlichen</li>
              <li>Der Nutzer ist für die Sicherheit seiner Zugangsdaten verantwortlich</li>
              <li>Der Nutzer darf die Plattform nicht missbräuchlich nutzen</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">§8 Haftung</h2>
            <p className="text-gray-600 leading-relaxed">
              Der Anbieter haftet nur für Schäden, die auf vorsätzlichem oder grob
              fahrlässigem Verhalten beruhen. Die Haftung für leichte Fahrlässigkeit
              ist ausgeschlossen, soweit keine wesentlichen Vertragspflichten verletzt werden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">§9 Datenschutz</h2>
            <p className="text-gray-600 leading-relaxed">
              Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer{' '}
              <Link href="/datenschutz" className="text-emerald-600 hover:underline">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">§10 Änderungen der AGB</h2>
            <p className="text-gray-600 leading-relaxed">
              Der Anbieter behält sich vor, diese AGB jederzeit zu ändern. Änderungen
              werden dem Nutzer per E-Mail mitgeteilt. Widerspricht der Nutzer nicht
              innerhalb von 4 Wochen, gelten die geänderten AGB als akzeptiert.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">§11 Schlussbestimmungen</h2>
            <p className="text-gray-600 leading-relaxed">
              Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist,
              soweit gesetzlich zulässig, der Sitz des Anbieters.
            </p>
          </section>

          <div className="pt-8 border-t border-gray-100 text-sm text-gray-500">
            <p>Stand: Januar 2025</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 flex gap-6 text-sm text-gray-500">
          <Link href="/impressum" className="hover:text-gray-900">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-gray-900">Datenschutz</Link>
          <Link href="/agb" className="hover:text-gray-900 font-medium text-gray-900">AGB</Link>
        </div>
      </footer>
    </div>
  );
}
