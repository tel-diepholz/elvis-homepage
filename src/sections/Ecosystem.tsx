import { Cloud, ShieldCheck, Smartphone, Truck } from 'lucide-react';
import { GITHUB_APP, GITHUB_RELAY } from '../links';

export function Ecosystem() {
  return (
    <section className="section" id="oekosystem">
      <div className="wrap">
        <h2>Einsatzkräfte orten: App und Relay</h2>
        <p className="section-lead">
          Mit der Android-App <em>ELVIS Ortung</em> melden Einsatzkräfte ihre Position an den ELW. Ein kleines Cloud-Relay
          vermittelt. ELVIS holt die Positionen dort selbst ab, der ELW braucht also keine öffentliche Adresse.
        </p>

        <div className="flow" role="img" aria-label="Die App sendet per HTTPS an das Relay, ELVIS holt die Positionen alle 15 Sekunden dort ab und zeigt sie in Kräfteübersicht und Karte.">
          <div className="node">
            <Smartphone size={26} aria-hidden />
            <strong>ELVIS Ortung</strong>
            <span>Android-App</span>
          </div>
          <div className="edge">
            <span>HTTPS</span>
            <i className="arrow arrow-right" />
          </div>
          <div className="node">
            <Cloud size={26} aria-hidden />
            <strong>ELVIS Relay</strong>
            <span>Cloudflare Worker</span>
          </div>
          <div className="edge">
            <span>Abruf alle 15 s</span>
            <i className="arrow arrow-left" />
          </div>
          <div className="node node-accent">
            <Truck size={26} aria-hidden />
            <strong>ELVIS im ELW</strong>
            <span>Kräfte und Karte</span>
          </div>
        </div>

        <div className="eco-grid">
          <div>
            <h3>Koppeln in Sekunden</h3>
            <p>
              Die App zeigt eine App-ID und einen sechsstelligen Code. In der Kräfteübersicht beim Fahrzeug eintragen,
              fertig. Die erste Position kommt sofort, danach ab 10 m Bewegung, spätestens alle 10 Minuten. Die Kopplung
              endet mit dem Entlassen der Einheit oder dem Einsatzende.
            </p>
            <p className="links">
              <a href={GITHUB_APP}>elvis-app auf GitHub</a>
              <a href={GITHUB_RELAY}>elvis-relay auf GitHub</a>
            </p>
          </div>
          <div className="note">
            <ShieldCheck size={22} aria-hidden />
            <div>
              <h3>Datenschutz</h3>
              <p>
                Das Relay kennt nur zufällige IDs, keine Namen. Positionen löscht es bei der Abholung, spätestens nach 24
                Stunden. Die Einsatzkraft kann die Ortung in der App jederzeit stoppen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
