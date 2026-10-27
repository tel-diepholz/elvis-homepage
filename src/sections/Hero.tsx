import { ArrowRight, Box, Github, Scale, TabletSmartphone, WifiOff } from 'lucide-react';
import { GITHUB } from '../links';

const FACTS = [
  { icon: WifiOff, title: 'Läuft offline', text: 'Server im Fahrzeug, Karten im Cache' },
  { icon: Box, title: 'Ein Container', text: 'Docker-Installation mit einem Befehl' },
  { icon: TabletSmartphone, title: 'Touch-tauglich', text: 'Tablet, Smartphone, Lagetisch' },
  { icon: Scale, title: 'Open Source', text: 'MIT-Lizenz, offen auf GitHub' },
];

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-text">
          <p className="eyebrow">Einsatzleitwagen-Verwaltungs- und Informationssystem</p>
          <h1>
            Der ELW in einer Oberfläche. <span className="accent">Fahrzeug und Einsatz.</span>
          </h1>
          <p className="lead">
            ELVIS fasst die Systeme des Einsatzleitwagens (Funk, Netzwerk, Wetterstation, Energie, Kameras) und die
            Einsatzführung (Tagebuch, Kräfte, Lagekarte, Anforderungen, Dokumente) in einer Weboberfläche zusammen. Für
            jedes Gerät im Fahrzeug-WLAN, ohne Installation auf den Clients.
          </p>
          <div className="cta">
            <a className="btn btn-primary" href="#installation">
              Schnellstart <ArrowRight size={18} aria-hidden />
            </a>
            <a className="btn btn-ghost" href={GITHUB}>
              <Github size={18} aria-hidden /> Quellcode auf GitHub
            </a>
          </div>
        </div>
        <figure className="frame hero-shot">
          <div className="frame-bar" aria-hidden>
            <i />
            <i />
            <i />
          </div>
          <img
            src="/screenshots/uebersicht.webp"
            alt="ELVIS-Übersicht mit laufendem Einsatz, letzten Tagebucheinträgen, Wetter und Netzwerkstatus"
            width="1440"
            height="900"
          />
        </figure>
        <ul className="facts">
          {FACTS.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <Icon size={22} aria-hidden />
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
