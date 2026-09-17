import { LegalPage } from '../legal-page';

export default function ImpressumPage() {
  return (
    <LegalPage kicker="Rechtliches / 05" title="Impressum" intro="Anbieterkennzeichnung für die Website der Endstation – Alter Bahnhof.">
      <section><h2>Anschrift</h2><p>Endstation – Alter Bahnhof<br />Bahnhofsplatz 6<br />99974 Mühlhausen<br />Deutschland</p></section>
<section><h2>Kontakt</h2><p>Telefon: <a href="tel:+4915780791277">+49 1578 0791277</a><br /><a href="https://instagram.com/saad.abbo19800" target="_blank" rel="noreferrer">Instagram ↗</a></p></section>
      <section className="legal-warning"><h2>Noch erforderliche Betreiberangaben</h2><p>Für eine vollständige Anbieterkennzeichnung müssen der vollständige Name beziehungsweise die Rechtsform des Betreibers, eine E-Mail-Adresse und – falls vorhanden – Vertretungs-, Register- und Umsatzsteuerangaben ergänzt werden. Diese Angaben wurden für die Website noch nicht bereitgestellt.</p></section>
    </LegalPage>
  );
}
