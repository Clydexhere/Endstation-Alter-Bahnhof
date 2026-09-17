import { LegalPage } from '../legal-page';

export default function CookiesPage() {
  return (
    <LegalPage kicker="Rechtliches / 02" title="Cookie-Richtlinie" intro="Die Website verwendet derzeit keine Analyse-, Marketing- oder Personalisierungs-Cookies.">
      <section><h2>Keine optionalen Cookies</h2><p>Es werden keine Werbeprofile erstellt und keine Reichweitenmessung eingesetzt. Nach derzeitigem Stand ist deshalb kein Einwilligungsbanner erforderlich.</p></section>
      <section><h2>Hosting und Sicherheit</h2><p>Der Hosting- und Sicherheitsdienst kann technisch notwendige Cookies oder vergleichbare Speichertechniken einsetzen, um missbräuchliche Zugriffe zu erkennen und die Website auszuliefern. Diese Funktionen dienen ausschließlich Betrieb und Sicherheit.</p></section>
      <section><h2>Technisch notwendiger Sitzungsspeicher</h2><p>Das Reservierungsformular legt ausschließlich einen Zeitstempel im Sitzungsspeicher des Browsers ab, um doppelte Einsendungen innerhalb von 60 Sekunden zu verhindern. Der Eintrag enthält keine Kontaktdaten und endet spätestens mit dem Schließen des Browser-Tabs.</p></section>
      <section><h2>Externe Links</h2><p>WhatsApp, Google Kalender, Google Maps, Instagram und Produktseiten werden erst aufgerufen, wenn ein entsprechender Link aktiv angeklickt oder die Reservierungsanfrage abgesendet wird. Auf den Zielseiten können die jeweiligen Anbieter eigene Cookies einsetzen.</p></section>
      <section><h2>Änderungen</h2><p>Werden später Analytics, eingebettete Medien oder andere nicht notwendige Speichertechniken ergänzt, muss diese Richtlinie aktualisiert und gegebenenfalls vorab eine Einwilligung eingeholt werden.</p></section>
    </LegalPage>
  );
}
