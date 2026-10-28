import { Github } from 'lucide-react';
import { GITHUB } from '../links';

const NAV = [
  ['/#funktionen', 'Funktionen'],
  ['/#bilder', 'Bilder'],
  ['/#oekosystem', 'App & Relay'],
  ['/#mail', 'E-Mail'],
  ['/#installation', 'Installation'],
] as const;

export function Header() {
  return (
    <header className="header">
      <div className="wrap header-inner">
        <a className="brand" href="/#top" aria-label="ELVIS, zum Seitenanfang">
          <img src="/favicon.svg" alt="" width="28" height="28" />
          <span>ELVIS</span>
        </a>
        <nav className="nav" aria-label="Abschnitte">
          {NAV.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="btn btn-ghost btn-sm" href={GITHUB} aria-label="ELVIS auf GitHub">
          <Github size={16} aria-hidden />
          <span className="hide-sm">GitHub</span>
        </a>
      </div>
    </header>
  );
}
