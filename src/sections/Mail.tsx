import { AtSign, Cloud, KeyRound, LockKeyhole, RotateCcw, Truck } from 'lucide-react';
import { GITHUB_RELAY } from '../links';

export function Mail() {
  return (
    <section className="section section-alt" id="mail">
      <div className="wrap">
        <h2>Ein verschlüsseltes Postfach für den ELW</h2>
        <p className="section-lead">
          Jeder ELW kann eine eigene Adresse <code>…@einsatzleitwagen.app</code> bekommen und Mails direkt in ELVIS lesen
          und schreiben. Wie bei der App-Ortung nimmt das Cloud-Relay die Mails an, ELVIS holt sie ab. Verschlüsselung
          mit OpenPGP ist Standard, der private Schlüssel verlässt das Fahrzeug nie.
        </p>

        <div
          className="flow"
          role="img"
          aria-label="Absender schicken Mails an das Relay. Das Relay verschlüsselt jede Mail sofort mit dem Schlüssel des ELW, ELVIS holt sie alle 30 Sekunden ab und entschlüsselt sie im Fahrzeug."
        >
          <div className="node">
            <AtSign size={26} aria-hidden />
            <strong>Absender</strong>
            <span>Leitstelle, Stab, Behörden</span>
          </div>
          <div className="edge">
            <span>SMTP</span>
            <i className="arrow arrow-right" />
          </div>
          <div className="node">
            <Cloud size={26} aria-hidden />
            <strong>ELVIS Relay</strong>
            <span>verschlüsselt sofort</span>
          </div>
          <div className="edge">
            <span>Abruf alle 30 s, signiert</span>
            <i className="arrow arrow-left" />
          </div>
          <div className="node node-accent">
            <Truck size={26} aria-hidden />
            <strong>ELVIS im ELW</strong>
            <span>entschlüsselt im Fahrzeug</span>
          </div>
        </div>

        <div className="cards mail-cards">
          <div className="card">
            <div className="card-icon">
              <KeyRound size={20} aria-hidden />
            </div>
            <h4>Beantragen in drei Schritten</h4>
            <p>
              Ein Admin wählt in den Einstellungen die Adresse und gibt eine Kontaktadresse an. Er bestätigt per Link und
              bekommt einmalig den öffentlichen Schlüssel und das Widerrufszertifikat per Mail.
            </p>
          </div>
          <div className="card">
            <div className="card-icon">
              <LockKeyhole size={20} aria-hidden />
            </div>
            <h4>Verschlüsselt, wo immer es geht</h4>
            <p>
              Gegenstellen finden den Schlüssel des ELW automatisch (WKD, Autocrypt). ELVIS verschlüsselt an jeden
              Empfänger mit bekanntem Schlüssel. Fehlt einer, geht die Mail nur nach ausdrücklicher Bestätigung und
              signiert hinaus.
            </p>
          </div>
          <div className="card">
            <div className="card-icon">
              <RotateCcw size={20} aria-hidden />
            </div>
            <h4>Nach einer Neuinstallation</h4>
            <p>
              Die Adresse lässt sich nach Bestätigung durch den Admin auf die neue Installation übertragen. Ältere Mails
              sind dann nicht mehr lesbar, weil es bewusst keine Kopie des Schlüssels gibt.
            </p>
          </div>
        </div>

        <div className="note">
          <LockKeyhole size={22} aria-hidden />
          <div>
            <h3>Datenschutz</h3>
            <p>
              Das Relay speichert eingehende Mails nur verschlüsselt und löscht sie mit der Abholung, spätestens nach 30
              Tagen. Den Inhalt kann es nicht lesen. Jeder Abruf ist mit einem Schlüssel des ELW signiert, ein
              abgegriffener Zugang allein reicht nicht.{' '}
              <a href="/status">Aktueller Status des Mail-Dienstes</a> · <a href={GITHUB_RELAY}>elvis-relay auf GitHub</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
