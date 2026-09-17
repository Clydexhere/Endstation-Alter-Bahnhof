import { LegalPage } from '../legal-page';

export default function ErstattungPage() {
  return (
    <LegalPage kicker="Rechtliches / 04" title="Erstattungsrichtlinie" intro="Die Website nimmt derzeit keine Zahlungen oder Anzahlungen entgegen.">
      <section><h2>Keine Online-Zahlungen</h2><p>Da über diese Website kein Geld eingezogen wird, entstehen hier keine online zu erstattenden Beträge und kein Risiko doppelter Zahlungen.</p></section>
      <section><h2>Zahlungen vor Ort</h2><p>Für Zahlungen, die unmittelbar vor Ort geleistet werden, gelten die gesetzlichen Ansprüche sowie die bei der Zahlung vereinbarten Bedingungen. Rückfragen können unter <a href="tel:+4915780791277">+49 1578 0791277</a> geklärt werden.</p></section>
      <section><h2>Spätere Anzahlungen</h2><p>Sollte zukünftig eine Online-Anzahlung eingeführt werden, müssen vor Aktivierung klare Storno-, Erstattungs- und Zahlungsbedingungen ergänzt sowie doppelte Belastungen technisch verhindert werden.</p></section>
    </LegalPage>
  );
}
