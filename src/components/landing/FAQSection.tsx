'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Brauchen meine Gäste eine App?",
    answer: "Nein! Gäste scannen einfach den QR-Code und sehen die Speisekarte direkt im Browser. Keine App-Installation, keine Registrierung – funktioniert auf jedem Smartphone."
  },
  {
    question: "Kann ich Allergene und Zusatzstoffe anzeigen?",
    answer: "Ja! Du kannst für jedes Gericht Allergene (Gluten, Laktose, Nüsse, etc.) und Zusatzstoffe hinterlegen. Gäste können sogar nach Allergenen filtern."
  },
  {
    question: "Kann ich Gerichte als ausverkauft markieren?",
    answer: "Ja, mit einem Klick. Das Gericht wird dann ausgegraut angezeigt oder komplett ausgeblendet – du entscheidest."
  },
  {
    question: "Funktioniert es ohne WLAN?",
    answer: "Ja! Deine Gäste brauchen nur mobiles Internet (4G/5G). Die Speisekarte lädt schnell und verbraucht kaum Datenvolumen."
  },
  {
    question: "Wie schnell ist meine Speisekarte online?",
    answer: "In unter 10 Minuten. Registrieren, Restaurant-Infos eingeben, Gerichte hinzufügen – fertig. Du bekommst sofort einen QR-Code zum Ausdrucken."
  },
  {
    question: "Kann ich die Speisekarte in mehreren Sprachen anbieten?",
    answer: "Ja! Aktuell Deutsch und Englisch. Die Sprache wechselt automatisch basierend auf dem Handy deiner Gäste."
  },
  {
    question: "Was kostet MenuApp?",
    answer: "14 Tage kostenlos testen, danach 9,99€/Monat. Keine versteckten Kosten, keine Provision pro Bestellung, jederzeit kündbar."
  },
  {
    question: "Wo werden meine Daten gespeichert?",
    answer: "In der EU (Deutschland). MenuApp ist 100% DSGVO-konform. Deine Daten gehören dir."
  },
  {
    question: "Kann ich meine bestehende Speisekarte importieren?",
    answer: "Bald! Wir arbeiten an einem KI-Import, der deine PDF-Speisekarte automatisch einliest. Aktuell kannst du Gerichte schnell manuell anlegen."
  },
  {
    question: "Bekomme ich Support auf Deutsch?",
    answer: "Ja! Unser Support ist auf Deutsch und antwortet in der Regel innerhalb von 24 Stunden per E-Mail."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20 bg-white" id="faq">
      <div className="container mx-auto px-5 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Häufige Fragen
          </h2>
          <p className="text-gray-600 text-lg">
            Alles was du über MenuApp wissen musst
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-8">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-emerald-500 flex-shrink-0 w-5 h-5" />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0 w-5 h-5" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10 pt-10 border-t border-gray-100">
          <p className="text-gray-500">
            Noch Fragen?{' '}
            <a href="mailto:support@mymenuapp.de" className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium">
              Schreib uns eine E-Mail
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
