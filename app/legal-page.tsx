import type { ReactNode } from 'react';

type LegalPageProps = {
  kicker: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function LegalPage({ kicker, title, intro, children }: LegalPageProps) {
  return (
    <main className="legal-shell" id="main-content">
      <a className="skip-link" href="#legal-content">Zum Inhalt springen</a>
      <header className="legal-nav">
        <a className="brand" href="/" aria-label="Zur Startseite der Endstation">
          <span className="brand-mark"><img src="/gorilla-logo.png" alt="" /></span>
          <span>ENDSTATION<small>ALTER BAHNHOF</small></span>
        </a>
        <a className="legal-back" href="/">Zur Website ↗</a>
      </header>
      <article className="legal-content" id="legal-content">
        <p className="legal-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="legal-intro">{intro}</p>
        <p className="legal-date">Stand: September 2026</p>
        <div className="legal-sections">{children}</div>
      </article>
      <footer className="legal-footer">
        <div><strong>Endstation – Alter Bahnhof</strong><span>Bahnhofsplatz 6 · 99974 Mühlhausen</span><a href="tel:+4915780791277">+49 1578 0791277</a></div>
        <nav aria-label="Rechtliche Hinweise"><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/cookies">Cookies</a><a href="/agb">AGB</a><a href="/erstattung">Erstattung</a></nav>
      </footer>
    </main>
  );
}
