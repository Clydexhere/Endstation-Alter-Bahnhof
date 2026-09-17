'use client';

import { useEffect } from 'react';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error('Endstation website error', error); }, [error]);
  return <main className="system-state"><p className="state-kicker">Da ist etwas schiefgelaufen.</p><h1>Die Seite konnte nicht geladen werden.</h1><p>Bitte versuche es erneut. Falls der Fehler bleibt, erreichst du uns telefonisch unter <a href="tel:+4915780791277">+49 1578 0791277</a>.</p><button className="button button--primary" type="button" onClick={reset}>Erneut versuchen</button><a className="text-link" href="/">Zur Startseite</a></main>;
}
