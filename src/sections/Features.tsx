import type { LucideIcon } from 'lucide-react';
import {
  Archive,
  BookLock,
  Boxes,
  CloudSun,
  Container,
  FileText,
  KeyRound,
  ListChecks,
  Map,
  MonitorPlay,
  Plane,
  Printer,
  Router,
  Shapes,
  Users,
  Wind,
} from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
}

const GROUPS: { title: string; intro: string; items: Feature[] }[] = [
  {
    title: 'Einsatzführung',
    intro: 'Alles, was der Führungsassistent während des Einsatzes dokumentiert, an einer Stelle und für alle aktuell.',
    items: [
      {
        icon: BookLock,
        title: 'Revisionssicheres Einsatztagebuch',
        text: 'Einträge sind unveränderlich, Korrekturen werden als neue Einträge mit Verweis erfasst. Statuswechsel und Dokumente protokolliert ELVIS selbst. CSV-Export.',
      },
      {
        icon: Users,
        title: 'Kräfteübersicht',
        text: 'Einheiten mit taktischem Zeichen, Stärke, Status und Einsatzabschnitt. Personalbögen für jede Einheit, Stärke vor Ort auf einen Blick.',
      },
      {
        icon: Boxes,
        title: 'Materialanforderungen',
        text: 'Anforderungen mit Bedarfszeit und Wiedervorlage, selbst beschaffen oder an den Stab weitergeben. Jeder Schritt landet im Tagebuch.',
      },
      {
        icon: ListChecks,
        title: 'Aufgaben und Meldungen',
        text: 'Aufträge verfolgen und Meldungen erfassen. Aus einer Meldung wird mit einem Klick eine Materialanforderung.',
      },
      {
        icon: FileText,
        title: 'Dokumente und Vorlagen',
        text: 'Ordnerstruktur je Einsatz, Office-Dokumente im Browser bearbeiten (Collabora), Vorlagen und Scans per E-Mail direkt in den Eingang.',
      },
      {
        icon: Archive,
        title: 'Einsatzarchiv',
        text: 'Abgeschlossene Einsätze bleiben vollständig und schreibgeschützt erhalten und lassen sich jederzeit nachlesen.',
      },
    ],
  },
  {
    title: 'Lage und Karte',
    intro: 'Eine Lagekarte, die auch ohne Internet funktioniert und weiß, wo das Fahrzeug steht und woher der Wind kommt.',
    items: [
      {
        icon: Map,
        title: 'Lagekarte',
        text: 'Einheiten, Lagezeichen, Beschriftungen und Formen zeichnen. Der Zeitstrahl zeigt, wie sich die Lage entwickelt hat. Karten werden zwischengespeichert und lassen sich drucken.',
      },
      {
        icon: Wind,
        title: 'Ausbreitungsberechnung',
        text: 'Gauß-Fahnen und 60°-Sektoren in Windrichtung, mit Live-Wind von der Wetterstation.',
      },
      {
        icon: CloudSun,
        title: 'Wetter',
        text: 'Amtliche Warnungen des DWD für den Standort, Prognose für 24 Stunden und 7 Tage, Live-Werte der Wetterstation.',
      },
      {
        icon: Plane,
        title: 'Flugzeuge und Schiffe',
        text: 'ADS-B und AIS als Kartenebene, zum Beispiel für Hubschraubereinsätze oder Lagen an der Küste.',
      },
      {
        icon: Shapes,
        title: 'Taktische Zeichen',
        text: 'Generator nach DV 102 mit Vorlagen, Download als SVG. Dieselben Zeichen nutzt die Kräfteübersicht.',
      },
    ],
  },
  {
    title: 'Fahrzeug und Technik',
    intro: 'Die Technik des ELW ist nicht mehr auf ein Dutzend Weboberflächen verteilt.',
    items: [
      {
        icon: Router,
        title: 'Fahrzeugmodule',
        text: 'Treiber für Teltonika-Router, OpenWrt-Accesspoints, Axis-Kameras, Airmar-Wetterstation, Victron-Akkus über Bluetooth und SNMP-Monitoring. Eigene Treiber über eine schlanke Adapter-Schnittstelle.',
      },
      {
        icon: MonitorPlay,
        title: 'Bildschirme',
        text: 'Monitore im Führungsraum und am Lagetisch per Code koppeln und mit Kacheln belegen: Karte, Tagebuch, Wetter, Kameras, NDI-Video.',
      },
      {
        icon: Container,
        title: 'Addons',
        text: 'Zusatzdienste als Docker-Container auf den Fahrzeug-Servern, ähnlich wie bei Home Assistant: NDI-Gateway, Druckserver, PXE-Arbeitsplätze.',
      },
      {
        icon: Printer,
        title: 'Drucken und Scannen',
        text: 'Drucker über das CUPS-Addon, Scans kommen per „Scan an E-Mail“ direkt in ELVIS an.',
      },
      {
        icon: KeyRound,
        title: 'Anmeldung mit Name und PIN',
        text: 'Namen wählen, vierstellige PIN tippen. Kein Passwortchaos auf gemeinsam genutzten Tablets. Jeder Befehl landet im Bedienprotokoll.',
      },
    ],
  },
];

export function Features() {
  return (
    <section className="section" id="funktionen">
      <div className="wrap">
        <h2>Funktionen</h2>
        <p className="section-lead">
          ELVIS gliedert sich in Fahrzeug, Einsatz und Verwaltung. Die Einsatzbereiche öffnen sich erst, wenn ein Einsatz
          angelegt ist. Abgeschlossene Einsätze kann niemand mehr ändern.
        </p>
        {GROUPS.map((g) => (
          <div className="group" key={g.title}>
            <div className="group-head">
              <h3>{g.title}</h3>
              <p>{g.intro}</p>
            </div>
            <ul className="cards">
              {g.items.map(({ icon: Icon, title, text }) => (
                <li className="card" key={title}>
                  <span className="card-icon">
                    <Icon size={20} aria-hidden />
                  </span>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
