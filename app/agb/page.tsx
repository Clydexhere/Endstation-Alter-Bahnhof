import { LegalPage } from '../legal-page';

export default function AgbPage() {
  return (
    <LegalPage kicker="Rechtliches / 03" title="Reservierungsbedingungen" intro="Diese Bedingungen gelten für Reservierungsanfragen über die Website der Endstation – Alter Bahnhof.">
      <section><h2>1. Anfrage und Bestätigung</h2><p>Das Absenden des Formulars ist eine unverbindliche Reservierungsanfrage. Eine Reservierung kommt erst zustande, wenn sie von der Endstation persönlich bestätigt wurde.</p></section>
      <section><h2>2. Angaben</h2><p>Gäste müssen vollständige und richtige Kontakt- und Reservierungsdaten angeben. Änderungen der Personenzahl oder Ankunftszeit sollen möglichst früh telefonisch oder über den bestätigten Kontakt mitgeteilt werden.</p></section>
      <section><h2>3. Verspätung und Freigabe des Tisches</h2><p>Kann eine bestätigte Ankunftszeit nicht eingehalten werden, ist die Endstation zu informieren. Ohne Nachricht kann ein Tisch nach angemessener Wartezeit anderweitig vergeben werden.</p></section>
      <section><h2>4. Stornierung</h2><p>Reservierungen können über den bestätigten Kontakt oder telefonisch unter <a href="tel:+4915780791277">+49 1578 0791277</a> storniert werden. Je früher die Absage erfolgt, desto besser kann der Tisch neu vergeben werden.</p></section>
      <section><h2>5. Jugendschutz und Hausrecht</h2><p>Tabak- und nikotinhaltige Produkte werden ausschließlich an volljährige Personen abgegeben. Vor Ort gelten das Jugendschutzgesetz, die Hausordnung und die Weisungen des Personals.</p></section>
      <section><h2>6. Verfügbarkeit und Haftung</h2><p>Ein Anspruch auf einen bestimmten Tisch oder Bereich besteht nur bei ausdrücklicher Bestätigung. Im Übrigen gelten die gesetzlichen Haftungsregelungen.</p></section>
      <section><h2>7. Online-Zahlungen</h2><p>Über diese Website werden derzeit keine Zahlungen, Anzahlungen oder Zahlungsdaten verarbeitet.</p></section>
    </LegalPage>
  );
}
