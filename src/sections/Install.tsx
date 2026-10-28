import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { GITHUB } from '../links';

function Code({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Zwischenablage nicht erlaubt (z. B. ohne HTTPS): Text bleibt markierbar
    }
  };
  return (
    <div className="code">
      <pre>
        <code>{children}</code>
      </pre>
      <button className="copy" onClick={copy} aria-label={copied ? 'Kopiert' : 'Befehle kopieren'}>
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}

export function Install() {
  return (
    <section className="section" id="installation">
      <div className="wrap">
        <h2>Installation</h2>
        <p className="section-lead">
          ELVIS läuft auf einem Linux-Rechner im Fahrzeug, als Docker-Container oder direkt mit Node.js 20. Tablets und
          Notebooks öffnen die Oberfläche im Browser über das Fahrzeug-WLAN.
        </p>
        <div className="install">
          <div>
            <h3>Im Fahrzeug (Docker)</h3>
            <p>Richtet den Server zugleich als Docker-Host für Addons ein.</p>
            <Code>{`git clone --recurse-submodules ${GITHUB}.git
cd elvis
sudo sh deploy/install.sh`}</Code>
            <p className="hint">
              Fahrzeughardware (Wetterstation am USB, Bluetooth) kommt in <code>deploy/compose.override.yaml</code>, so
              bleibt <code>git pull</code> konfliktfrei.
            </p>
          </div>
          <div>
            <h3>Ausprobieren und entwickeln</h3>
            <p>Mit simulierten Geräten, ganz ohne Fahrzeug.</p>
            <Code>{`git clone --recurse-submodules ${GITHUB}.git
cd elvis
npm install
npm run dev`}</Code>
            <p className="hint">
              Dann <code>http://localhost:5173</code> öffnen. Beim ersten Start legt man den Admin mit Name und PIN an.
            </p>
          </div>
        </div>
        <p className="more">
          Treiber für eigene Hardware, Konfiguration und Addons beschreibt die <a href={`${GITHUB}#readme`}>README auf GitHub</a>.
        </p>
      </div>
    </section>
  );
}
