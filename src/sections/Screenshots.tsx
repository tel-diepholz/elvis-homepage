import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const SHOTS = [
  { file: 'karte', title: 'Lagekarte', text: 'Einheiten mit taktischen Zeichen am Einsatzort, Objektliste und Live-Wind.' },
  { file: 'kraefte', title: 'Kräfteübersicht', text: 'Einheiten nach Einsatzabschnitt, Stärke und Status.' },
  { file: 'tagebuch', title: 'Einsatztagebuch', text: 'Neue Einträge oben, Systemeinträge automatisch, CSV-Export.' },
  { file: 'anforderungen', title: 'Anforderungen', text: 'Material mit Bedarfszeit und Wiedervorlage.' },
  { file: 'wetter', title: 'Wetter', text: 'DWD-Warnungen, aktuelle Lage und Prognose für den Standort.' },
  { file: 'zeichen', title: 'Taktische Zeichen', text: 'Generator nach DV 102 mit Vorlagen.' },
];

export function Screenshots() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % SHOTS.length));
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + SHOTS.length) % SHOTS.length));
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const shot = open === null ? null : SHOTS[open];

  return (
    <section className="section section-alt" id="bilder">
      <div className="wrap">
        <h2>So sieht ELVIS aus</h2>
        <p className="section-lead">
          Aufnahmen aus dem Simulationsmodus mit einer Übungslage. Tippen zum Vergrößern.
        </p>
        <ul className="gallery">
          {SHOTS.map((s, i) => (
            <li key={s.file}>
              <button className="shot" onClick={() => setOpen(i)} aria-label={`${s.title} vergrößern`}>
                <img src={`/screenshots/${s.file}.webp`} alt="" width="1440" height="900" loading="lazy" />
              </button>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {shot && open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={shot.title} onClick={() => setOpen(null)}>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={`/screenshots/${shot.file}.webp`} alt={`${shot.title}: ${shot.text}`} width="1440" height="900" />
            <figcaption>
              <strong>{shot.title}</strong> {shot.text}
            </figcaption>
          </figure>
          <button className="lb-btn lb-close" onClick={() => setOpen(null)} aria-label="Schließen" autoFocus>
            <X size={22} />
          </button>
          <button
            className="lb-btn lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open - 1 + SHOTS.length) % SHOTS.length);
            }}
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="lb-btn lb-next"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open + 1) % SHOTS.length);
            }}
            aria-label="Nächstes Bild"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
}
