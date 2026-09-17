'use client';

import { useEffect, useRef, useState } from 'react';

type Tobacco = {
  name: string;
  type: string;
  taste: string;
  note: string;
  source: string;
};

const experiences = [
  { number: '01', title: 'Tabaksorten', text: 'Handverlesene Tabaksorten für das perfekte Raucherlebnis', href: '#tabaksorten' },
  { number: '02', title: 'Drinks', text: 'Cocktails, alkoholfreie Kreationen und Klassiker für lange Nächte.', href: '#drinks' },
  { number: '03', title: 'Late Night Culture', text: 'Drei stilisierte Stimmungsmotive von Eingang, Bar und Lounge.', href: '#culture' },
];

const tobaccos: Tobacco[] = [
  { name: 'Massai', type: 'Virginia Blend', taste: 'Intensiver Früchtemix', note: 'Vielschichtig, süß-fruchtig und harmonisch ausbalanciert.', source: 'https://shisha-world.com/p/aino-tabak-massai-200g' },
  { name: 'G.O.A.T.', type: 'Virginia', taste: 'Traube & Minze', note: 'Volle Traubennote mit einem klaren, kühlen Finish.', source: 'https://shisha-world.com/p/aino-tabak-goat-200g' },
  { name: 'Le Monyze', type: 'Virginia Blend', taste: 'Saure Zitrone & Ice', note: 'Spritzige Zitrone trifft auf eine deutlich eisige Frische.', source: 'https://shisha-world.com/p/aino-tabak-le-monyze-200g' },
  { name: 'Fruit Squad', type: 'Blend Tabak', taste: 'Wassermelone, Johannisbeere & Limette', note: 'Fruchtig, leicht süß und mit einer belebenden Zitrusnote.', source: 'https://shisha-world.com/p/aino-tabak-fruit-squad-200g' },
  { name: 'Pi', type: 'Dark Blend', taste: 'Schwarzer Tee & Physalis', note: 'Herbe Teetiefe mit einer außergewöhnlich fruchtigen Physalisnote.', source: 'https://shisha-world.com/p/aino-strong-tabak-pi-200g' },
  { name: 'Great Match', type: 'Virginia Blend', taste: 'Grapefruit & Physalis', note: 'Exotisch, leicht herb und angenehm spritzig-sauer.', source: 'https://shisha-world.com/p/aino-tabak-great-match-200g' },
  { name: 'Great Raspy', type: 'Virginia Tabak', taste: 'Himbeere & Ice', note: 'Reife Himbeere mit beeriger Süße und kühlem Abschluss.', source: 'https://shisha-world.com/p/aino-tabak-the-great-raspy-200g' },
];

const drinks = [
  { number: '01', title: 'Signature Cocktails', text: 'Eigenständige Kreationen, präzise gemixt und visuell inszeniert.' },
  { number: '02', title: 'Mocktails', text: 'Alkoholfreie Drinks mit Tiefe, Frische und echtem Bar-Charakter.' },
  { number: '03', title: 'Longdrinks', text: 'Bekannte Klassiker für entspannte Gespräche und lange Nächte.' },
  { number: '04', title: 'Softdrinks', text: 'Eiskalt serviert – pur oder als Begleitung zur Session.' },
  { number: '05', title: 'Energy', text: 'Der richtige Kick, wenn die Nacht gerade erst beginnt.' },
  { number: '06', title: 'Hot Drinks', text: 'Kaffee und warme Begleiter für ruhigere Momente am Gleis.' },
];

const googleReviewsUrl = 'https://www.google.com/maps/search/?api=1&query=Endstation+Alter+Bahnhof%2C+Bahnhofsplatz+6%2C+99974+M%C3%BChlhausen';

const reviews = [
  { name: 'Luca Fischer', quote: 'Gute Shisha und gute Getränke.' },
  { name: 'Jannes', quote: 'Baba Personal und gute Auswahl an Köpfen.' },
  { name: 'Sebastian Möller', quote: 'Gemütliches Ambiente mit fairen Getränkepreisen.' },
];

function reservationTimes(date: string) {
  if (!date) return [];
  const day = new Date(`${date}T12:00:00`).getDay();
  if (day === 4) return ['17:40', '18:00', '19:00', '20:00', '21:00', '22:00'];
  if (day === 5 || day === 6) return ['20:00', '21:00', '22:00', '23:00'];
  if (day === 0) return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  return [];
}

const sectionIds = ['start', 'experience', 'tabaksorten', 'drinks', 'culture', 'atmosphaere', 'besuch', 'reservieren'] as const;

const formatCalendarDate = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
};

export default function Lounge() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  const [calendarUrl, setCalendarUrl] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [selectedTobacco, setSelectedTobacco] = useState<Tobacco | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [reservationDate, setReservationDate] = useState('');
  const modalRef = useRef<HTMLElement>(null);
  const formStartedAt = useRef(0);
  useEffect(() => { formStartedAt.current = Date.now(); }, []);
  const minimumDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin' }).format(new Date());

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        const marker = window.innerHeight * .42;
        let current = 0;
        sectionIds.forEach((id, index) => {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= marker) current = index;
        });
        setActiveSectionIndex(current);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    document.documentElement.classList.add('section-motion-ready');
    sections[0]?.classList.add('section-in-view');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('section-in-view');
      });
    }, { threshold: .08, rootMargin: '0px 0px -8% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('section-motion-ready');
    };
  }, []);

  useEffect(() => {
    if (introDone) return;
    document.body.classList.add('intro-locked');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setIntroDone(true), reduceMotion ? 250 : 4400);
    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove('intro-locked');
    };
  }, [introDone]);

  useEffect(() => {
    if (!selectedTobacco) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedTobacco(null);
      if (event.key === 'Tab') {
        const items = modalRef.current?.querySelectorAll<HTMLElement>('button, a[href]');
        if (!items?.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.body.classList.add('modal-locked');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('modal-locked');
      window.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [selectedTobacco]);

  const finishIntro = () => setIntroDone(true);
  const closeMenu = () => setMenuOpen(false);
  const isLastSection = activeSectionIndex === sectionIds.length - 1;
  const nextSectionId = isLastSection ? sectionIds[0] : sectionIds[activeSectionIndex + 1];

  const sendReservation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting || sent) return;
    const form = new FormData(event.currentTarget);
    setFormError('');
    setSubmitting(true);

    if (String(form.get('website') || '').trim()) {
      setFormError('Die Anfrage konnte nicht geprüft werden. Bitte lade die Seite neu.');
      setSubmitting(false);
      return;
    }

    if (Date.now() - formStartedAt.current < 2500) {
      setFormError('Bitte nimm dir kurz Zeit, deine Angaben zu prüfen.');
      setSubmitting(false);
      return;
    }

    try {
      const lastRequest = Number(window.sessionStorage.getItem('endstation-last-reservation') || 0);
      if (Date.now() - lastRequest < 60000) {
        setFormError('Eine Anfrage wurde gerade erst vorbereitet. Bitte warte eine Minute.');
        setSubmitting(false);
        return;
      }
    } catch {
      // Private browsing can block local storage; the remaining checks still apply.
    }

    const name = String(form.get('name'));
    const phone = String(form.get('phone'));
    const date = String(form.get('date'));
    const time = String(form.get('time'));
    const guests = String(form.get('guests'));
    if (date < minimumDate || !reservationTimes(date).includes(time)) {
      setFormError('Bitte wähle einen geöffneten Tag und eine angebotene Uhrzeit.');
      setSubmitting(false);
      return;
    }
    const note = String(form.get('note') || '').trim() || '–';
    const message = [
      'Hallo Endstation Alter Bahnhof, ich möchte gerne reservieren:',
      'Name: ' + name,
      'Telefon: ' + phone,
      'Datum: ' + date,
      'Uhrzeit: ' + time,
      'Personen: ' + guests,
      'Wunsch: ' + note,
    ].join('\n');

    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const startsAt = new Date(year, month - 1, day, hours, minutes);
    const endsAt = new Date(startsAt.getTime() + 2 * 60 * 60 * 1000);
    const calendarParams = new URLSearchParams({
      action: 'TEMPLATE',
      text: 'Reservierungsanfrage – Endstation Alter Bahnhof',
      dates: `${formatCalendarDate(startsAt)}/${formatCalendarDate(endsAt)}`,
      ctz: 'Europe/Berlin',
      location: 'Bahnhofsplatz 6, 99974 Mühlhausen',
      details: `Anfrage für ${guests} Person(en). Der Termin ist erst nach Bestätigung durch die Endstation verbindlich.`,
    });
    setCalendarUrl(`https://calendar.google.com/calendar/render?${calendarParams.toString()}`);
    const nextWhatsappUrl = 'https://wa.me/4915780791277?text=' + encodeURIComponent(message);
    setWhatsappUrl(nextWhatsappUrl);
    const whatsappWindow = window.open(nextWhatsappUrl, '_blank');
    if (!whatsappWindow) {
      setFormError('WhatsApp konnte nicht automatisch geöffnet werden. Nutze bitte den manuellen Link unten.');
      setSubmitting(false);
      return;
    }
    whatsappWindow.opener = null;
    try { window.sessionStorage.setItem('endstation-last-reservation', String(Date.now())); } catch { /* Storage may be unavailable. */ }
    window.setTimeout(() => {
      setSent(true);
      setSubmitting(false);
    }, 350);
  };

  return (
    <main id="main-content">
      <a className="skip-link" href="#main-content">Zum Hauptinhalt springen</a>
      {!introDone && (
        <section className="smoke-intro" aria-label="Intro Endstation Alter Bahnhof">
          <div className="smoke-rings" aria-hidden="true"><i /><i /><i /></div>
          <div className="intro-wordmark">
            <img src="/gorilla-logo.png" alt="Comic-Gorilla der Endstation mit Shisha" />
            <div className="intro-name"><p>ENDSTATION</p><span>ALTER BAHNHOF</span></div>
          </div>
          <button className="skip-intro" type="button" onClick={finishIntro}>Intro überspringen ↗</button>
        </section>
      )}

      <header className={['nav', scrolled ? 'nav--scrolled' : ''].filter(Boolean).join(' ')}>
        <a className="brand" href="#start" aria-label="Endstation – Startseite">
          <span className="brand-mark"><img src="/gorilla-logo.png" alt="" /></span>
          <span>ENDSTATION<small>ALTER BAHNHOF</small></span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menuOpen}><span /><span /></button>
        <nav className={menuOpen ? 'nav-links nav-links--open' : 'nav-links'} aria-label="Hauptnavigation">
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#tabaksorten" onClick={closeMenu}>Tabak</a>
          <a href="#drinks" onClick={closeMenu}>Drinks</a>
          <a href="#culture" onClick={closeMenu}>Culture</a>
          <a href="#besuch" onClick={closeMenu}>Besuch</a>
          <a className="nav-cta" href="#reservieren" onClick={closeMenu}>Reservieren</a>
        </nav>
      </header>

      <a
        className={isLastSection ? 'scroll-cue scroll-cue--return' : 'scroll-cue'}
        href={`#${nextSectionId}`}
        aria-label={isLastSection ? 'Zurück zum Anfang' : 'Zum nächsten Bereich'}
      >
        <span>Scroll</span><i aria-hidden="true" />
      </a>

      <section className="hero section snap-section" id="start">
        <div className="hero-image" /><div className="hero-glow" />
        <div className="hero-content">
          <p className="eyebrow"><span /> Mühlhausen · Thüringen</p>
          <h1>Dein Abend.<br /><em>Deine Endstation.</em></h1>
          <p className="hero-copy">Shisha-Kultur, Drinks und urbane Nächte in den historischen Mauern des Alten Bahnhofs.</p>
          <div className="hero-actions"><a className="button button--primary" href="#reservieren">Tisch reservieren <span>↗</span></a><a className="text-link" href="#experience">Lounge entdecken <span>↓</span></a></div>
        </div>
        <div className="hero-side">51.2091° N&nbsp;&nbsp; 10.4737° E</div>
      </section>

      <section className="intro section snap-section" id="experience">
        <div className="orb orb-one" /><div className="section-number">01 / EXPERIENCE</div>
        <div className="intro-grid"><div><p className="eyebrow"><span /> Mehr als eine Lounge</p><h2>Wo Geschichte auf<br /><em>Nachtkultur trifft.</em></h2></div><div className="intro-copy"><p>Ein alter Bahnhof. Eine neue Destination. Wir verbinden markante Architektur mit entspannter Atmosphäre, ausgewählten Shishas und Drinks für lange Abende.</p><a className="text-link" href="#tabaksorten">Tabaksorten ansehen <span>↗</span></a></div></div>
        <div className="experience-list">{experiences.map((item) => <a href={item.href} key={item.number}><article><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><i>↗</i></article></a>)}</div>
      </section>

      <section className="tobacco section snap-section" id="tabaksorten">
        <div className="section-number">02 / TABAKSORTEN</div>
        <div className="catalog-heading">
          <div><p className="eyebrow"><span /> AINO Selection</p><h2>Sieben Sorten.<br /><em>Dein Geschmack.</em></h2></div>
          <p>Handverlesene Tabaksorten für das perfekte Raucherlebnis. Tippe auf eine Sorte und entdecke Blend und Geschmacksprofil.</p>
        </div>
        <div className="tobacco-rail" aria-label="Auswahl der Tabaksorten">
          {tobaccos.map((tobacco, index) => (
            <button className="tobacco-card" type="button" key={tobacco.name} onClick={() => setSelectedTobacco(tobacco)}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div className="flavor-orbit"><i /></div>
              <small>AINO</small><h3>{tobacco.name}</h3><p>{tobacco.taste}</p><b>Details öffnen ↗</b>
            </button>
          ))}
        </div>
        <p className="rail-hint">Seitlich wischen / scrollen →</p>
      </section>

      <section className="drinks section snap-section" id="drinks">
        <div className="section-number">03 / DRINKS</div>
        <div className="drinks-copy"><p className="eyebrow"><span /> From the bar</p><h2>Gemacht für<br /><em>lange Nächte.</em></h2><p>Klassiker, Signatures und alkoholfreie Alternativen – reduziert präsentiert, präzise serviert.</p></div>
        <div className="drinks-grid">{drinks.map((drink) => <article key={drink.number}><span>{drink.number}</span><h3>{drink.title}</h3><p>{drink.text}</p><i /></article>)}</div>
        <a className="button button--outline" href="#reservieren">Tisch reservieren <span>↗</span></a>
      </section>

      <section className="culture section snap-section" id="culture">
        <div className="culture-copy"><div className="section-number">04 / LATE NIGHT CULTURE</div><p className="eyebrow"><span /> Atmosphäre</p><h2>Ein Ort.<br /><em>Drei Motive.</em></h2><p>Stilisierte Visualisierungen von Eingang, Bar und Lounge vermitteln die geplante Licht- und Farbstimmung. Sie sind keine dokumentarischen Aufnahmen.</p></div>
        <div className="culture-stage" aria-label="Stilisierte Stimmungsmotive der Endstation">
          <figure className="culture-slide culture-slide--one"><img src="/entrance-night.png" alt="Stilisierte Visualisierung eines nächtlichen Eingangs in violettem Licht" /><figcaption><span>01</span> Eingang</figcaption></figure>
          <figure className="culture-slide culture-slide--two"><img src="/bar-night.png" alt="Stilisierte Visualisierung eines Barbereichs mit violetter Nachtbeleuchtung" /><figcaption><span>02</span> Bar</figcaption></figure>
          <figure className="culture-slide culture-slide--three"><img src="/lounge-hero.png" alt="Stilisierte Visualisierung einer Shisha-Lounge in einem historischen Gebäude" /><figcaption><span>03</span> Lounge</figcaption></figure>
          <div className="culture-frame" aria-hidden="true" />
        </div>
      </section>

      <section className="atmosphere section snap-section" id="atmosphaere"><div className="atmosphere-photo" aria-hidden="true" /><div className="atmosphere-panel"><div className="section-number">05 / ATMOSPHÄRE</div><p className="eyebrow"><span /> Nachts am Gleis</p><h2>Zwischen<br /><em>Rauch & Licht.</em></h2><p>Sanfte Beats, Gespräche und wechselnde Lichtstimmungen prägen den Abend im Alten Bahnhof.</p><div className="stats"><div><strong>∞</strong><span>Vibes</span></div><div><strong>01</strong><span>Destination</span></div><div><strong>Late</strong><span>Open</span></div></div></div></section>

<section className="visit section snap-section" id="besuch"><div className="orb orb-two" /><div className="section-number">06 / DEIN BESUCH</div><div className="visit-grid"><div><p className="eyebrow"><span /> Wir sehen uns</p><h2>Der nächste Zug<br /><em>geht zu uns.</em></h2></div><div className="visit-details"><div><span>Adresse</span><p>Bahnhofsplatz 6<br />99974 Mühlhausen</p></div><div><span>Öffnungszeiten</span><dl className="opening-hours"><div><dt>Mo – Mi</dt><dd>Geschlossen</dd></div><div><dt>Do</dt><dd>17:40 – 23:00</dd></div><div><dt>Fr – Sa</dt><dd>20:00 – 04:38</dd></div><div><dt>So</dt><dd>17:00 – 23:00</dd></div></dl><p className="source-note"><a href={googleReviewsUrl} target="_blank" rel="noreferrer">Quelle: Google Maps ↗</a> · Stand 16.09.2026. Feiertagszeiten können abweichen.</p></div><div><span>Kontakt</span><p><a href="tel:+4915780791277">+49 1578 0791277</a><br /><a href="https://instagram.com/saad.abbo19800" target="_blank" rel="noreferrer">Instagram ↗</a></p></div></div></div>
        <div className="guest-reviews" aria-labelledby="reviews-title"><h3 id="reviews-title">Stimmen unserer Gäste</h3><p className="source-note">Drei ausgewählte Google-Rezensionen, auszugsweise. Keine repräsentative Gesamtauswertung. Stand: 16.09.2026.</p><div className="review-grid">{reviews.map(review => <figure key={review.name}><p className="review-stars" aria-label="5 von 5 Sternen">★★★★★</p><blockquote>„{review.quote}“</blockquote><figcaption>{review.name}<a href={googleReviewsUrl} target="_blank" rel="noreferrer">Quelle: Google Maps ↗</a></figcaption></figure>)}</div></div>
        <a className="reviews-card" href={googleReviewsUrl} target="_blank" rel="noreferrer" aria-label="Google-Unternehmensprofil der Endstation öffnen"><div><span>Google Maps</span><small>Unternehmensprofil</small></div><p>Standort, öffentlich sichtbare Informationen und Bewertungen direkt bei Google ansehen.</p><b>Google öffnen ↗</b></a>
      </section>

      <section className="reservation section snap-section" id="reservieren">
        <div className="section-number">07 / RESERVIERUNG</div>
        <div className="reservation-intro"><p className="eyebrow"><span /> Ready for the night?</p><h2>Dein Tisch.<br /><em>Deine Nacht.</em></h2><p>Bereite deine Anfrage vor und sende die Nachricht anschließend in WhatsApp ab. Alternativ kannst du uns <a href="tel:+4915780791277">anrufen</a>.</p></div>
        <form className="reservation-form" onSubmit={sendReservation}>
          <p className="form-required form-wide">Pflichtfelder sind mit * gekennzeichnet.</p>
          <label><span>Name *</span><input name="name" type="text" placeholder="Vor- und Nachname" autoComplete="name" minLength={3} maxLength={80} required /></label>
          <label><span>Telefon *</span><input name="phone" type="tel" placeholder="Deine Telefonnummer" autoComplete="tel" pattern="[+0-9 ()/\-]{7,25}" title="Bitte gib eine gültige Telefonnummer ein." required /></label>
          <label><span>Datum *</span><input name="date" type="date" min={minimumDate} required value={reservationDate} onChange={(event) => setReservationDate(event.target.value)} /></label>
          <label><span>Uhrzeit *</span><select name="time" key={reservationDate} defaultValue="" required><option value="" disabled>{!reservationDate ? 'Zuerst Datum wählen' : reservationTimes(reservationDate).length ? 'Uhrzeit wählen' : 'Geschlossen – anderen Tag wählen'}</option>{reservationTimes(reservationDate).map(time => <option key={time}>{time}</option>)}</select></label>
          <label><span>Personen *</span><select name="guests" defaultValue="2" required>{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => <option key={number} value={number}>{number} {number === 1 ? 'Person' : 'Personen'}</option>)}</select></label>
          <label className="form-wide"><span>Besondere Wünsche (optional)</span><textarea name="note" rows={3} placeholder="Geburtstag, Sitzplatzwunsch oder weitere Hinweise" maxLength={300} /></label>
          <label className="consent-check form-wide"><input name="confirmation" type="checkbox" required /><span>Ich bestätige die Richtigkeit meiner Angaben und stimme der Übermittlung an WhatsApp zur Bearbeitung der Anfrage zu. Ich habe die <a href="/datenschutz">Datenschutzerklärung</a> und die <a href="/agb">Reservierungsbedingungen</a> gelesen. Die Reservierung ist erst nach persönlicher Bestätigung verbindlich.</span></label>
          <label className="spam-trap" aria-hidden="true"><span>Website</span><input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
          {formError && <div className="form-error form-wide" role="alert"><p>{formError}</p>{whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp manuell öffnen ↗</a>}</div>}
          <div className="form-submit form-wide"><button className="button button--primary" type="submit" disabled={submitting || sent} aria-busy={submitting}>{submitting ? 'Anfrage wird vorbereitet …' : sent ? 'Anfrage vorbereitet ✓' : 'Reservierungsanfrage senden'} <span>↗</span></button></div>
          {sent && <div className="form-success form-wide" role="status"><p>WhatsApp wurde geöffnet. Sende dort noch die vorbereitete Nachricht ab – wir bestätigen deinen Tisch persönlich.</p>{calendarUrl && <a href={calendarUrl} target="_blank" rel="noreferrer">In Google Kalender vormerken ↗</a>}</div>}
        </form>
      </section>

      <footer><a className="brand" href="#start"><span className="brand-mark"><img src="/gorilla-logo.png" alt="" /></span><span>ENDSTATION<small>ALTER BAHNHOF</small></span></a><div className="footer-business"><strong>Endstation – Alter Bahnhof</strong><span>Bahnhofsplatz 6 · 99974 Mühlhausen</span><a href="tel:+4915780791277">+49 1578 0791277</a></div><nav className="footer-links" aria-label="Footer-Navigation"><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/cookies">Cookies</a><a href="/agb">AGB</a><a href="/erstattung">Erstattung</a><a href="https://instagram.com/saad.abbo19800" target="_blank" rel="noreferrer">Instagram ↗</a><a href={googleReviewsUrl} target="_blank" rel="noreferrer">Google ↗</a></nav></footer>

      {selectedTobacco && (
        <div className="flavor-modal" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setSelectedTobacco(null); }}>
          <section ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="flavor-title">
            <button className="modal-close" type="button" onClick={() => setSelectedTobacco(null)} autoFocus aria-label="Fenster schließen">×</button>
            <span className="modal-kicker">AINO / FLAVOR PROFILE</span>
            <h2 id="flavor-title">{selectedTobacco.name}</h2>
            <div className="modal-detail"><span>Tabakart</span><strong>{selectedTobacco.type}</strong></div>
            <div className="modal-detail"><span>Geschmack</span><strong>{selectedTobacco.taste}</strong></div>
            <p>{selectedTobacco.note}</p>
            <a href={selectedTobacco.source} target="_blank" rel="noreferrer">Produktquelle ansehen ↗</a>
          </section>
        </div>
      )}
    </main>
  );
}
